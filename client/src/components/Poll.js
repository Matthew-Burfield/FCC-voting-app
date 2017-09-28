import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react';

class Poll extends Component {
	static propTypes = {
		survey: PropTypes.object,
	}
	static defaultProps = {
		survey: {
			title: '',
		}
	}
	render() {
		return (
			<h1>{ this.props.survey.title }</h1>
		)
	}
}

const mapStateToProps = (state, ownProps) => ({
	survey: state.surveys.find(survey => survey._id === ownProps.match.params.surveyId)
})

export default connect(mapStateToProps)(Poll);
