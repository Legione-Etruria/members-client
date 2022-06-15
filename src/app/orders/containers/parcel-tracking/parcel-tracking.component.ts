import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParcelTracker } from '../../../models/parcel-tracker';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-parcel-tracking',
  templateUrl: './parcel-tracking.component.html',
  styleUrls: ['./parcel-tracking.component.scss'],
})
export class ParcelTrackingComponent implements OnInit {
  public trackerId = this.route.snapshot.queryParamMap.get('t');
  public tracker$ = new Observable<ParcelTracker>();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private domStanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (!this.trackerId) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.tracker$ = this.ordersService.getTracker(this.trackerId);
  }

  public mapTrackerCheckpoints(
    cps: ParcelTracker['checkpoints']
  ): { date: string; title: string; description: string }[] {
    return cps.map((cp) => {
      return {
        date: this.formatDate(new Date(cp.time)),
        title: cp.message,
        description: `${cp.location}`,
      };
    });
  }

  //a function that formats a date as a string with an extended month written in the current locale, the day and only the last two digits of the year
  public formatDate(date: Date): string {
    return date.toLocaleDateString('it-IT', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  public parseLocation(checkpoints: ParcelTracker['checkpoints']) {
    const checkPointsMapped = checkpoints.map((cp) =>
      cp.location?.split(' ').join('+')
    );

    const origin = String(checkPointsMapped[0]);

    const waypoints =
      checkpoints.length > 1
        ? checkPointsMapped.slice(1, checkpoints.length - 2)
        : [];

    const destination = String(checkPointsMapped[checkpoints.length - 1]);

    return {
      origin,
      waypoints,
      destination,
    };
  }
}
