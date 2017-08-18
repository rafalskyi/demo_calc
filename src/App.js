import React, { Component } from 'react';
import logo from './logo.svg';
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
        <div key={varName.toString()}>
          <label>{dataFromServer.variables[varName].label}</label>
          <NumericInput
            name={varName}
            value={dataFromServer.variables[varName].value}
            onChange={(newVal, strNewVal, element) => this.calculate(varName, newVal)}/>
        </div>);
    }
    return inputs;
  }

  render() {



    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          test new calculator <br/>
        </p>
        {this.renderInputs()}

        <br/>
        result: { this.state.result }
        <br/>
        <CustomChart inputData={this.state.inputData}/>
      </div>
    );
  }
}

export default App;
