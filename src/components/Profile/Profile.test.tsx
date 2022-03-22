import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from './Profile';

describe('Profile', () => {

  test('Should render sign out button', () => {
    render(
      <Profile
        user={{
          name: '',
          imageUrl: '',
          accessToken: ''
        }}
        signOut={jest.fn()}
      />
    );
    const buttonElement = screen.getByText(/Sign Out/);
    expect(buttonElement).toBeInTheDocument();
  });

  test('Should render user name', () => {
    render(
      <Profile
        user={{
          name: 'Jane Smith',
          imageUrl: '',
          accessToken: ''
        }}
        signOut={jest.fn()}
      />
    );
    const element = screen.getByText(/Jane Smith/);
    expect(element).toBeInTheDocument();
  });

  test('Should render users profile picture', () => {
    render(
      <Profile
        user={{
          name: '',
          imageUrl: 'http://testurl.com',
          accessToken: ''
        }}
        signOut={jest.fn()}
      />
    );
    const element = screen.getByRole('img');
    expect(element).toHaveAttribute('src', 'http://testurl.com');
  });

});