import React from 'react';
import { screen, render } from '@testing-library/react';
import ArtistList, { ArtistListItem } from './ArtistList';

describe('ArtistList', () => {
  
  test('Should render children', () => {
    render(
      <ArtistList>
        <p>Hello World!</p>
      </ArtistList>
    );
    const element = screen.getByText(/Hello World!/);
    expect(element).toBeInTheDocument();
  });

});

describe('ArtistListItem', () => {

  test('Should render artist name', () => {
    render(
      <ArtistListItem
        name="Rick Astley"
      />
    );
    const element = screen.getByText(/Rick Astley/);
    expect(element).toBeInTheDocument();
  });

});