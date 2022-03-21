import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import Auth from './Auth';

describe('Auth', () => {
  
  test('Should render', () => {
    render(<Auth setUser={jest.fn()} />);
    const element = screen.getByText(/Welcome!/);
    expect(element).toBeInTheDocument();
  });

  test('Should provide log in link to Spotify', () => {
    render(<Auth setUser={jest.fn()} />);
    const linkElement = screen.getByText(/Log In/);
    const linkUrl = linkElement.getAttribute('href');
    expect(linkUrl).toMatch(/^https:\/\/accounts\.spotify\.com\/authorize/);
  });

});