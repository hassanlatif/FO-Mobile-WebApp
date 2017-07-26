import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  pieChartData: any;

  constructor() { }

  ngOnInit() {
    this.pieChartData = {
      chartType: 'BarChart',
      dataTable: [
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
      ],

      options: {
        height: 150,
        chartArea: { width: '65%', height: '75%', top: 0, left: '25%' },
        legend: { position: 'none' },
        hAxis: {
          minValue: 0
        },
      }
    };
  }

}
