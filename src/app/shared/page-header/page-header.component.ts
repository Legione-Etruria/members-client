import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  BreadcrumbsService,
  IBreadcrumb,
} from '../services/breadcrumbs.service';

@Component({
  selector: 'golden-page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent implements OnInit, OnChanges {
  @Input() headerText = '';
  @Input() currentCrub!: IBreadcrumb;
  @Input() buttons: { label: string; routerLink: string; hidden?: boolean }[] =
    [];

  public breadcrumbs = this.breadcrumbsService.breadcrumbs;

  constructor(private breadcrumbsService: BreadcrumbsService) {}

  ngOnInit(): void {
    this._updateBreadcrumbs();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._updateBreadcrumbs();
  }

  private _updateBreadcrumbs() {
    this.breadcrumbsService.add(this.currentCrub);
    this.breadcrumbs = this.breadcrumbsService.breadcrumbs;
  }

  public sliceBreadcrumbs() {
    return this.breadcrumbs.slice(
      this.breadcrumbs.length > 3 ? this.breadcrumbs.length - 3 : 0,
      this.breadcrumbs.length < 1
        ? this.breadcrumbs.length - 2
        : this.breadcrumbs.length - 1
    );
  }
}
