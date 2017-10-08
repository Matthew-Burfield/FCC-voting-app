import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

import './Header.css'

const HeaderLink = (props) => (
	<button className='header-button'>
		<Link to={ props.to } className='header-a'>
			{ props.label }
		</Link>
	</button>
)

HeaderLink.propTypes = {
	label: PropTypes.string,
	to: PropTypes.string,
}

export default HeaderLink
