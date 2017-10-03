import { Component } from 'react'
import { connect } from 'react-redux'
import Redirect from 'react-router-dom'
import PropTypes from 'prop-types'

import jwtDecode from 'jwt-decode'
import {
	getAccessToken,
	getTokenId,
	saveTokensToLocalStorage,
} from '../utilities/utils.js'
import { loginUser } from '../redux/actions/userActions'

class Security extends Component {
	static propTypes = {
		loginUser: PropTypes.func,
	}

	constructor(props) {
		super(props)
		this.state = {
			isAuthenticated: false,
		}
	}

	componentDidMount() {
		// check if there is an fccvotingapp property in localstorage with tokens
		// If there is, validate then, and then log the user in
		// Check if the access token and id token are in localStorage (i.e. they are already logged in)
		const tokenId = getTokenId()
		const accessToken = getAccessToken()

		// validate the tokenId and get the user data
		try {
			const decodedToken = jwtDecode(tokenId)
			// var isAuthenticated: jwt && (jwt.exp > Date.now() / 1000);
			this.props.loginUser(decodedToken);
		} catch (InvalidTokenError) {
			console.log('user is not logged in')
		}
	}
				
	render() {
		return this.props.children
	}
}

const mapDispatchToProps = (dispatch) => ({
	loginUser: () => dispatch(loginUser()),
})

export default connect(null, mapDispatchToProps)(Security)

