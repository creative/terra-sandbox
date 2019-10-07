import React from 'react';
import ReactDOM from 'react-dom';
import CatalogItem from './CatalogItem';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatalogItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});
