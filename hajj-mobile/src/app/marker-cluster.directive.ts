import { Directive, Input, OnInit, Attribute, OnChanges } from '@angular/core';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { Observable } from 'rxjs';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: 'marker-cluster'
})
export class MarkerClusterDirective implements OnInit, OnChanges {
  @Input() public points: any[];
  @Input('color') markerColor: string;
  markerCluster: any;
  markers: any[] = [];
  markerIcon: any;
  style: any;
  options: any;

  constructor(private gmapsApi: GoogleMapsAPIWrapper) {

  }

  public ngOnInit() {

      this.markerIcon = {
        url: '/assets/marker_'+ this.markerColor +'.png', 
      };

      this.style = {
        url: '/assets/cluster_'+ this.markerColor +'.png',
        height: 40,
        width: 40,
        textColor: '#FFF',
        textSize: 11,
        backgroundPosition: 'center center'
      };    

      this.options = {
        imagePath: '/assets/cluster',
        gridSize: 70,
        styles: [this.style, this.style, this.style]
      };      

  }

  public ngOnChanges(changes: any) {

    this.gmapsApi.getNativeMap().then((map) => {

      // console.log(this.points)
      Observable
        .interval(250)
        .skipWhile((s) => this.points == null)
        .take(1)
        .subscribe(() => {
          if(this.markerCluster) {
            this.markerCluster.clearMarkers();
            this.markers = [];
          }
          if (this.points.length > 0) {
            for (const point of this.points) {

              const marker = new google.maps.Marker({
                position: new google.maps.LatLng(point.latitude, point.longitude),
                icon: this.markerIcon
              });

              const contentString = '<div id="info-window">' +
                                       '<b>Customer:</b> ' + point.customer + '<br>' +
                                       '<b>Circuit ID:</b> ' + point.circuitName 
                                    '</div>';
              const infowindow = new google.maps.InfoWindow({
                content: contentString
              });
              
              marker.addListener('click', function() {
                infowindow.open(map, marker);
              });
   
              this.markers.push(marker);
            }
          } else {
            this.markers = [];
          }
          this.markerCluster = new MarkerClusterer(map, this.markers, this.options);
        });
    });

  }

}
