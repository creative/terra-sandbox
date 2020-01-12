import React from 'react';
import ReactDOM from 'react-dom';
import Canvas from './Canvas';

jest.mock('../../generators/canvas/canvas-generator');

describe('Canvas', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Canvas><div /></Canvas>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
