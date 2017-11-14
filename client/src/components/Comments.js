import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'

import CommentsForm from './CommentsForm'

const Comments = ({ authenticated, data, pollId }) => {

	return (
		<div>
			<h2>Comments</h2>
			<div>
				{
					data.length === 0
						?
							'There are no comments for this poll. Be the first to leave a comment!'
						:
							data.map(comment => (
								<div key={ comment.datetime }>
									<p>{ comment.value }<span style={{ opacity: 0.8 }}> - { moment(comment.datetime).format('DD, MMM YYYY') }</span></p>
								</div>
							))
				}
			</div>
				{ !authenticated ?
						<div>
							Please log in to leave a comment
						</div>
					:
						<CommentsForm pollId={ pollId } />
				}
		</div>
	)
}

Comments.propTypes = {
	data: PropTypes.array,
	authenticated: PropTypes.bool,
}

export default Comments
