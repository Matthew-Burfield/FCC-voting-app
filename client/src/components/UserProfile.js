
import Avatar from 'antd/lib/avatar'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import 'antd/lib/avatar/style/css'


const UserProfile = ({ username, profileImage }) => (
	<div>
		<Avatar src={ profileImage } />
		<div>{ username }</div>
	</div>
)

UserProfile.propTypes = {
	username: PropTypes.string,
	profileImage: PropTypes.string,
}

const mapStateToProps = (state) => ({
	username: state.user.given_name,
	profileImage: state.user.picture,
})

export default UserProfile
