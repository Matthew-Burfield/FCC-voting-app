import React, { Component } from 'react';

class MyPolls extends Component {
	render() {
		return (
			<div>My Polls {this.props.match.params.surveyId}</div>
		)
	}
}

export default MyPolls;
