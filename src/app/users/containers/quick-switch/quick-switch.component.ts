import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { AccountGroup } from '../../../models/account-group';

@Component({
  selector: 'app-quick-switch',
  templateUrl: './quick-switch.component.html',
  styleUrls: ['./quick-switch.component.scss'],
})
export class QuickSwitchComponent {
  @Output() cardsVisibility = new EventEmitter<boolean>();

  public loading = false;

  public currentGroup: AccountGroup['accounts'] =
    this.authService.currentUserValue.accountGroup?.accounts.filter(
      (i) => i._id !== this.authService.currentUserValue._id
    );

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public onAccountSelected(accountId: string) {
    this.loading = true;
    this.authService
      .switchAccount(accountId)
      .pipe(
        tap((i) => {
          this.toastr.success(
            'Ricarico informazioni utente',
            'LOGIN EFFETTUATO'
          );
          this.router.navigate(['/']);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }),
        catchError(async (err: ErrorEvent) => {
          this.loading = false;
          this.toastr.error(err.error.errors[0].message);
          return [];
        })
      )
      .subscribe();
  }
}
