import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import './ChartComponent.css';

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
    this.calcChart = this.calcChart.bind(this);
  }

  calcChart(inputData) {
    if (!inputData) return;

    let values = [];
    let {inputData: {a: a}, inputData: {b: b}, inputData: {c: c}} = inputData;
    let calcRecult = a.value - b.value + c.value;

    values.push(calcRecult);
    return {
      labels: [' '],
      datasets: [{
        label: 'Reportable loss',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: values
      }]
    }
  }

  render() {
    return (
      <div className="tab-area">
        <ul className="tab-list">
          <li className="active">
            <a href="#">
              Breakeven Analysis
            </a>
          </li>
          <li>
            <a href="#">
              Breakeven Analysis
            </a>
          </li>
        </ul>
        <div className="tab-content">
          <div className="tab">
            <div className="chart-area">
              <Bar id="customBarChart" data={this.calcChart(this.props)} options={chartOptions} redraw/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
