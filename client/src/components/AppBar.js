import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const AppBar = () => (
	<MaterialAppBar
		title="FCC Voting App"
		iconElementRight={<FlatButton label="Login" />}
	/>
);

export default AppBar;