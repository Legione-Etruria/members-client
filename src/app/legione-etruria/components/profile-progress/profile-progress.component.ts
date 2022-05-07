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
    queryParams?: { [key: string]: string };
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
        label: 'Aggiungi un documento di riconoscimento',
        routerLink: '/settings',
        queryParams: { tab: 'account' },
        isCompleted: false,
      },
    ];
  }

  getMissingEntries() {
    return [false].filter((i) => false === i);
  }
}
