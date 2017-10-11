import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Spin } from 'antd'

import ContentHeader from '../components/ContentHeader'
import { saveSurveys } from '../redux/actions/surveyActions'
import SurveyList from '../components/SurveyList'

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

	render() {
		return (
			<div>
				<ContentHeader>All Polls ({ this.props.surveys.length })</ContentHeader>
				{ this.state.isLoading
					?
						<Spin size="large" />
					:
						<SurveyList surveys={ this.props.surveys } />
				}
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
