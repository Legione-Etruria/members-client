import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, Subject, tap } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.component.html',
  styleUrls: ['./link-account.component.scss'],
})
export class LinkAccountComponent implements OnInit {
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
    this.loading = true;

    this.authService
      .addAccountGroup(this.form.value)
      .pipe(
        tap((i) => {
          this.loading = false;
          this.toastr.success(
            'Ricarico Informazioni account',
            'ACCOUNT AGGIUNTO'
          );

          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }),
        catchError(async (err: ErrorEvent) => {
          this.loading = false;
          this.toastr.error(err.error.errors[0].message);
        })
      )
      .subscribe();
  }
}
