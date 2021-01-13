import React, { Component } from 'react';

import './App.scss';
import axios from 'axios'
import FileExport from '../FileExport';
import Statistics from '../Statistics';

class App extends Component {
  state = {
    response: {}
  };
  
  componentDidMount() {
    axios.get('/api/v1/say-something').then((res) => {
      const response = res.data;
      this.setState({response});
    });
  }

  render() {
    return (
      <div className="App">
        <FileExport />
        <Statistics />
      </div>
    );
  }
}

export default App;
