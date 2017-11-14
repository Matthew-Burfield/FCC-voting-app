import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'antd'

import { voteOnPoll } from '../redux/actions/surveyActions'
import { userHasVoted } from '../utilities/utils'


const DisplayVotes = ({ authenticated, pollId, pollOptions, voteOnPoll }) => (
	<div
		style={{
			fontSize: 20,
			textAlign: 'center',
		}}
	>
		{
			pollOptions.map((option, index) => (
				<div key={ option.title }>
					<div>
						<p>{ `${ option.title }` }:</p>
						{
							userHasVoted(pollId) ?
								<p>{ `${ option.votes } ${ option.votes === 1 ? 'vote' : 'votes' }` }</p> :
								<Button
									onClick={ () => voteOnPoll(pollId, index) }
								>
									vote
								</Button>
						}
					</div>
				</div>
			))
		}
	</div>
)

DisplayVotes.propTypes = {
	authenticated: PropTypes.bool,
	pollId: PropTypes.string,
	pollOptions: PropTypes.array,
	voteOnPoll: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
	voteOnPoll: (pollId, optionIndex) => dispatch(voteOnPoll(pollId, optionIndex)),
})

export default connect(null, mapDispatchToProps)(DisplayVotes)