import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {

  test('Should render', () => {
    render(<App />);
    const element = screen.getByText(/Hello World/);
    expect(element).toBeInTheDocument();
  });

  test('Should provide log in link to Spotify', () => {
    render(<App />);
    const linkElement = screen.getByText(/Log In/);
    const linkUrl = linkElement.getAttribute('href');
    expect(linkUrl).toMatch(/^https:\/\/accounts\.spotify\.com\/authorize/);
  })

});