import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'antd'

import { userHasVotedOn } from '../utilities/utils'

const DisplayVotes = ({ pollId, pollOptions, usersVoted }) => (
	<div
		style={{
			fontSize: 20,
			textAlign: 'center',
		}}
	>
		{
			pollOptions.map(option => (
				<div key={ option.title }>
					<p>{ `${ option.title }` }:</p>
					{
						userHasVotedOn(pollId) ?
							<p>{ `${ option.votes } ${ option.votes === 1 ? 'vote' : 'votes' }` }</p> :
							<Button />
					}
				</div>
			))
		}
	</div>
)

DisplayVotes.propTypes = {
	authenticated: PropTypes.bool,
	pollId: PropTypes.string,
	pollOptions: PropTypes.array,
}

export default DisplayVotes;