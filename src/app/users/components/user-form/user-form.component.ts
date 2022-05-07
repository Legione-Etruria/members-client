import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { format } from 'date-fns';
import { Subject } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import PasswordValidator from 'src/app/auth/validators/password.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  @Input() user!: User;
  @Input() loading = false;
  @Input() toHide: (
    | 'email'
    | 'figtMembership'
    | 'battleName'
    | 'firstName'
    | 'lastName'
    | 'password'
    | 'legioMembershipDate'
    | 'legioMembershipSubscriptionCost'
    | 'passwordConfirm'
    | 'role'
  )[] = [];
  @Output() formSubmitted = new EventEmitter<Partial<User>>();

  private destroy$: Subject<void> = new Subject<void>();

  public form!: FormGroup;

  public submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        email: [
          this.user?.email || '',
          [Validators.required, Validators.email],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ],
        ],
        figtMembership: [this.user?.figtMembership || '', Validators.required],
        battleName: [this.user?.battleName || '', Validators.required],
        firstName: [this.user?.firstName || '', Validators.required],
        lastName: [this.user?.lastName || '', Validators.required],
        legioMembershipDate: [
          this.user?.legioMembershipDate || new Date(),
          Validators.required,
        ],
        legioMembershipSubscriptionCost: [
          this.user?.legioMembershipSubscriptionCost || null,
          Validators.required,
        ],
        passwordConfirm: ['', Validators.required],
        role: [this.user?.role || '', Validators.required],
      },
      {
        validators: [PasswordValidator.match('password', 'passwordConfirm')],
      }
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  public isHidden(value: typeof this.toHide[0]) {
    return !this.toHide.includes(value);
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

  onSubmit() {
    this.submitted = true;

    this.formSubmitted.emit(this.form.value);
  }
}
