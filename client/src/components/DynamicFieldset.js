import PropTypes from 'prop-types';
import React, { Component } from 'react'
import {
	Input,
	Icon,
	Form,
	Button,
	Row,
	Col,
} from 'antd'
import uuid from 'uuid'

const FormItem = Form.Item

const addFieldButton = {
	width: '100%',
}

const inputStyles = {
	width: '90%',
	marginRight: 8,
}

class DynamicFieldset extends Component {
	static propTypes = {
		disabled: PropTypes.bool,
		form: PropTypes.object.isRequired,
		formItemLayout: PropTypes.object.isRequired,
		initialValue: PropTypes.array,
	}

	static defaultProps = {
		disabled: false,
		initialValue: [],
	}

	remove = keyId => {
		const { form } = this.props

		const keys = form.getFieldValue('keys')
		if (keys.length === 1) {
			return
		}
		// notify the form to detect changes
		form.setFieldsValue({
			keys: keys.filter(key => key.id !== keyId)
		})
	}

	add = () => {
		const { form } = this.props

		const keys = form.getFieldValue('keys')
		const nextKeys = keys.concat({
			id: uuid(),
			title: '',
			votes: 0,
		})

		// notify the form to detect changes
		form.setFieldsValue({
			keys: nextKeys,
		})
	}

	render() {
		const { disabled, form, formItemLayout, initialValue } = this.props
		form.getFieldDecorator('keys', { initialValue })
		const keys = form.getFieldValue('keys')
		return (
			<div>
				{
					keys.map((k, index) => {
						const isNewlyAddedPoll = index > initialValue.length
						const inputDisabled = !isNewlyAddedPoll && disabled
						return (
							<FormItem
								key={ k.id }
								required={ true }
								label='Poll option'
								{ ...formItemLayout }
							>
								{
									form.getFieldDecorator(k.id, {
										validateTrigger: ['onChange', 'onBlur'],
										rules: [{
											required: true,
											whitespace: true,
											message: 'This poll option must have a value!'
										}],
										initialValue: k.title,
									})(
										<Input
											style={ inputStyles }
										/>
									)
								}
								{
									keys.length > 1 &&
										<Icon
											className='dynamic-delete-button'
											type='minus-circle-o'
											disabled={ keys.length === 1 }
											onClick={ () => this.remove(k.id) }
										/>
								}
							</FormItem>
					)})
				}
				<Row>
					<Col span={ 24 } offset={ 4 }>
						<FormItem { ...formItemLayout }>
							<Button
								type='primary'
								onClick={ this.add }
								style={ addFieldButton }
							>
								<Icon type='plus' /> Add poll option
							</Button>
						</FormItem>
					</Col>
				</Row>
			</div>
		)
	}
}

export default DynamicFieldset
