import React, { Component } from 'react';
import './App.scss';

import ECGChart from './components/ECGChart';

class App extends Component {
  render() {
    return (
      <div>
        <ECGChart />
      </div>
    );
  }
}

export default App;
