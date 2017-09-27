import axios from 'axios';
import React, { Component } from 'react';

import SurveyList from './SurveyList'
import {
	API_DOMAIN
} from '../utilities/constants';

class AllPolls extends Component {
	constructor(props) {
		super(props);
		this.state = {
			surveys: [],
			isLoading: true,
		};
	}
	componentDidMount() {
		axios
			.get(`${API_DOMAIN}/surveys`)
			.then(response => response.data)
			.then(surveys => this.setState({
				surveys,
				isLoading: false,
			}))
	}
	render() {
		return (
			<div>
				All Polls ({ this.state.surveys.length })
				<SurveyList surveys={ this.state.surveys } />
			</div>
		)
	}
}

export default AllPolls;
