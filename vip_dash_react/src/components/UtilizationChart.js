import { Chart } from 'react-google-charts';
import React from 'react';

export default class UtilizationChart extends React.Component {
  constructor() {
    super();
    this.state = {
      options : {
        legend: { position: 'none' },
        chartArea: {width: '65%', height:'75%', top:0, left:'25%'},
        hAxis: {
          minValue: 0
        },
      },
      data: [
      ['Circuit', 'Utilizaiton'],
      ['ABC_XYZ_123', 52],
      ['ABC_XYZ_123', 75],
      ['ABC_XYZ_123', 84],
      ['ABC_XYZ_123', 94],      
      ['ABC_XYZ_123', 94],      
      ],
    };
  }
  render() {
    return (
      <Chart
      chartType="BarChart"
      data={this.state.data}
      options={this.state.options}
      graph_id="UtilChart"
      width="100%"
      height="150px"
      legend_toggle
      />
      );
  }
}