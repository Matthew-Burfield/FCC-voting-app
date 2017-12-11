import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { Spin } from 'antd'
import { withRouter } from 'react-router-dom'

import Comments from '../components/Comments'
import ContentHeader from '../components/ContentHeader'
import DisplayVotes from '../components/DisplayVotes'
import PieChart from '../components/PieChart'
import { deletePoll } from '../redux/actions/surveyActions'

const deletePollFactory = (deletePoll, surveyId, history) => () => {
	deletePoll(surveyId).then((results) => {
		console.log(results)
		history.push('')
	})
}

const Poll = ({ authenticated, deletePoll, history, isLoading, survey, userId }) => {
	if (isLoading) {
		return (
			<Spin size="large" spinning={ isLoading || !survey }>
				<div style={{ height: '100vh' }}></div>
			</Spin>
		)
	}
	if (!survey) {
		return <h1>Something went wrong and we can't find this survey. Go back and try again</h1>
	}
	const handleDelete = deletePollFactory(deletePoll, survey._id, history)
	return (
		<div style={{ height: '100vh' }}>
			<ContentHeader>{ survey.title }</ContentHeader>
			<DisplayVotes
				authenticated={ authenticated }
				pollId={ survey._id }
				pollOptions={ survey.pollOptions }
			/>
			{
				authenticated && userId === survey.createdBy ?
					<button onClick={ handleDelete }>Delete survey</button> :
					null
			}
			{
				authenticated ?
					<button onClick={ () => {} }>Add new poll option</button> :
					null
			}
			<PieChart data={ survey.pollOptions } width={ 400 } height={ 400 } />
			<Comments
				authenticated={ authenticated }
				data={ survey.comments }
				pollId={ survey._id }
			/>
		</div>
	)
}

Poll.propTypes = {
	authenticated: PropTypes.bool,
	isLoading: PropTypes.bool,
	match: PropTypes.object,
	survey: PropTypes.object,
}

Poll.default = {
	isLoading: true,
}

const mapDispatchToProps = (dispatch) => ({
	deletePoll: (pollId) => dispatch(deletePoll(pollId)),
});

const mapStateToProps = (state, ownProps) => {
	return {
		authenticated: state.user.authenticated,
		isLoading: state.surveys.isLoading,
		survey: state.surveys.surveys[ownProps.match.params.surveyId],
		userId: state.user.sub,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Poll));

