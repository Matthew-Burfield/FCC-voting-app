import React from 'react'

const DisplayVotes = ({ pollOptions }) => (
	<div
		style={{
			fontSize: 20,
			textAlign: 'center',
		}}
	>
		{
			pollOptions.map(option => (
				<p key={ option.title }>{ `${ option.title }: ${ option.votes } ${ option.votes === 1 ? 'vote' : 'votes' }` }</p>
			))
		}
	</div>
)

export default DisplayVotes;