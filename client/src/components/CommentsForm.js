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
} from 'antd'

import { createNewComment } from '../redux/actions/surveyActions'

const FormItem = Form.Item
const { TextArea } = Input

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

class CommentsForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			hasSubmitted: false
		}
	}

	handleSubmit = (e) => {
		const { createNewComment, form, pollId } = this.props
		e.preventDefault();
		form.validateFields((err, values) => {
			if (!err) {
				createNewComment({
					surveyId: pollId,
					comment: values.comment,
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
			<Form
				onSubmit={ this.handleSubmit }
				style={ formStyles }
			>
				{getFieldDecorator('comment')(
					<TextArea
						rows={ 4 }
						prefix={<Icon type='comment' style={{ fontSize: 13 }} />}
						placeholder='Type here...'
					/>
				)}
				<Row>
					<Col span={ 24 } offset={ 4 }>
						<FormItem { ...formItemLayout }>
							<Button type="primary" htmlType="submit">Submit</Button>
						</FormItem>
					</Col>
				</Row>
			</Form>
		)
	}
}

CommentsForm.propTypes = {
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

const CommentsFormWrapper = Form.create()(CommentsForm);

const mapDispatchToProps = (dispatch) => ({
	createNewComment: (commentData) => dispatch(createNewComment(commentData)),
})

export default connect(null, mapDispatchToProps)(CommentsFormWrapper)
