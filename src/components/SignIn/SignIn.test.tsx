import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('SignIn', () => {
  
  test('Should render', () => {
    render(<SignIn />);
    const element = screen.getByText(/Welcome to Spotify/i);
    expect(element).toBeInTheDocument();
  });

  test('Should provide sign in link to Spotify', () => {
    render(<SignIn />);
    const linkElement = screen.getByText(/Sign In/);
    const linkUrl = linkElement.getAttribute('href');
    expect(linkUrl).toMatch(/^https:\/\/accounts\.spotify\.com\/authorize/);
  });


});