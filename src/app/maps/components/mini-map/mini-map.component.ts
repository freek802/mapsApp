import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {
  @Input() lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 13;
  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw 'Map div not found';
    if (!this.lngLat) throw 'LngLat not found';

    const [lng, lat] = this.lngLat!;
    const coords = new LngLat(lng, lat);

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: coords, // starting position [lng, lat]
      zoom: this.zoom,
      interactive: false, // starting zoom
    });
  }
}
