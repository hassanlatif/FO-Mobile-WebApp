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
  alarms: Alarms;

  constructor(private alarmsService: AlarmsService) {

  }

  ngOnInit() {
    this.getAlarms();
  }
  
  getAlarms() {
     this.alarmsService.getAlarms().subscribe(
       (alarms: Alarms) => {
        console.log(this.alarms);
        this.alarms = alarms
        console.log(this.alarms);
        },
       (error) => console.log("Error fetching alarms:", error)
     );

  }
  


}
