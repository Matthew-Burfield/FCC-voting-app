import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { saveSurveys } from '../redux/actions/surveyActions'
import SurveyList from './SurveyList'
import {
	API_DOMAIN
} from '../utilities/constants'

class AllPolls extends Component {
	static propTypes = {
		saveSurveys: PropTypes.func,
		surveys: PropTypes.array,
	}
	static defaultProps = {
		surveys: [],
	}
	constructor(props) {
		super(props)
		this.state = {
			surveys: [],
			isLoading: true,
		}	
	}
	componentDidMount() {
		axios
			.get(`${API_DOMAIN}/surveys`)
			.then(response => response.data)
			.then(surveys => {
				this.props.saveSurveys(surveys)
				this.setState({
					isLoading: false,
				})
			})
	}
	render() {
		return (
			<div>
				All Polls ({ this.props.surveys.length })
				<SurveyList surveys={ this.props.surveys } />
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  saveSurveys (surveys) {
    return dispatch(saveSurveys(surveys))
  },
})

const mapStateToProps = (state) => ({
	surveys: state.surveys
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
