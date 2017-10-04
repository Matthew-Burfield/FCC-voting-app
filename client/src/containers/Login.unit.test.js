import React from 'react'
import ReactDOM from 'react-dom'

import Login from './Login'

describe('(Component) Login', () => {

  it('renders Login without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Login />, div);
  });
  
})