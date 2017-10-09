import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import Form from 'antd/lib/form'
import Switch from 'antd/lib/switch'

import ContentHeader from '../components/ContentHeader'

const FormItem = Form.Item;

class NewPoll extends Component {
	constructor(props) {
		super(props)
		this.state = {
			surveys: [],
			isLoading: true,
		}	
	}
	render() {
		const { getFieldDecorator } = this.props.form;
		return ([
			<ContentHeader key='pageTitle'>New Poll</ContentHeader>,
			<Form key='pageForm'>
				<FormItem>
					{getFieldDecorator('title', {
					rules: [{ required: true, message: 'You must enter a title!' }],
					})(
						<Input prefix={<Icon type='title' style={{ fontSize: 13 }} />} placeholder='Title' />
					)}
				</FormItem>
        <FormItem>
          {getFieldDecorator('publish')(
            <Switch type="publish" placeholder="Publish" />
          )}
        </FormItem>
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
