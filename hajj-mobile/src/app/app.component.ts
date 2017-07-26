import { MapService } from './services/map.service';
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
  alarms: any;
  alarmsTrend: any;
  mapMarkers: any;


  constructor(private alarmsService: AlarmsService, private mapService: MapService) {

  }

  ngOnInit() {
    this.getMarkers();
    this.getAlarms();
  }

  getMarkers() {
    this.mapService.getMapMarkers().subscribe(
      (markers: any) => {
        this.mapMarkers = markers
        // console.log(this.mapMarkers);
        },
       (error) => console.log("Error fetching markers:", error)
    );

  }
  
  getAlarms() {
     this.alarmsService.getAlarms().subscribe(
       (newAlarms) => {

        if (newAlarms && this.alarms) {
          this.getAlarmsTrend(newAlarms, this.alarms)         
        }

        this.alarms = newAlarms
        console.log(this.alarms);
        
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

			// console.log(alarmsCount);
			this.alarmsTrend = alarmsCount;
		}  
  


}
