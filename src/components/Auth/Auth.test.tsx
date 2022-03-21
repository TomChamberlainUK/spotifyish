import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import Auth from './Auth';

describe('Auth', () => {
  
  test('Should render', () => {
    render(<Auth user={null} setUser={jest.fn()} />);
    const element = screen.getByText(/Welcome to Spotify/i);
    expect(element).toBeInTheDocument();
  });

  describe('When user is not logged in', () => {

    test('Should provide log in link to Spotify', () => {
      render(<Auth user={null} setUser={jest.fn()} />);
      const linkElement = screen.getByText(/Log In/);
      const linkUrl = linkElement.getAttribute('href');
      expect(linkUrl).toMatch(/^https:\/\/accounts\.spotify\.com\/authorize/);
    });

  });

  describe('When user is logged in', () => {

    test('Should provide log out button', () => {
      render(
        <Auth
          user={{
            name: '',
            imageUrl: '',
            accessToken: ''
          }}
          setUser={jest.fn()}
        />
      );
      const buttonElement = screen.getByText(/Log Out/);
      expect(buttonElement).toBeInTheDocument();
    });

    test('Should render user name', () => {
      render(
        <Auth
          user={{
            name: 'Jane Smith',
            imageUrl: '',
            accessToken: ''
          }}
          setUser={jest.fn()}
        />
      );
      const element = screen.getByText(/Jane Smith/);
      expect(element).toBeInTheDocument();
    });

    test('Should render users profile picture', () => {
      render(
        <Auth
          user={{
            name: '',
            imageUrl: 'http://testurl.com',
            accessToken: ''
          }}
          setUser={jest.fn()}
        />
      );
      const element = screen.getByRole('img');
      expect(element).toHaveAttribute('src', 'http://testurl.com');
    });

  });

});