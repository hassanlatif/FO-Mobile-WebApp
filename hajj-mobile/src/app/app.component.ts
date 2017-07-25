import { Alarms } from './interfaces/alarms';
import { AlarmsService } from './services/alarms.service';
import { Component, OnInit, Output } from '@angular/core';
import * as _ from "lodash";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hajj Mobile dashboard';
  alarms: Alarms;
  alarmsTrend: any;


  constructor(private alarmsService: AlarmsService) {

  }

  ngOnInit() {
    this.getAlarms();
  }
  
  getAlarms() {
     this.alarmsService.getAlarms().subscribe(
       (newAlarms: Alarms) => {

        if (newAlarms && this.alarms) {
          this.getAlarmsTrend(newAlarms, this.alarms)         
        }

        this.alarms = newAlarms
 
        },
       (error) => console.log("Error fetching alarms:", error)
     );

  }

	getAlarmsTrend(nAlarms, oAlarms) {	
			var alarmsCount = {};

			var oldAlarms = null;
			var newAlarms = null;

			if (!_.isEqual({}, oAlarms)) {

				oldAlarms = {...oAlarms}; //deep copy
				newAlarms = {...nAlarms};
        
        // console.log(newAlarms, oldAlarms)
        
        delete oldAlarms.Utilization;
				delete oldAlarms.TechStats;
				delete newAlarms.Utilization;
				delete newAlarms.TechStats;			
			}

			for (let alarmType in newAlarms) {
				for (let key in newAlarms[alarmType]) {
					var alarmKey = alarmType + "_" + key;
					var alarmTypeCount = 0;
					if (!_.isEqual({}, oAlarms)) {
						alarmTypeCount = (newAlarms[alarmType][key] - oldAlarms[alarmType][key]);
					}
					alarmsCount[alarmKey] = alarmTypeCount;

				}
			}

			console.log(alarmsCount);
			this.alarmsTrend = alarmsCount;
		}  
  


}
