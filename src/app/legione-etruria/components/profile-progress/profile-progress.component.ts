import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-profile-progress',
  templateUrl: './profile-progress.component.html',
})
export class ProfileProgressComponent implements OnInit {
  @Input() userData!: User;

  public profileProgressSteps!: {
    label: string;
    routerLink?: string;
    isCompleted: boolean;
  }[];
  constructor() {}

  ngOnInit(): void {
    this.profileProgressSteps = [
      {
        label: 'Registrazione',
        isCompleted: true,
      },
      {
        label: 'Aggiungi documenti',
        routerLink: '/pages/settings/company/open-hours',
        isCompleted: false,
      },
    ];
  }

  getMissingEntries() {
    return [false].filter((i) => false === i);
  }
}
