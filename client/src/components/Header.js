import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'

import { Header } from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import 'antd/lib/layout/style/css'

import HeaderLink from './HeaderLink'
import HeaderLogin from './HeaderLogin'
import UserProfile from './UserProfile'

const menuStyles = {
	lineHeight: '64px',
	float: 'right',
}

const HeaderContainer = (props) => (
	<Header>
		<div style={{
			width: 'auto',
			height: 31,
			float: 'left',
			lineHeight: '31px',
			padding: 15,
			fontSize: 31,
			color: '#fff',
		}}>FCC Voting App</div>
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={['2']}
			style={menuStyles}
		>
		{ props.isAuthenticated &&
			<Menu.Item key="profile">
				<UserProfile {...props}  />
			</Menu.Item>
		}
		{ props.isAuthenticated &&
			<Menu.Item key="newpoll">
				<HeaderLink to='newpoll' label='Create new poll' />
			</Menu.Item>
		}
		<Menu.Item key="logout">
			<HeaderLogin {...props} />
		</Menu.Item>
		</Menu>
	</Header>
)

HeaderContainer.propTypes = {
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.user.authenticated,
})

export default connect(mapStateToProps, null)(HeaderContainer)
