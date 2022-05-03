import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export default class PasswordValidator {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const field1 = controls.get(controlName);
      const field2 = controls.get(checkControlName);

      if (field2?.errors && !field2.errors['matching']) {
        return null;
      }

      if (field1?.value !== field2?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      }

      return null;
    };
  }
}
