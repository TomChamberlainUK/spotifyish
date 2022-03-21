import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('Should render', () => {
    render(<App />);
    const element = screen.getByText(/Hello World/);
    expect(element).toBeInTheDocument();
  });

});