import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { catchError, first, takeUntil, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'golden-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnDestroy, OnInit {
  private destroy$: Subject<void> = new Subject<void>();

  public form: UntypedFormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private fb: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  ngOnInit(): void {
    if (this.authService.userSubject) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.router.navigate([returnUrl]);
    }
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  get emailValidationErrors() {
    return {
      required: 'Email obbligatoria',
      email: 'Email non valida',
    };
  }

  get passwordValidationErrors() {
    return {
      required: 'Password obbligatoria',
    };
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;

    this.authService
      .signIn(this.f.email.value, this.f.password.value)
      .pipe(
        first(),
        takeUntil(this.destroy$),
        tap(() => this.router.navigate(['/'])),
        catchError(async ({ error }: ErrorEvent) => {
          this.toastr.error(error.errors[0].message);

          return (this.loading = false);
        })
      )
      .subscribe();
  }
}
