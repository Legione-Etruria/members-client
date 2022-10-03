import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { format, startOfYear } from 'date-fns';
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

  public form: UntypedFormGroup;
  public loading = false;
  public submitted = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group(
      this.formInitialValues(),
      this.formInitialValidators()
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  // convenience getter for easy access to form fields
  get f(): any {
    return this.form.controls;
  }

  todayFormatted() {
    return format(new Date(), 'dd/MM/yyyy');
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

    // stop here if form is invalid
    if (this.form.invalid || this.loading) {
      return;
    }

    this.loading = true;

    this.authService
      .signUp(this.form.value)
      ?.pipe(
        first(),
        takeUntil(this.destroy$),
        tap(() => {
          this.form.reset();
          this.loading = false;
          (this.form = this.formBuilder.group(
            this.formInitialValues(),
            this.formInitialValidators()
          )),
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

  private formInitialValues() {
    return {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      phoneNumber: [''],
      figtMembership: ['', Validators.required],
      battleName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      legioMembershipDate: [startOfYear(new Date()), Validators.required],
      legioMembershipSubscriptionCost: [0, Validators.required],
      passwordConfirm: ['', Validators.required],
      role: [''],
      birthDate: [new Date(), Validators.required],
    };
  }

  private formInitialValidators() {
    return {
      validators: [PasswordValidator.match('password', 'passwordConfirm')],
    };
  }
}
