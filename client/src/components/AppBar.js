import React from 'react';
import MaterialAppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const AppBar = () => (
	<MaterialAppBar
		title="FCC Voting App"
		iconElementRight={
			<FlatButton 
				label="Login"
				href='https://matthew-burfield.au.auth0.com/authorize?audience=matthew-burfield.com.au/voting-app&scope=openid%20profile%20email&response_type=id_token%20token&client_id=9a0Bi5RDIAHWs8j3hwGJm8EEPR17IIGE&redirect_uri=http://localhost:3000&nonce=123abcstate=123abc'
			/>
		}
	/>
);

export default AppBar;
