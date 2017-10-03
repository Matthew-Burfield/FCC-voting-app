import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import LoginButton from './LoginButton';

const AppBar = () => (
	<MaterialAppBar
		title="FCC Voting App"
		iconElementRight={
			<LoginButton />
		}
	/>
);

export default AppBar;
