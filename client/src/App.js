import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import AppBar from './components/AppBar';
import AllPolls from './components/AllPolls';
import MyPolls from './components/MyPolls';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar
          isLoggedIn={ false }
        />
        <Route exact path="/" component={ AllPolls }/>
        <Route path="/mypolls" component={ MyPolls }/>
      </div>
    );
  }
}

export default App;
