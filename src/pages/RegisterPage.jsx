import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';
import '../styles/LoginRegister.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section className="register-page">
      <div className="register-page-container">
        <h1>REGISTER</h1>
        <RegisterInput register={onRegister} />
        <p>
          Back to
          {' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
