import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user';

@Component({
  selector: 'app-account-status-badge',
  templateUrl: './account-status-badge.component.html',
})
export class AccountStatusBadgeComponent implements OnInit {
  @Input() user!: User | undefined;

  constructor() {}

  ngOnInit(): void {}
}
