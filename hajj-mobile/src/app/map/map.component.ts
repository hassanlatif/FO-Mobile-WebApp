import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnChanges {

  lat: number = 24.587815;
  lng: number = 46.210261;
  zoom: number = 5;

  @Input() markers: any = [];
  markers_UP: any[] = [];
  markers_DOWN: any[] = [];

  constructor() { }

 ngOnInit() {

  }

  ngOnChanges() {

        if (this.markers) {

          this.markers_UP = [];
          this.markers_DOWN= [];

          this.markers.forEach(marker => {
            if (marker.circuitStatus === "UP") {
              this.markers_UP.push(marker)
            }
            else {
              this.markers_DOWN.push(marker)
            }

          });

        // console.log(this.markers_UP);
        // console.log(this.markers_DOWN);

      }
  }

}
