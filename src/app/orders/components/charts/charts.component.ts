import { Component, Input } from '@angular/core';
import { Color, LegendPosition } from '@swimlane/ngx-charts';
import { GroupOrder } from 'src/app/models/group-order';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent {
  @Input() currentOrder!: GroupOrder;
  @Input() ilsemaforoFreeShipping!: { name: string; value: number }[];
  @Input() taiwangunFreeShipping!: { name: string; value: number }[];
  @Input() chartColors: string | Color = '#9C9E7F';
  @Input() legendPos: LegendPosition = LegendPosition.Below;
  @Input() formatCurrency: (value: any) => string = (value) => value;
}
