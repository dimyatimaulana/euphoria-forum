/* eslint-disable no-undef */
/*
test scenario RegisterInput component

1. should handle name input correctly
2. should handle email input correctly
3. should handle password input correctly
4. should call register function when register btn is clicked

*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

import '@testing-library/jest-dom';

describe('RegisterInput component', () => {
  it('should handle name input correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // action
    await userEvent.type(nameInput, 'alan');

    // assert
    expect(nameInput).toHaveValue('alan');
  });

  it('should handle email input correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Username');

    // action
    await userEvent.type(emailInput, 'alan@dicoding.com');

    // assert
    expect(emailInput).toHaveValue('alan@dicoding.com');
  });

  it('should handle password input correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'alanalan123');

    // assert
    expect(passwordInput).toHaveValue('alanalan123');
  });

  it('should call register function when login btn is clicked', async () => {
    // arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'alan');
    const emailInput = await screen.getByPlaceholderText('Username');
    await userEvent.type(emailInput, 'alan@dicoding.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'alanalan123');
    const btnRegister = await screen.getByRole('button', { name: 'Register' });

    // action
    await userEvent.click(btnRegister);

    // assert
    expect(mockRegister).toBeCalledWith({
      name: 'alan',
      email: 'alan@dicoding.com',
      password: 'alanalan123',
    });
  });
});
