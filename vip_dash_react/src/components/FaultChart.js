import { Chart } from 'react-google-charts';
import React from 'react';

export default class FaultChart extends React.Component {
  constructor() {
    super();
    this.state = {
     options : {
        chartArea: {width: '80%', height:'75%', top:5}, 
        legend: { position: "none" },
        backgroundColor: 'White',
        vAxis: {
          minValue:0,
        }       
      },
      data: [
      ['Severity', 'TicketsCount', { role: 'style' } ],
      ['Criticial', 52, '#DC3912'],
      ['High', 75, '#FF9900'],
      ['Medium', 84, '#F9ED02'],
      ],
    };
  }
  render() {
    return (
      <Chart
      chartType="ColumnChart"
      data={this.state.data}
      options={this.state.options}
      graph_id="FaultChart"
      width="100%"
      height="150px"
      legend_toggle
      />
      );
  }
}