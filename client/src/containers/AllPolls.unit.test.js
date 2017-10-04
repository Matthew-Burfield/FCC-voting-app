import React from 'react'
import ReactDOM from 'react-dom'

import AllPolls from './AllPolls'

describe('(Component) AllPolls', () => {

  it('renders AllPolls without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AllPolls />, div);
  });
  
})