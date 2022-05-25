import { Component, Input } from '@angular/core';
import { IAlbum, Lightbox } from 'ngx-lightbox';
import { OrderItem } from 'src/app/models/order-item';

@Component({
  selector: 'app-items-list-widget',
  templateUrl: './items-list-widget.component.html',
  styleUrls: ['./items-list-widget.component.scss'],
})
export class ItemsListWidgetComponent {
  @Input() orderItems: OrderItem[] = [];

  constructor(private _lightbox: Lightbox) {}

  open(index: number): void {
    const album: IAlbum[] = this.orderItems.map((i) => ({
      src: i.imgSrc,
      caption: i.itemName,
      thumb: i.imgSrc,
      downloadUrl: i.imgSrc,
    }));

    console.log(index);
    // open lightbox
    this._lightbox.open(album, index);
  }
}
