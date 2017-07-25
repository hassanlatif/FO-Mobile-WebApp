import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-widget',
  templateUrl: './alarm-widget.component.html',
  styleUrls: ['./alarm-widget.component.css']
})
export class AlarmWidgetComponent implements OnInit {

  @Input() title: string;
  @Input('alarm-count') alarmCount: number;
  @Input('alarm-status') alarmStatus: number;
  @Input() id: string;
  @Input() size: string;
  @Input() color: string;

  trendShape: string;
  shapeSize: string;
  shapeColor: string;
  trendColor: string;
  textOrient: string;

  constructor() { }

  ngOnInit() {

    this.trendShape = this.color + '-circle';
    this.shapeSize = 'circle-' + this.size;

    console.log(this.trendShape, this.shapeSize);
  
  }

  ngOnChanges(changes: any) {

      if (this.alarmStatus > 0) {
          this.trendShape = 'triangle';
          this.shapeColor = this.color + '-triangle';
          this.textOrient = '';         
          this.trendColor = 'red';
      }
      else if (this.alarmStatus < 0) {
          this.trendShape = 'triangle invert';
          this.shapeColor = this.color + '-triangle';
          this.textOrient = 'invert';
          this.trendColor = 'green';
      }  
      else {
          this.shapeColor = this.color + '-circle';
          this.trendShape = 'circle-' + this.size;   
          this.textOrient = '';
          this.trendColor = 'black'            
      }
          
      console.log("Changes", changes)

  }



}
