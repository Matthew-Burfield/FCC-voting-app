import React from 'react';
import ReactDOM from 'react-dom';
import {
  HashRouter as Router,
} from 'react-router-dom'
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
	<Router>
		<App />
	</Router>
);

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
