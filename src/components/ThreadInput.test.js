/* eslint-disable no-undef */
/*
test scenario ThreadInput component

1. should handle category input correctly
2. should handle title input correctly
3. should handle body input correctly
4. should call createThread function when btn is clicked

*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadInput from './ThreadInput';

import '@testing-library/jest-dom';

describe('ThreadInput component', () => {
  it('should handle category input correctly', async () => {
    // arrange
    render(<ThreadInput createThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Type Category');

    // action
    await userEvent.type(categoryInput, 'halo');

    // assert
    expect(categoryInput.value).toEqual('halo');
  });

  xit('should handle title input correctly', async () => {
    // arrange
    render(<ThreadInput createThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Type Title');

    // action
    await userEvent.type(titleInput, 'alan');

    // assert
    expect(titleInput.value).toEqual('alan');
  });

  xit('should handle body input correctly', async () => {
    // arrange
    render(<ThreadInput createThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText('Type Something');

    // action
    await userEvent.type(bodyInput, 'alan');

    // assert
    expect(bodyInput.value).toEqual('alan');
  });
});
