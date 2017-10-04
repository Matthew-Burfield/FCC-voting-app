import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
} from 'react-router-dom'
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
	<Router>
		<MuiThemeProvider>
			<App />
		</MuiThemeProvider>
	</Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
