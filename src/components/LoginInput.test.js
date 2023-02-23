/* eslint-disable no-undef */
/*
test scenario loginInput component

1. should handle email input correctly
2. should handle password input correctly
3. should call login function when login btn is clicked

*/

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

import '@testing-library/jest-dom';

describe('Login Input component', () => {
  it('should handle email input correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('email');

    // action
    await userEvent.type(emailInput, 'this is an email');

    // assert
    expect(emailInput).toHaveValue('this is an email');
  });

  it('should handle password input correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('password');

    // action
    await userEvent.type(passwordInput, 'this is a password');

    // assert
    expect(passwordInput).toHaveValue('this is a password');
  });

  it('should call login function when login btn is clicked', async () => {
    // arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('email');
    await userEvent.type(emailInput, 'this is an email');
    const passwordInput = await screen.getByPlaceholderText('password');
    await userEvent.type(passwordInput, 'this is a password');
    const btnLogin = await screen.getByRole('button', { name: 'Login' });

    // action
    await userEvent.click(btnLogin);

    // assert
    expect(mockLogin).toBeCalledWith({
      email: 'this is an email',
      password: 'this is a password',
    });
  });
});
