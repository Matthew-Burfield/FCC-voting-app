import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	Button,
	Col,
	Form,
	Icon,
	Input,
	Row,
	Spin,
	Switch,
} from 'antd'
import { withRouter } from 'react-router'

import { createNewPoll } from '../redux/actions/surveyActions'
import DynamicFieldset from '../components/DynamicFieldset'
import ContentHeader from '../components/ContentHeader'

const FormItem = Form.Item;

const formStyles = {
	maxWidth: 1000,
	margin: '0 auto',
}

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

class NewPoll extends Component {
	static propTypes = {
		createNewPoll: PropTypes.func,
		isLoading: PropTypes.bool,
	}

	constructor(props) {
		super(props)
		this.state = {
			hasSubmitted: false,
		}
	}

	componentWillReceiveProps = (nextProps) => {
		const { form, history, isLoading } = nextProps
		if (this.state.hasSubmitted && !isLoading) {
			form.resetFields()
			history.push('/')
		}
	}

	handleTitleChange = (e) => {
		console.log(e)
	}

	handleSubmit = (e) => {
		const { createNewPoll, form } = this.props
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        createNewPoll({
					title: values.title,
					publish: values.publish,
					pollOptions: values.keys.map(key => values[`option-${key}`])
				})
				this.setState({
					hasSubmitted: true,
				})
      }
    });
  }

	render() {
		const { getFieldDecorator } = this.props.form;
		return (
			<Spin
				key='pageForm'
				spinning={ this.state.hasSubmitted && this.props.isLoading }
			>
				<ContentHeader>New Poll</ContentHeader>
				<Form
					onSubmit={ this.handleSubmit }
					style={ formStyles }
				>
					<FormItem label='Title' { ...formItemLayout }>
						{getFieldDecorator('title', {
						rules: [{ required: true, message: 'You must enter a title!' }],
						})(
							<Input
								prefix={<Icon type='title' style={{ fontSize: 13 }} />}
								placeholder='Type here...'
							/>
						)}
					</FormItem>
					<DynamicFieldset form={ this.props.form } formItemLayout={ formItemLayout } />
					<FormItem
						label='Publish'
						{ ...formItemLayout }
					>
						{getFieldDecorator('publish')(
							<Switch type='publish'/>
						)}
					</FormItem>
					<Row>
						<Col span={ 24 } offset={ 4 }>
							<FormItem { ...formItemLayout }>
								<Button type="primary" htmlType="submit">Submit</Button>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</Spin>
		)
	}
}

NewPoll.propTypes = {
	isLoading: PropTypes.bool,
	history: PropTypes.object,
	form: PropTypes.shape({
		getFieldsValue: PropTypes.func,
		getFieldValue: PropTypes.func,
		setFieldsValue: PropTypes.func,
		setFields: PropTypes.func,
		validateFields: PropTypes.func,
		validateFieldsAndScroll: PropTypes.func,
		getFieldError: PropTypes.func,
		getFieldsError: PropTypes.func,
		isFieldValidating: PropTypes.func,
		isFieldTouched: PropTypes.func,
		isFieldsTouched: PropTypes.func,
		resetFields: PropTypes.func,
		getFieldDecorator: PropTypes.func,
	}),
}

const NewPollFormWrapper = Form.create()(NewPoll);

const mapStateToProps = (state) => ({
	isLoading: state.surveys.isLoading,
})

const mapDispatchToProps = (dispatch) => ({
  createNewPoll: (pollData) => dispatch(createNewPoll(pollData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewPollFormWrapper));
