import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Alarms } from "app/interfaces/alarms";

@Injectable()
export class AlarmsService {

    constructor(private http: Http) {

    }

    getAlarms(): Observable<Alarms> {
        return this.http.get('assets/hajjAlarmsData.json')
        .map((response : Response) => {
                const data = response.json();
                return data.alarmsData;
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