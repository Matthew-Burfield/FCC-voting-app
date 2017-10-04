import React from 'react'
import { Header } from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import 'antd/lib/menu/style/css'
import 'antd/lib/layout/style/css'

import LoginButton from './LoginButton'
import UserProfile from './UserProfile'

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
			style={{
				lineHeight: '64px',
				float: 'right',
			}}
		>
			<Menu.Item key="profile">
				<UserProfile {...props}  />
			</Menu.Item>
			<Menu.Item key="logout">
				<LoginButton {...props} />
			</Menu.Item>
		</Menu>
	</Header>
);

export default HeaderContainer;
