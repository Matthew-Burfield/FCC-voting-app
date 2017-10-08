import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Spin from 'antd/lib/spin'
import 'antd/lib/spin/style/css'

import ContentHeader from '../components/ContentHeader'

class NewPoll extends Component {
	constructor(props) {
		super(props)
		this.state = {
			surveys: [],
			isLoading: true,
		}	
	}
	render() {
		return (
			<div>New Poll</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  // saveSurveys (surveys) {
  //   return dispatch(saveSurveys(surveys))
  // },
})

export default connect(null, mapDispatchToProps)(NewPoll);
