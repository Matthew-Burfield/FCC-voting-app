import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '../redux/store'
import  { Layout } from 'antd'

import Header from '../components/Header'
import AllPolls from './AllPolls'
import Login from './Login'
import MyPolls from './MyPolls'
import NewPoll from './NewPoll'
import Poll from './Poll'
import Security from './Security'

const { Content } = Layout

const contentStyles = {
	padding: 20,
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
				<Security>
					<Layout>
						<Header />
						<Content style={ contentStyles }>
							<Route exact path="/" component={ AllPolls }/>
							<Route path="/login" component={ Login }/>
							<Route path="/mypolls" component={ MyPolls }/>
							<Route path="/poll/:surveyId" component={ Poll }/>
							<Route path="/newpoll" component={ NewPoll }/>
							<Route path="/editpoll/:surveyId" component={ NewPoll }/>
						</Content>
					</Layout>
				</Security>
      </Provider>
    );
  }
}

export default App
