import { Component } from '@angular/core';
import { map, switchMap, tap } from 'rxjs';
import { User } from 'src/app/auth/models/user';
import { GroupOrder } from 'src/app/models/group-order';
import { OrdersService } from 'src/app/orders/services/orders.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public CURRENT_VERSION = '0.78';

  public user$ = this.authService.currentUserSubject.pipe(
    tap((i) => (this.currentUser = i)),
    switchMap(() => this._genCurrentOrderSection()),
    map(() => this.authService.currentUserValue)
  );

  public currentUser?: User = this.authService.currentUserValue;
  public openMobileDropdown = false;
  public showDropdown = 'none';
  public currentOrder$ = this.ordersService.getCurrentOrder();
  public currentOrder!: GroupOrder | null;

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService
  ) {}

  private _genCurrentOrderSection = () => {
    return this.currentOrder$.pipe(
      tap((order) => {
        this.currentOrder = order;

        if (!this.navItems[2].dropdownData?.rows) {
          throw new Error('Impossibile error, navBar is missing items');
        }
        this.navItems[2].dropdownData.rows[0][0] = {
          label:
            this.currentOrder?.orderStatus === 'pending'
              ? `Ordine Corrente (#${this.currentOrder?.orderPublicId})`
              : 'Nessun ordine disp.',
          routerLink: '/orders/current',
          roles:
            !environment.debugAddItems && 'admin' === this.currentUser?.role
              ? ['athlete']
              : ['admin', 'athlete'],
          disabled:
            this.currentOrder?.no_order ||
            this.currentOrder?.orderStatus !== 'pending' ||
            (!environment.debugAddItems && 'admin' === this.currentUser?.role),
        };

        this.navItems[5].disabled =
          this.currentUser?.role === 'admin' ? false : true;
      })
    );
  };

  public navItems: INavOption[] = [
    {
      label: 'Dashboard',
      routerLink: '/dashboard',
      svgPath: [
        'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      ],
      roles: ['admin', 'athlete'],
    },
    {
      label: 'Atleti',
      svgPath: [
        'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      ],
      dropdownData: {
        label: 'atleti',
        rows: [
          [
            {
              label: 'Atleti iscritti',
              roles: ['admin'],
              routerLink: '/users/browse',
            },
            {
              label: 'Aggiungi',
              roles: ['admin'],
              routerLink: '/users/create',
            },
          ],
        ],
      },
      roles: ['admin'],
    },
    {
      label: 'Ordini Legio',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      ],
      dropdownData: {
        label: 'ordini',
        rows: [
          [
            {
              label: '',
              disabled: true,
              roles: ['athlete'],
              routerLink: '/orders/current',
            },
            {
              label: 'Storico Ordini',
              disabled: true,
              roles: ['admin'],
              routerLink: '/ordini/storico',
            },
            {
              label: 'Dashboard Ordini',
              roles: ['admin'],
              routerLink: '/orders/dashboard',
            },
          ],
        ],
      },
    },
    {
      label: 'Eventi',
      disabled: true,
      routerLink: '/competitions',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      ],
    },
    {
      label: 'Movimenti',
      disabled: true,
      routerLink: '/movements',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z',
      ],
    },
    {
      label: 'Comunicazioni',
      disabled: true,
      routerLink: '/announcements/list',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      ],
    },
    {
      label: 'Documenti Legio',
      routerLink: '/documents',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2',
      ],
    },
  ];

  handleShowDropdown(rowLabel: string, rows?: INavOption[][]) {
    if (!rows?.length) {
      return;
    }

    if (rowLabel === this.showDropdown) {
      return (this.showDropdown = 'none');
    }

    return (this.showDropdown = rowLabel);
  }

  logout() {
    this.authService.signOut();
  }
}

interface INavOption {
  label: string;
  svgPath?: string[];
  routerLink?: string;
  routerParams?: Record<string, unknown>;
  disabled?: boolean;
  href?: string;
  dropdownData?: { label: string; rows?: INavOption[][] };
  roles?: string[];
}
