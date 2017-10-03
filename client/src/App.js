import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import AppBar from './components/AppBar'
import AllPolls from './components/AllPolls'
import Login from './components/Login'
import MyPolls from './components/MyPolls'
import Poll from './components/Poll'
import Security from './components/Security'

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
				<Security>
					<div className="App">
						<AppBar
							isLoggedIn={ false }
						/>
						<Route exact path="/" component={ AllPolls }/>
						<Route path="/login" component={ Login }/>
						<Route path="/mypolls" component={ MyPolls }/>
						<Route path="/poll/:surveyId" component={ Poll }/>
					</div>
				</Security>
      </Provider>
    );
  }
}

export default App
