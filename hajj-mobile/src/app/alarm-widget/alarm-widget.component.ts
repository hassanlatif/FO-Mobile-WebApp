import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-widget',
  templateUrl: './alarm-widget.component.html',
  styleUrls: ['./alarm-widget.component.css']
})
export class AlarmWidgetComponent implements OnInit {

  @Input() title: string;
  @Input('alarm-count') alarmCount: number;
  @Input('alarm-status') alarmStatus: string;
  @Input() id: string;
  @Input() size: string;
  @Input() color: string;

  shapeClass: string;
  shapeSize: string;


  constructor() { }

  ngOnInit() {

    this.shapeClass = this.color + '-circle';
    this.shapeSize = 'circle-' + this.size;

    console.log(this.shapeClass, this.shapeSize);


  }

}
