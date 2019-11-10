import React from 'react';
import { render } from '@testing-library/react';
import Placeholder from './Placeholder';

describe('Placeholder', () => {
  it('renders with the expected placeholder text', () => {
    const { getByText } = render(<Placeholder id="mock-id" />);

    expect(getByText('Drop Zone')).toBeInTheDocument();
  });
});
