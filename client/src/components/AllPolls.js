import axios from 'axios';
import React, { Component } from 'react';
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
			.get('http://localhost:8000/surveys')
			.then(response => response.data)
			.then(surveys => this.setState({
				surveys,
				isLoading: false,
			}))
	}
	render() {
		return (
			<div>
				All Polls
				<div>
					{ this.state.surveys.map(survey => survey.title)}
				</div>
			</div>
		)
	}
}

export default AllPolls;
