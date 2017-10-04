import axios from 'axios'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import ContentHeader from '../components/ContentHeader'
import DisplayVotes from '../components/DisplayVotes'
import PieChart from '../components/PieChart'
import { saveSurveys } from '../redux/actions/surveyActions'
import Spin from 'antd/lib/spin'
import {
	API_DOMAIN
} from '../utilities/constants'

class Poll extends Component {
	static propTypes = {
		match: PropTypes.object,
		saveSurveys: PropTypes.func,
		surveyList: PropTypes.array,
	};

	constructor(props) {
		super(props)
		this.state = {
			survey: null,
			isLoading: false,
		}
	}

	componentDidMount() {
		const { match, saveSurveys, surveyList } = this.props
		if (surveyList && surveyList.length > 0) {
			this.setState({
				survey: surveyList.find(survey => survey._id === match.params.surveyId),
			})
		}
		if ((!surveyList || surveyList.length === 0) && (match.params.surveyId && match.params.surveyId.length > 0)) {
			this.setState({ isLoading: true })
			axios
			.get(`${API_DOMAIN}/survey?id=${match.params.surveyId}`)
			.then(response => response.data)
			.then(survey => {
				saveSurveys(survey)
				this.setState({ isLoading: false })
			})
		}
	}
	componentWillReceiveProps(nextProps) {
		const {
			match,
			surveyList,
		} = nextProps
		if (!this.state.survey && surveyList.length > 0) {
			this.setState({
				survey: surveyList.find(survey => survey._id === match.params.surveyId),
			})
		}
	}
	render() {
		const { survey	} = this.state
		if (!survey) {
			return <h1>Something went wrong and we can't find this survey. Go back and try again</h1>
		}
		return (
			<div>
				<ContentHeader>{ survey.title }</ContentHeader>
				{ this.state.isLoading
					?
						<Spin size="large" />
					:
						<div>
							<DisplayVotes pollOptions={ survey.pollOptions } />
							<PieChart data={ survey.pollOptions } width={ 400 } height={ 400 } />				
							<div>
								<h2>Comments</h2>
								<div>
									{
										survey.comments.map(comment => (
											<div key={ comment.datetime }>
												<p>{ comment.value }</p>
												<p>{ comment.datetime }</p>
											</div>
										))
									}
								</div>
									{ !this.props.loggedIn &&
										<div>
											<div>
												Please log in to leave a comment
											</div>
											<button disabled>Add comment</button>
										</div>
									}
							</div>
						</div>
				}
			</div>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
	saveSurveys: (surveyList) => dispatch(saveSurveys(surveyList)),
})

const mapStateToProps = (state) => ({
	surveyList: state.surveys,
})

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
