import { Component, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import PasswordValidator from '../../validators/password.validator';

@Component({
  selector: 'golden-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  private token: string = this.route.snapshot.paramMap.get('token')!;

  public form: UntypedFormGroup;

  public loading: boolean = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        passwordConfirm: ['', Validators.required],
      },
      {
        validators: [PasswordValidator.match('password', 'passwordConfirm')],
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  matchPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let password = group.get('password')?.value;
    let passwordConfirm = group.get('passwordConfirm')?.value;
    return password === passwordConfirm ? null : { matchPasswords: true };
  };

  onSubmit(): void {
    // stop here if form is invalid
    if (this.form.invalid || this.loading) {
      return;
    }
    this.loading = true;
    this.authService
      .resetPassword(
        this.f.password.value,
        this.f.passwordConfirm.value,
        this.token
      )
      .pipe(
        first(),
        takeUntil(this.destroy$),
        catchError(async (error: ErrorEvent) => {
          console.log('errore in front', error);
          return (this.loading = false);
        }),
        tap(() => {
          // get return url from query parameters or default to home page
          localStorage.clear();
          if (!localStorage.getItem(environment.localStorageJWT)) {
            this.router.navigate(['/signin']);
          }
        })
      )
      .subscribe();
  }
}
