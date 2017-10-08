import Button from 'antd/lib/button'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import 'antd/lib/button/style/css'

const HeaderLink = (props) => (
	<Button>
		<Link to={ props.to }>
			{ props.label }
		</Link>
	</Button>
)

HeaderLink.propTypes = {
	label: PropTypes.string,
	to: PropTypes.string,
}

export default HeaderLink
