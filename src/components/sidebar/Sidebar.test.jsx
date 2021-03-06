import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './Sidebar';

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

  ReactDOM.render(<Sidebar canvas={mockCanvas} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
