import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { Spin } from 'antd'

import ContentHeader from '../components/ContentHeader'
import { saveSurveys } from '../redux/actions/surveyActions'
import SurveyList from '../components/SurveyList'

const AllPolls = ({ isLoading, surveys }) => (
	<Spin
		size="large"
		spinning={ isLoading }
	>
		<ContentHeader>All Polls ({ Object.keys(surveys).length })</ContentHeader>
		<SurveyList surveys={ Object.values(surveys) } />
	</Spin>
)

AllPolls.propTypes = {
	isLoading: PropTypes.bool,
	saveSurveys: PropTypes.func,
	surveys: PropTypes.object,
}

AllPolls.defaultProps = {
	isLoading: true,
	surveys: {},
}

const mapDispatchToProps = (dispatch) => ({
  saveSurveys (surveys) {
    return dispatch(saveSurveys(surveys))
  },
})

const mapStateToProps = (state) => ({
	isLoading: state.surveys.isLoading,
	surveys: state.surveys.surveys,
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
