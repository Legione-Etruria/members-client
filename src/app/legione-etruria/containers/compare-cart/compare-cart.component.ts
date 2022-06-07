import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compare-cart',
  templateUrl: './compare-cart.component.html',
  styleUrls: ['./compare-cart.component.scss'],
})
export class CompareCartComponent implements OnInit {
  public shop: string = this.route.snapshot.queryParamMap.get('shop') || '';
  public orderId: string = this.route.snapshot.queryParamMap.get('order') || '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
