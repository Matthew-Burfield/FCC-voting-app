import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
	Button,
	Input,
	Icon,
	Form,
	Switch,
	Row,
	Col,
} from 'antd'

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
	constructor(props) {
		super(props)
		this.state = {
			surveys: [],
			isLoading: true,
		}	
	}

	handleTitleChange = (e) => {
		console.log(e)
	}

	handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

	render() {
		const { getFieldDecorator } = this.props.form;
		return ([
			<ContentHeader key='pageTitle'>New Poll</ContentHeader>,
			<Form
				key='pageForm'
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
		]
		)
	}
}

NewPoll.propTypes = {
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

const mapDispatchToProps = (dispatch) => ({
  // saveSurveys (surveys) {
  //   return dispatch(saveSurveys(surveys))
  // },
})

export default connect(null, mapDispatchToProps)(NewPollFormWrapper);
