import React, { Component } from 'react';
import { hot } from 'react-hot-loader'

import './App.css';

import Chart from './components/chart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Chart></Chart>
      </div>
    );
  }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App
