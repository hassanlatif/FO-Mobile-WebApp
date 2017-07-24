import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alarm-widget',
  templateUrl: './alarm-widget.component.html',
  styleUrls: ['./alarm-widget.component.css']
})
export class AlarmWidgetComponent implements OnInit {

  @Input() title: string;
  @Input('alarm-count') alarmCount: number;
  @Input() id: string;

  constructor() { }

  ngOnInit() {
  }

}
