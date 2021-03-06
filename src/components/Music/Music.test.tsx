import React from 'react';
import { screen, render } from '@testing-library/react';
import Music from './Music';

describe('Music', () => {

  test('Should render', () => {
    render(
      <Music user={{
        name: '',
        imageUrl: '',
        accessToken: ''
      }}/>
    );
    const element = screen.getByText(/Music/);
    expect(element).toBeInTheDocument();
  });

});