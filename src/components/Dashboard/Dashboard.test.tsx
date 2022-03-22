import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

describe('Music', () => {

  test('Should render', () => {
    render(
      <Dashboard
        user={{
          name: '',
          imageUrl: '',
          accessToken: ''
        }}
        signOut={jest.fn()}
      />
    );
    const element = screen.getByText(/Dashboard/);
    expect(element).toBeInTheDocument();
  });

});