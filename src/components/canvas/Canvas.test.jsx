import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas';

jest.mock('../../generators/workspace/workspace-generator');

describe('Canvas', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Canvas workspace={{}} imports={{}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
