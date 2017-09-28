import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { saveSurveys } from '../redux/actionCreators'
import {
	API_DOMAIN
} from '../utilities/constants'

class Poll extends Component {
	static propTypes = {
		saveSurveys: PropTypes.func,
		surveyList: PropTypes.array,
	}
	constructor(props) {
		super(props)
		this.state = {
			survey: null,
		}
	}
	componentDidMount() {
		const { match, saveSurveys, surveyList } = this.props
		if (surveyList && surveyList.length > 0) {
			this.setState({
				survey: surveyList.find(survey => survey._id === match.params.surveyId),
			})
		}
		if ((!surveyList || surveyList.length === 0) && (match.params.surveyId && match.params.surveyId.length > 0)) {
			axios
			.get(`${API_DOMAIN}/survey?id=${match.params.surveyId}`)
			.then(response => response.data)
			.then(survey => {
				saveSurveys(survey)
				this.setState({
					isLoading: false,
				})
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		const {
			match,
			surveyList,
		} = nextProps
		if (!this.state.survey && surveyList.length > 0) {
			this.setState({
				survey: surveyList.find(survey => survey._id === match.params.surveyId),
			})
		}
	}
	render() {
		const { survey	} = this.state
		if (!survey) {
			return <h1>Something went wrong and we can't find this survey. Go back and try again</h1>
		}
		return (
			<h1>{ survey.title }</h1>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	saveSurveys: (surveyList) => dispatch(saveSurveys(surveyList)),
})

const mapStateToProps = (state) => ({
	surveyList: state.surveys,
})

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
