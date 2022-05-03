import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'golden-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public form!: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    // stop here if form is invalid
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;

    this.authService
      .forgotPassword(this.f.email.value)
      .pipe(
        first(),
        takeUntil(this.destroy$),
        catchError(async (error: ErrorEvent) => {
          console.log('errore in front', error);
          return (this.loading = false);
        }),
        tap(() => {
          this.router.navigate(['/signin']);
          this.toastr.success(`Ti abbiamo inviato un'email con le istruzioni`);
        })
      )
      .subscribe();
  }
}
