import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BreadcrumbsService {
  private _breadcrumbs: IBreadcrumb[] = [];

  public get breadcrumbs(): IBreadcrumb[] {
    return this._breadcrumbs;
  }

  public set breadcrumbs(value: IBreadcrumb[]) {
    this._breadcrumbs = value;
  }

  public add(breadcrumb: IBreadcrumb): void {
    console.log(this._breadcrumbs);
    (this._breadcrumbs = this.breadcrumbs.filter(
      (i) => i.label !== breadcrumb.label
    )),
      this._breadcrumbs.push(breadcrumb);
  }

  public remove(breadcrumb: IBreadcrumb): void {
    this._breadcrumbs = this._breadcrumbs.filter(
      (b) => b.label !== breadcrumb.label
    );

    if (this._breadcrumbs.length === 0) {
      this._breadcrumbs = [
        {
          label: 'Dashboard',
          routerLink: '/dashboard',
        },
      ];
    }
  }

  constructor() {}
}

export interface IBreadcrumb {
  label: string;
  routerLink: string;
  svgPath?: string[];
}
