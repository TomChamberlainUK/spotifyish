import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('App', () => {

  test('Should render', () => {
    render(<Layout />);
    const element = screen.getByText(/Spotify/);
    expect(element).toBeInTheDocument();
  });

  test('When provided children should render them', () => {
    render(
      <Layout>
        <p>Hello World!</p>
      </Layout>
    );
    const element = screen.getByText(/Hello World!/);
    expect(element).toBeInTheDocument();
  });

});