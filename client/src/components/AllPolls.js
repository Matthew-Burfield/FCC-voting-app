import axios from 'axios'
import { connect } from 'react-redux'
import jwtDecode from 'jwt-decode'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import { saveSurveys } from '../redux/actionCreators'
import SurveyList from './SurveyList'
import {
	API_DOMAIN
} from '../utilities/constants'

class AllPolls extends Component {
	static propTypes = {
		saveSurveys: PropTypes.func,
		surveys: PropTypes.array,
	}
	static defaultProps = {
		surveys: [],
	}
	constructor(props) {
		super(props)
		this.state = {
			surveys: [],
			isLoading: true,
		}	
	}
	componentDidMount() {
		// check if the window has any parameters (i.e. if they have just logged in)
		if (window && window.location && window.location.hash && window.location.hash.length > 1) {
			const loginTokens = window.location.hash.slice(1).split('&').reduce((obj, val) => {
				const item = val.split('=')
				return {
					...obj,
					[item[0]]: item[1],
				}
			}, {})

			// validate the tokenId and get the user data
			const decodedToken = jwtDecode(loginTokens.id_token)
			console.log(decodedToken)
		}
				
		axios
			.get(`${API_DOMAIN}/surveys`)
			.then(response => response.data)
			.then(surveys => {
				this.props.saveSurveys(surveys)
				this.setState({
					isLoading: false,
				})
			})
	}
	render() {
		return (
			<div>
				All Polls ({ this.props.surveys.length })
				<SurveyList surveys={ this.props.surveys } />
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
  saveSurveys (surveys) {
    return dispatch(saveSurveys(surveys))
  },
})

const mapStateToProps = (state) => ({
	surveys: state.surveys
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPolls);
