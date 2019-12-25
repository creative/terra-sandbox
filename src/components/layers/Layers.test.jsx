import React from 'react';
import ReactDOM from 'react-dom';
import Layers from './Layers';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Layers canvas={{ root: {} }} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
