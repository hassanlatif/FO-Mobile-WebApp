import { Alarms } from './interfaces/alarms';
import { AlarmsService } from './services/alarms.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hajj Mobile dashboard';
  serviceAlarms: Alarms = null;// = {UPEStats: {Down: 0} };

  constructor(alarmsService: AlarmsService) {
    this.getAlarms();
  }

  ngOnInit() {
  }
  
  getAlarms() {
     this.alarmsService.getAlarms().subscribe(
       (data : any) => {this.serviceAlarms = data.alarmsData; console.log(this.serviceAlarms);},
       (error) => console.log("Error fetching alarms:", error)
     )

  }
  


}
