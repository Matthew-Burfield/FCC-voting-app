import React, { Component } from 'react'
import {
	Input,
	Icon,
	Form,
	Button,
	Row,
	Col,
} from 'antd'

const FormItem = Form.Item

const addFieldButton = {
	width: '100%',
}

const inputStyles = {
	width: '90%',
	marginRight: 8,
}

class DynamicFieldset extends Component {
	constructor(props) {
		super(props)
		this.state = {
			numFields: 0,
		}
	}

	remove = keyToRemove => {
		const { form } = this.props

		this.setState(prevState => ({
			numFields: prevState.numFields - 1
		}), () => {
			const keys = form.getFieldValue('keys')
			if (keys.length === 1) {
				return
			}
			// notify the form to detect changes
			form.setFieldsValue({
				keys: keys.filter(key => key !== keyToRemove)
			})
		})
	}

	add = keyToAdd => {
		const { form } = this.props

		this.setState(prevState => ({
			numFields: prevState.numFields + 1
		}), () => {
			const keys = form.getFieldValue('keys')
			const nextKeys = keys.concat(this.state.numFields)
	
			// notify the form to detect changes
			form.setFieldsValue({
				keys: nextKeys,
			})
		})
	}

	render() {
		const { form, formItemLayout, initialValue } = this.props
		const init = ['one','two','three']
		form.getFieldDecorator('keys', { initialValue: init });
		const keys = form.getFieldValue('keys')
		return (
			<div>
				{
					keys.map((k, index) => (
						<FormItem
							key={ k }
							required={ false }
							label='Poll option'
							{ ...formItemLayout }
						>
							{
								form.getFieldDecorator(`option-${k}`, {
									validateTrigger: ['onChange', 'onBlur'],
									rules: [{
										required: true,
										whitespace: true,
										message: 'This poll option must have a value!'
									}]
								})(
									<Input style={ inputStyles } />
								)
							}
							{
								keys.length > 1 &&
									<Icon
										className='dynamic-delete-button'
										type='minus-circle-o'
										disabled={ keys.length === 1 }
										onClick={ () => this.remove(k) }
									/>
							}
						</FormItem>
					))
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
