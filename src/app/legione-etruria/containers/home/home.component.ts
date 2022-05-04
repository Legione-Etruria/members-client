import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public user = this.authService.currentUserValue;

  public openMobileDropdown = true;
  public showDropdown = 'none';

  public navItems: INavOption[] = [
    {
      label: 'Home',
      routerLink: '/home',
      svgPath: [
        'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      ],
      roles: ['admin', 'athlete'],
    },
    {
      label: 'Gestione Atleti',
      routerLink: '/athletes',
      svgPath: [
        'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      ],
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
              routerLink: '/ordini/in-corso',
            },
            {
              label: 'Storico Ordini',
              routerLink: '/ordini/storico',
            },
          ],
        ],
      },
    },
    {
      label: 'Comunicazioni',
      routerLink: '/comunicazioni',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      ],
    },
    {
      label: 'Impostazioni',
      routerLink: '/settings',
      roles: ['admin', 'athlete'],
      svgPath: [
        'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
        'M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      ],
    },
  ];

  constructor(private authService: AuthService) {}
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
  href?: string;
  dropdownData?: { label: string; rows?: INavOption[][] };
  roles?: string[];
}
