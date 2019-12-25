import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './Tree';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Tree canvas={{ root: {} }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
