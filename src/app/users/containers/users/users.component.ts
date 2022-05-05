import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  filter,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { User } from '../../../auth/models/user';
import { AuthService } from '../../../auth/services/auth.service';
import { TailwindDialogConfirmComponent } from '../../../tailwind-dialog/components/tailwind-dialog-confirm/tailwind-dialog-confirm.component';
import { TailwindDialogService } from '../../../tailwind-dialog/services/tailwind-dialog.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'golden-users',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  private usersSubject = new Subject<User[]>();
  public users$: Observable<User[]> = this.usersSubject;
  private destroy$ = new Observable<void>();

  private thisRoute = '/users/browse';
  public currentUser = this.authService.currentUserValue;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private tailwindDialog: TailwindDialogService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.emitGetUsers().subscribe();

    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.onNavigationEnd())
      )
      .subscribe();
  }
  private onNavigationEnd() {
    const actionType:
      | 'block'
      | 'edit'
      | 'delete'
      | 'reset-password'
      | 'unblock'
      | null = this.route.snapshot.queryParamMap.get('action') as
      | 'block'
      | 'edit'
      | 'delete'
      | 'reset-password'
      | 'unblock'
      | null;

    const userID = this.route.snapshot.queryParamMap.get('id');

    if (!userID || !actionType) {
      return of({});
    }

    if ('edit' === actionType) {
      this.router.navigate([`/users/edit/:${userID}`]);
      return of({});
    }

    const userRef = this.tailwindDialog.open(TailwindDialogConfirmComponent, {
      data: {
        title: 'Conferma azione',
        description: this.dialogDescription(actionType),
        actionButton: {
          label: 'Conferma',
        },
        cancelButton: {
          label: 'Annulla',
        },
      },
    });

    return userRef.afterClosed.pipe(
      switchMap((reason) => {
        if ('cancel' === reason) {
          this.router.navigate([this.thisRoute]);

          return of({});
        }

        this.toastrService.info('Aggiorno...', '', {
          progressBar: true,
          progressAnimation: 'increasing',
        });
        return this.onAction(actionType).pipe(
          switchMap(() => this.emitGetUsers()),
          tap(() => {
            this.toastrService.clear();
            this.toastrService.success('aggiornato!', '', {
              positionClass: 'toast-top-center',
            });
            this.router.navigate([this.thisRoute]);
          }),
          catchError(
            async (error: { error: { errors: { message: string }[] } }) => {
              this.toastrService.clear();
              this.toastrService.error(
                'errore!',
                error.error.errors[0].message,
                {
                  positionClass: 'toast-top-center',
                }
              );
              this.router.navigate([this.thisRoute]);
            }
          )
        );
      })
    );
  }

  //depending on the given action's value make a call to the service to block or delete a user and retunr the observable
  public onAction(
    action: 'block' | 'edit' | 'delete' | 'reset-password' | 'unblock'
  ) {
    const userID = this.route.snapshot.queryParamMap.get('id');
    switch (action) {
      case 'block':
        return this.usersService.editUser(userID || '', {
          active: false,
        });
      case 'delete':
        return this.usersService.deleteUser(userID || '');
      case 'reset-password':
        return this.usersService.editUser(userID || '', {
          password: '123456',
        });
      case 'unblock':
        return this.usersService.editUser(userID || '', {
          active: true,
        });
      default:
        return of({});
    }
  }

  private dialogDescription(
    action: 'block' | 'unblock' | 'edit' | 'delete' | 'reset-password'
  ) {
    switch (action) {
      case 'block':
        return "Sei sicuro di voler bloccare l'utente? L'utente non potrà più accedere al backoffice.";
      case 'delete':
        return "Sei sicuro di voler eliminare l'utente? L'azione è irreversibile";
      case 'reset-password':
        return 'Sei sicuro di voler inviare una mail per il reset della password a questo utente?';
      default:
        return "Sei sicuro di voler bloccare l'utente?";
    }
  }

  //a function that gets the users and assigns the response to a subject
  private emitGetUsers() {
    return this.usersService.getUsers().pipe(
      tap((users) => {
        this.usersSubject.next(users);
      })
    );
  }
}
