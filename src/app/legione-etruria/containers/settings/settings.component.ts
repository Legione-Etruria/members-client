import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  catchError,
  filter,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { UsersService } from 'src/app/users/services/users.service';
import { environment } from '../../../../environments/environment.prod';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  public currentUser = this.authService.currentUserValue;
  public loading = false;
  public currentTab = this.route.snapshot.queryParamMap.get('tab');
  public TabsItems = [
    {
      label: 'Generali',
      tabId: 'general',
    },
    {
      label: 'Account',
      tabId: 'account',
    },
  ];

  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (!this.route.snapshot.queryParamMap.get('tab')) {
      this.router.navigate(['/settings'], { queryParams: { tab: 'general' } });
    }
    this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => this.onNavigationEnd())
      )
      .subscribe();
  }

  private onNavigationEnd(): any {
    this.currentTab = this.route.snapshot.queryParamMap.get('tab') || '';
    return of();
  }

  public deleteUser() {
    return this.authService
      .deleteUser(this.currentUser._id)
      .pipe(tap(() => this.authService.signOut()));
  }

  public editUser(form: any) {
    this.loading = true;

    let normalizedForm: typeof form = form;

    Object.keys(form).forEach((key: any) => {
      if (form[key]) {
        normalizedForm[key] = form[key];
      }
    });

    return this.userService.editUser(this.currentUser._id, normalizedForm).pipe(
      tap((result) => {
        this.toastr.success('Modifiche salvate');
        this.loading = false;
        localStorage.setItem(environment.localStorageJWT, result.token);
        this.authService.refreshUserSubject();
      }),
      catchError(async (err) => {
        this.loading = false;
        this.toastr.error(err.errors[0].message);
      })
    );
  }
}
