import { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import jwtDecode from 'jwt-decode'
import {
	checkTokenIsValid,
	getAccessToken,
	getTokenId,
} from '../utilities/utils.js'
import {
	loginUser,
	logoutUser,
} from '../redux/actions/userActions'
import { getAllPolls } from '../redux/actions/surveyActions'

/**
 * This HOC just decodes the token_id and ensures it's validity. If it's valid, it sets
 * the user to being authenticated.
 * It will also grab all the surveys on initial render regardless if the user is logged in
 * or not.
 * 
 * @class Initialization
 * @extends {Component}
 */
class Initialization extends Component {
	static propTypes = {
		getAllPolls: PropTypes.func,
		loginUser: PropTypes.func,
	}

	componentDidMount() {
		const { loginUser, getAllPolls } = this.props
		// check if there is an fccvotingapp property in localstorage with tokens
		// If there is, validate then, and then log the user in
		// Check if the access token and id token are in localStorage (i.e. they are already logged in)
		const tokenId = getTokenId()
		const accessToken = getAccessToken()

		// validate the tokenId and get the user data
		if (checkTokenIsValid(tokenId) && checkTokenIsValid(accessToken)) {
			loginUser(jwtDecode(tokenId))
		} else {
			logoutUser()
		}

		getAllPolls();	
	}
				
	render() {
		return this.props.children
	}
}

const mapDispatchToProps = (dispatch) => ({
	getAllPolls: () => dispatch(getAllPolls()),
	loginUser: (decodedToken) => dispatch(loginUser(decodedToken)),
	logoutUser: () => dispatch(logoutUser()),
})

export default connect(null, mapDispatchToProps)(Initialization)

