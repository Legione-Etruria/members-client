import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { startOfDay } from 'date-fns';

interface TemporaryUser {
  date: Date;
  name: string;
  surname: string;
  birthDate: Date;
  birthPlace: string;
}

@Component({
  selector: 'app-temporary-user',
  templateUrl: './temporary-user.component.html',
  styleUrls: ['./temporary-user.component.scss'],
})
export class TemporaryUserComponent {
  public affiliationData = {
    id: '5722',
    expiresOn: new Date('2025-12-31'),
  };

  public form = new FormGroup({
    date: new FormControl(startOfDay(new Date()), [Validators.required]),
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    birthDate: new FormControl(startOfDay(new Date()), [Validators.required]),
    birthPlace: new FormControl('', [Validators.required]),
  });

  public validationErrors = {
    ['required']: 'This field is required',
  };

  ngOnInit(): void {}

  public get pastSubmittedUsers(): TemporaryUser[] {
    return JSON.parse(localStorage.getItem('savedUsers') || '[]').map(
      (user: string) => JSON.parse(user)
    );
  }

  public get affiliationExpired(): boolean {
    return new Date() > this.affiliationData.expiresOn;
  }

  public onSubmit(): void {
    this._updateSubmittedUsers();

    //Send data to backend here

    this.updateUserForm({});
    this.form.updateValueAndValidity();
    // this.form.clearValidators();
  }

  public updateUserForm(user: Partial<TemporaryUser>): void {
    this.form.setValue({
      date: startOfDay(new Date()),
      name: user.name || '',
      surname: user.surname || '',
      birthDate: startOfDay(new Date(user.birthDate || new Date())),
      birthPlace: user.birthPlace || '',
    });
  }

  private _updateSubmittedUsers() {
    const result = JSON.stringify([
      ...new Set([
        JSON.stringify({ ...this.form.value, date: undefined }),
        ...JSON.parse(localStorage.getItem('savedUsers') || '[]'),
      ]),
    ]);
    console.log(result);
    localStorage.setItem('savedUsers', result);
  }
}
