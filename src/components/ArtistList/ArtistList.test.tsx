import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        onClick={jest.fn()}
      />
    );
    const element = screen.getByText(/Rick Astley/);
    expect(element).toBeInTheDocument();
  });

  test('Should handle onClick events', () => {
    const mockCallback = jest.fn();
    render(
      <ArtistListItem
        name="Rick Astley"
        onClick={mockCallback}
      />
    );
    const element = screen.getByText(/Rick Astley/);
    userEvent.click(element);
    expect(mockCallback).toBeCalled();
  });

});