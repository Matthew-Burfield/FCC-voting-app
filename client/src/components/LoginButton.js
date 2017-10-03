import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import Button from 'antd/lib/button'
import 'antd/lib/button/style/css'

import { logoutUser } from '../redux/actions/userActions'

const LoginButton = ({ isAuthenticated, logoutUser }) => (
	<div>
		{ isAuthenticated ?
			<Button
				label='Logout'
				onClick={ logoutUser }
				size='large'
			>
				Logout
			</Button>
			:
			<Button
				label='login'
				href='https://matthew-burfield.au.auth0.com/authorize?audience=matthew-burfield.com.au/voting-app&scope=openid%20profile%20email&response_type=id_token%20token&client_id=9a0Bi5RDIAHWs8j3hwGJm8EEPR17IIGE&redirect_uri=http://localhost:3000/login&nonce=123abcstate=123abc'
				size='large'
			>
				Login
			</Button>
		}
	</div>
)

LoginButton.propTypes = {
	isAuthenticated: PropTypes.bool,
	logoutUser: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser()),
})

const mapStateToProps = (state) => ({
	isAuthenticated: state.user.authenticated,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginButton)
