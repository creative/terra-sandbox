import React from 'react';
import ReactDOM from 'react-dom';
import Layers from './Layers';

it('renders without crashing', () => {
  const div = document.createElement('div');

  const mockCanvas = {
    id: 'mock-uuid',
    type: 'element',
    value: {
      name: 'terra-sandbox:Canvas',
      props: {
        children: {
          id: 'mock-uuid',
          parent: 'mock-uuid',
          type: 'node',
          value: {
            'mock-uuid': {
              id: 'mock-uuid',
              parent: 'mock-uuid',
              type: 'element',
              value: {
                name: 'terra-sandbox:Placeholder',
                props: {},
              },
            },
          },
        },
      },
    },
  };

  ReactDOM.render(<Layers canvas={mockCanvas} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
