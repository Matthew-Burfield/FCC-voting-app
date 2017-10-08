import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import {
	authDomain,
	audience,
	scope,
	responseType,
	clientId,
	redirectUrl,
	nonce,
	state,
} from '../utilities/constants'
import { logoutUser } from '../redux/actions/userActions'

import './Header.css'


const HeaderLogin = ({ isAuthenticated, logoutUser }) => (
	<div>
		{ isAuthenticated ?
			<button className='header-button'
				onClick={ logoutUser }
			>
				Logout
			</button>
			:
			<button className='header-button'>
				<a
					className='header-a'
					href={ `https://${authDomain}/authorize?audience=${audience}&scope=${scope}&response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUrl}&nonce=${nonce}&state=${state}` }
				>
					Login
				</a>
			</button>
		}
	</div>
)

HeaderLogin.propTypes = {
	logoutUser: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
	logoutUser: () => dispatch(logoutUser()),
})

export default connect(null, mapDispatchToProps)(HeaderLogin)
