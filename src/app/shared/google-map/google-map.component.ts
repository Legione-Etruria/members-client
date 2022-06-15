import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss'],
})
export class GoogleMapComponent implements OnInit {
  @Input() waypoints: (string | undefined)[] = [];
  @Input() origin: string = 'Rome, Italy';
  @Input() destination: string = 'Rome, Italy';
  @Input() mapClass = 'rounded-lg w-full h-full';
  constructor(private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  public parseLocation() {
    const waypointsParsed = this.waypoints.join('|').split(' ').join('+');

    return this.domSanitizer.bypassSecurityTrustResourceUrl(
      `https://www.google.com/maps/embed/v1/directions?key=AIzaSyCC9c9IyxgUS1yZvDg38PXvP2c7FFgLk6s&origin=${
        this.origin
      }${
        this.waypoints.length ? '&waypoints=' + waypointsParsed : ''
      }&destination=${this.destination}&units=metric
        `
    );
  }
}
