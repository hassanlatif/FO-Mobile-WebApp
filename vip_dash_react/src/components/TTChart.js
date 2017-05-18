import { LineChart } from 'react-chartjs';
import React from 'react';

export default class TTChart extends React.Component {
  constructor() {
    super();

    this.state = {
      data: [10,20,30,40]
    };
  }


  render() {
    return (
           <LineChart data={this.state.data} width="100" height="150"/>
      );
  
  }
}