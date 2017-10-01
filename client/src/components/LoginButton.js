import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withAuth } from '@okta/okta-react'
import FlatButton from 'material-ui/FlatButton'

class LoginButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
			authenticated: null
		}
	}

	componentDidUpdate() {
		this.checkAuthentication()
	}

	checkAuthentication =	async () => {
		const authenticated = await this.props.auth.isAuthenticated()
		if (authenticated !== this.state.authenticated) {
			this.setState({
				authenticated,
			})
		}
	}

	render() {
		return this.state.authenticated
			?
				<FlatButton
					label='Logout'
					onClick={ this.props.auth.logout }
				/>
			:
				<FlatButton
					label='login'
					onClick={ this.props.auth.login }
				/>
	}
}

export default withAuth(LoginButton)

