import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, first, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import PasswordValidator from '../../validators/password.validator';

@Component({
  selector: 'golden-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  @Input() adminSelectors = false;

  private destroy$: Subject<void> = new Subject<void>();

  public form: FormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        passwordConfirm: ['', Validators.required],
        role: [''],
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
    const password = group.get('password')?.value;
    const passwordConfirm = group.get('passwordConfirm')?.value;
    console.log('password', password);
    console.log('passwordConfirm', passwordConfirm);
    return password === passwordConfirm ? null : { matchPasswords: true };
  };

  onSubmit(): void {
    this.submitted = true;

    console.log('form is valid', this.form.valid);
    console.log('loading', this.loading);

    // stop here if form is invalid
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;

    this.authService
      .signUp(this.f.email.value, this.f.password.value, this.f.role.value)
      ?.pipe(
        first(),
        takeUntil(this.destroy$),
        tap(() => {
          this.adminSelectors
            ? (this.form.reset(), (this.loading = false))
            : this.router.navigate(['/signin']);
          this.toastr.success(`Registrato correttamente`);
        }),
        catchError(async ({ error }: ErrorEvent) => {
          this.toastr.error(error.errors[0].message);
          console.log('errore in front', error);
          return (this.loading = false);
        })
      )
      .subscribe();
  }
}
