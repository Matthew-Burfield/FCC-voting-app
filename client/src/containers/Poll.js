import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { Spin } from 'antd'

import ContentHeader from '../components/ContentHeader'
import DisplayVotes from '../components/DisplayVotes'
import PieChart from '../components/PieChart'

const Poll = ({ authenticated, isLoading, survey }) => {
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
	return (
		<div style={{ height: '100vh' }}>
			<ContentHeader>{ survey.title }</ContentHeader>
			<DisplayVotes
				authenticated={ authenticated }
				pollId={ survey.id }
				pollOptions={ survey.pollOptions }
			/>
			<PieChart data={ survey.pollOptions } width={ 400 } height={ 400 } />
			<div>
				<h2>Comments</h2>
				<div>
					{
						survey.comments.map(comment => (
							<div key={ comment.datetime }>
								<p>{ comment.value }</p>
								<p>{ comment.datetime }</p>
							</div>
						))
					}
				</div>
					{ !authenticated &&
						<div>
							<div>
								Please log in to leave a comment
							</div>
							<button disabled>Add comment</button>
					}
						</div>
					}
			</div>
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

const mapStateToProps = (state, ownProps) => {
	return {
		isLoading: state.surveys.isLoading,
		survey: state.surveys.surveys[ownProps.match.params.surveyId],
		authenticated: state.user.authenticated,
	}
}

export default connect(mapStateToProps)(Poll);

