
import Avatar from 'antd/lib/avatar'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import 'antd/lib/avatar/style/css'


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
	username: state.user.given_name,
	profileImage: state.user.picture,
})

export default connect(mapStateToProps)(UserProfile)