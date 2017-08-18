import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

let chartOptions = {
  scales: {
    yAxes: [{
      ticks: {
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
          return '$' + value;
        }
      }
    }]
  }
};

export default class CustomChart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [' '],
        datasets: [{
          label: 'Reportable loss',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [props.inputData.a.value]
        }]
      }
    };
    //let {inputData: {a: a}, inputData: {b: b}, inputData: {c: c}} = props;

//console.log('--->', chartData.datasets[0].data[0]);
    //chartData.datasets[0].data[0] = a.value - b.value + c.value;

    //chartData.datasets[0].data[0] = props.inputData.a.value;
  }

  render() {

    return (
      <Bar id="customBarChart" data={this.state.chartData} options={chartOptions} redraw/>
    );
  }
}