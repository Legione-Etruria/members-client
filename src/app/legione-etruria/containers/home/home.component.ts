import { Component, OnInit } from '@angular/core';
import { GroupOrder } from 'src/app/models/group-order';
import { AuthService } from '../../../auth/services/auth.service';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user = this.authService.currentUserValue;

  public openMobileDropdown = false;
  public showDropdown = 'none';
  public currentOrder$ = this.ordersService.getCurrentOrder();
  public currentOrder!: GroupOrder | null;

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
              routerLink: '/users/browse',
            },
            {
              label: 'Aggiungi',
              routerLink: '/users/create',
            },
          ],
        ],
      },
      roles: ['admin'],
    },
    {
      label: 'Ordini Legio',
      routerLink: '/ordini',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      ],
      dropdownData: {
        label: 'ordini',
        rows: [
          [
            {
              label: 'Ordine in corso',
              disabled: false, //TODO: disabilita il tasto se non ci sono ordini in corso
              routerLink: '/orders/current',
            },
            {
              label: 'Storico Ordini',
              disabled: true,
              routerLink: '/ordini/storico',
            },
            {
              label: 'ottengo ordini',
              roles: ['admin'],
              disabled: true, //TODO: disabilita il tasto se ci sono ordini in corso
              routerLink: '',
            },
          ],
        ],
      },
    },
    {
      label: 'Eventi',
      disabled: true,
      routerLink: '/competitions',
      svgPath: [
        'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      ],
    },
    {
      label: 'Comunicazioni',
      disabled: true,
      routerLink: '/comunicazioni',
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
    {
      label: 'Impostazioni',
      routerLink: '/settings',
      routerParams: { tab: 'account' },
      roles: ['admin', 'athlete'],
      svgPath: [
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      ],
    },
  ];

  constructor(
    private authService: AuthService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.currentOrder$.subscribe((order) => {
      this.currentOrder = order;

      if (!this.navItems[2].dropdownData?.rows) {
        throw new Error('Impossibile error, navBar is missing items');
      }

      this.navItems[2].dropdownData.rows[0][2] = {
        label:
          null !== this.currentOrder
            ? `Ordine #${this.currentOrder.orderPublicId} in corso`
            : 'Aggiungi ordine',
        routerLink: '/orders/add',
        disabled: null !== this.currentOrder,
      };
    });
  }

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
