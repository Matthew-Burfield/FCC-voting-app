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

	constructor(props) {
		super(props)
		this.state = {
			numFields: 0,
			initialKeysLength: props.initialValue.length - 1
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.initialValue.length !== this.props.initialValue.length) {
			this.setState({
				initialKeysLength: nextProps.initialValue.length - 1,
			})
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
		const { disabled, form, formItemLayout } = this.props
		const { initialKeysLength } = this.state
		const initialValue = this.props.initialValue.reduce((arr, item) => { arr.push(item.title); return arr; }, [])
		form.getFieldDecorator('keys', { initialValue });
		const keys = form.getFieldValue('keys')
		return (
			<div>
				{
					keys.map((k, index) => {
						const isNewlyAddedPoll = index > initialKeysLength
						const key = `${isNewlyAddedPoll ? 'new-' : 'option-'}${k}`
						const inputDisabled = !isNewlyAddedPoll && disabled
						return (
							<FormItem
								key={ k }
								required={ true }
								label='Poll option'
								{ ...formItemLayout }
							>
								{
									form.getFieldDecorator('option' + k, {
										validateTrigger: ['onChange', 'onBlur'],
										rules: [{
											required: true,
											whitespace: true,
											message: 'This poll option must have a value!'
										}],
										initialValue: initialValue[index],
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
											onClick={ () => this.remove(k) }
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
