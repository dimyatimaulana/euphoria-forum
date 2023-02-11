import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';
import '../styles/LoginRegister.css';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  return (
    <section className="login-page">
      <div className="login-page-container">
        <h1>LOGIN</h1>
        <LoginInput login={onLogin} />
        <p>
          Belum punya akun?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
