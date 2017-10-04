import PropTypes from 'prop-types'
import React from 'react'

const ContentHeader = (props) => (
	<div
		style={{
			fontSize: 50,
			textAlign: 'center',
			padding: 20,
		}}
	>
		{ props.children }
	</div>
)

ContentHeader.propTypes = {
	children: PropTypes.oneOfType([PropTypes.array, PropTypes.string, PropTypes.number]),
}

export default ContentHeader;
