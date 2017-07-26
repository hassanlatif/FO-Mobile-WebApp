import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AlarmsService } from "app/services/alarms.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {


  @Input() chartInputData: any;
  @Input() chartId: string;
  chartData: any;
  chartOptions: any;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      "utilization": {
        height: 150,
        chartArea: { width: '65%', height: '75%', top: 0, left: '25%' },
        legend: { position: 'none' },
        hAxis: {
          minValue: 0
        }
      },
      "troubleticket": {
      height: 150,
      chartArea: { width: '80%', height: '75%', top: 5 },
      legend: { position: "none" },
      backgroundColor: 'White',
      vAxis: {
        minValue: 0,
      }
    }
  }
}

ngOnChanges(changes: any): void {

  Observable
    .interval(500)
    .skipWhile((s) => this.chartInputData == null)
    .subscribe(() => {
      if (this.chartId === "utilization") {
        let util_array = [['Circuit Name', 'Value']];
        for (let key in this.chartInputData) {
          if (this.chartInputData.hasOwnProperty(key)) {
            util_array.push([key, this.chartInputData[key]]);
          }
        }

        this.chartData = {
          chartType: 'BarChart',
          dataTable: util_array,
          options: this.chartOptions["utilization"]
        };
      }
      else if (this.chartId === "troubleticket") {

        let tt_array = [
          ['Severity', 'Tickets', { role: 'style' }],
          ['Critical', this.chartInputData.Critical, '#DC3912'],
          ['High', this.chartInputData.High, '#FF9900'],
          ['Medium', this.chartInputData.Medium, '#F9ED02']
        ]

        this.chartData = {
          chartType: 'ColumnChart',
          dataTable: tt_array,
          options: this.chartOptions["troubleticket"]
        };

      }
    });
}


}
