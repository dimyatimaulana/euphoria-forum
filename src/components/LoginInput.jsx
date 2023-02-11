import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="form-login">
      <input placeholder="email" className="inputAuth" name="text" type="text" value={email} onChange={onEmailChange} />
      <input placeholder="password" className="inputAuth" name="text" type="password" value={password} onChange={onPasswordChange} />
      <button type="button" onClick={() => login({ email, password })}>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
