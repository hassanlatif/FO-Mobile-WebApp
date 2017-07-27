import { ModalComponent } from './modal/modal.component';
import { MapService } from './services/map.service';
import { AlarmsService } from './services/alarms.service';
import { Component, OnInit, Output, ViewChild, ContentChild, AfterContentInit } from '@angular/core';
import * as _ from "lodash";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'Hajj Mobile dashboard';
  alarms: any;
  alarmsTrend: any;
  mapMarkers: any;
  alarmsMsg: string;

  @ViewChild(ModalComponent) alarmsModal;


  constructor(private alarmsService: AlarmsService, private mapService: MapService) {

  }

  ngOnInit() {
    this.getMarkers();
    this.getAlarms();
  }

  ngAfterContentInit() {

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
          this.getAlarmsTrend(newAlarms, this.alarms);
          this.alarmsMsg = this.getNewAlarmsCount(this.alarms, newAlarms);          
        }

        this.alarms = newAlarms;

        if (this.alarmsMsg && this.alarmsMsg!="") {
            this.alarmsModal.show();
        }


      },
      (error) => console.log("Error fetching alarms:", error)
    );

  }

  getNewAlarmsCount(oAlarms, nAlarms): string {
    var newAlarmsStr = "";

    var oldAlarms = null;
    var newAlarms = null;

    if (!_.isEqual({}, oAlarms)) {

      oldAlarms = { ...oAlarms }; //deep copy
      newAlarms = { ...nAlarms };

      delete oldAlarms.Utilization;
      delete oldAlarms.TechStats;
      delete newAlarms.Utilization;
      delete newAlarms.TechStats;
    }

    for (let alarmType in oldAlarms) {
      var alarmTypeCount = 0;
      for (let key in oldAlarms[alarmType]) {
        if (key != "Up" && newAlarms[alarmType][key] > oldAlarms[alarmType][key]) {
          alarmTypeCount = alarmTypeCount + (newAlarms[alarmType][key] - oldAlarms[alarmType][key]);
        }
      }
      if (alarmTypeCount > 0) {
        newAlarmsStr = newAlarmsStr + alarmType + " : " + alarmTypeCount + " new alarm(s). \n";
      }
    }

    newAlarmsStr = newAlarmsStr.replace("Stats", "");
    // console.log(newAlarmsStr);
    return newAlarmsStr;
  }


  getAlarmsTrend(nAlarms, oAlarms) {
    var alarmsCount = {};

    var oldAlarms = null;
    var newAlarms = null;

    if (!_.isEqual({}, oAlarms)) {

      oldAlarms = { ...oAlarms }; //deep copy
      newAlarms = { ...nAlarms };

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
