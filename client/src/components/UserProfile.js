
import { Avatar } from 'antd'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

const UserProfile = ({ username, profileImage }) => (
	<div>
		<Avatar
			style={{
				verticalAlign: 'middle',
				marginRight: 10,
			}}
			src={ profileImage }
		/>
		<span>{ username }</span>
	</div>
)

UserProfile.propTypes = {
	username: PropTypes.string,
	profileImage: PropTypes.string,
}

const mapStateToProps = (state) => ({
	username: state.user.username,
	profileImage: state.user.picture,
})

export default connect(mapStateToProps)(UserProfile)
