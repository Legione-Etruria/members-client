import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-inactive-account',
  templateUrl: './inactive-account.component.html',
  styleUrls: ['./inactive-account.component.scss'],
})
export class InactiveAccountComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logOut() {
    this.authService.signOut();
  }
}
