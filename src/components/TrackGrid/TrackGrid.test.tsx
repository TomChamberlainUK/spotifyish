import React from 'react';
import { screen, render } from '@testing-library/react';
import TrackGrid, { TrackGridItem } from './TrackGrid';

describe('TrackGrid', () => {

  test('Should render children', () => {
    render(
      <TrackGrid>
        <p>Hello World!</p>
      </TrackGrid>
    );
    const element = screen.getByText(/Hello World!/);
    expect(element).toBeInTheDocument();
  });

});

describe('TrackGridItem', () => {

  test('Should render track and artist name', () => {
    render(
      <TrackGridItem
        name="Never Gonna Give You Up"
        artist="Rick Astley"
        album=""
        imageUrl=""
      />
    );
    const nameElement = screen.getByText(/Never Gonna Give You Up/);
    const artistElement = screen.getByText(/Rick Astley/);
    expect(nameElement).toBeInTheDocument();
    expect(artistElement).toBeInTheDocument();
  });

  test('Should display an image with correct url and alt tags', () => {
    render(
      <TrackGridItem
        name="Never Gonna Give You Up"
        artist="Rick Astley"
        album="Whenever You Need Somebody"
        imageUrl="https://fakeurl.com/testimage"
      />
    );
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'https://fakeurl.com/testimage');
    expect(imageElement).toHaveAttribute('alt', 'Album artwork for Whenever You Need Somebody by Rick Astley');
  });
});