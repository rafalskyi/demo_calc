import React, { Component } from 'react';
// import logo from './logo.svg';
import './reset.css';
import './index.css';
import './App.css';

import NumericInput from 'react-numeric-input';
import CustomChart from './ChartComponent';

let dataFromServer = {
  variables: {
    a: {
      value: 1000,
      label: 'Balance due at repossession, $'
    },
    b: {
      value: 2,
      label: 'Fair market value, $'
    },
    c: {
      value: 3,
      label: 'Fair market value, $'
    },
  },
  formula: 'variables.b.value-variables.a.value'
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputData: dataFromServer.variables,
      formula: dataFromServer.formula,
      result: this.calcResults(dataFromServer)
    };

    this.calculate = this.calculate.bind(this)
  }

  calcResults(data) {
    let {variables, formula} = data;
    return eval(formula);
  }

  calculate(variableName, newValue){
    dataFromServer.variables[variableName].value = newValue;
    let result = this.calcResults(dataFromServer);
    this.setState({result: result});
  }

  renderInputs() {
    let inputs = [];

    for(let varName in dataFromServer.variables) {
      inputs.push(
        <div className="form-group row"
             key={varName.toString()}>
          <div className="label-area">
            <label>{dataFromServer.variables[varName].label}</label>
          </div>
          <div className="input-area">
            <NumericInput
              name={varName}
              value={dataFromServer.variables[varName].value}
              onChange={(newVal, strNewVal, element) => this.calculate(varName, newVal)}/>
              <i className="fa fa-commenting"></i>
          </div>
        </div>);
    }
    return inputs;
  }

  render() {

    return (
      <div className="App">
        <div className="app-header text-center">
          <h2>Welcome to OKCalculator</h2>
        </div>
        <div className="container">
          <div className="box-alignment md text-center">
            <div className="calculator-area mb10 disabled">
              <div className="calculator-header">
                <h1 className="h1">
                  Test a new calculator
                </h1>
              </div>
              <div className="calculator-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="inputs-area">
                      <h3 className="mb10 h3">Breakeven analysis</h3>
                      {this.renderInputs()}
                    </div>
                  </div>
                  <div className="col-md-6 results-area">
                    <div className="result-group">
                      <div className="result-title">
                        Result: Result: Result: Result:
                        <i className="fa fa-commenting ml5"></i>
                      </div>
                      <div className="pl20">
                        { this.state.result }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CustomChart inputData={this.state.inputData}/>
            </div>
            <a href="https://www.okcalculator.com"
               className="btn mb10"
               target="_blank"
               title="OKCalculator.com">
              OKCalculator.com
            </a>
          </div>
        </div>
      </div>
    );

  }
}

export default App;
