import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class MapService {

    constructor(private http: Http) {

    }

    getMapMarkers() {
        return Observable.timer(0, 10000)
        .flatMap((i) =>  this.http.get('assets/hajjMapMarkers.json')
        .map((response : Response) => {
                let markersJson = response.json();
                const markersData = markersJson.mapMarkers;
                let markers = [];
                // console.log(markersData);
                for (const circuit in markersData) {
                    if (markersData.hasOwnProperty(circuit)) {
                        markersData[circuit].circuitName = circuit;
                        var marker = markersData[circuit];
                        markers.push(marker);
                    }
                }
                
                return markers;
            }
        )
        .catch(
            (error : Response) => {
                console.log(error);
                return Observable.throw('Error fetching markers data.');
            }
        ));     
    }

}