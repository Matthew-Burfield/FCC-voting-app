import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'
import Layout, { Content } from 'antd/lib/layout'
import 'antd/lib/layout/style/css'

import Header from '../components/Header'
import AllPolls from './AllPolls'
import Login from './Login'
import MyPolls from './MyPolls'
import NewPoll from './NewPoll'
import Poll from './Poll'
import Security from './Security'

import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
				<Security>
					<Layout>
						<Header />
						<Content
							style={{
								padding: 20,
							}}
						>
							<Route exact path="/" component={ AllPolls }/>
							<Route path="/login" component={ Login }/>
							<Route path="/mypolls" component={ MyPolls }/>
							<Route path="/poll/:surveyId" component={ Poll }/>
							<Route path="/newpoll" component={ NewPoll }/>
						</Content>
					</Layout>
				</Security>
      </Provider>
    );
  }
}

export default App
