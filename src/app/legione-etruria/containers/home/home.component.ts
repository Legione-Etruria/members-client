import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user = this.authService.currentUserValue;

  public openMobileDropdown = true;
  public showDropdown = 'none';

  public navItems: INavOption[] = [
    {
      label: 'Ordini Legio',
      routerLink: '/ordini',
      roles: ['admin', 'athlete'],
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
  ngOnInit(): void {}
}

interface INavOption {
  label: string;
  svgPath?: string;
  routerLink?: string;
  routerParams?: Record<string, unknown>;
  href?: string;
  dropdownData?: { label: string; rows?: INavOption[][] };
  roles?: string[];
}
