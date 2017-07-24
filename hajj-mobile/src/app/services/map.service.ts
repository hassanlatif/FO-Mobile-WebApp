import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class MapService {

    constructor(private http: Http) {

    }

    getMapMarkers() {
        return this.http.get('assets/hajjMapMarkers.json')
        .map((response : Response) => {
                const markersData = response.json();
                let markers = [];
                for (const group in markersData) {
                    if (markersData.hasOwnProperty(group)) {
                        markers = markers.concat(markersData[group]);
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
        );     
    }

}