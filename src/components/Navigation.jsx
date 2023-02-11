import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { RiHome7Fill } from 'react-icons/ri';
import { MdLeaderboard } from 'react-icons/md';
import '../styles/Navigation.css';

function Navigation({ authUser, onSignOut }) {
  const { id, name, avatar } = authUser;
  return (
    <nav>
      <h1>Euphoria Forum</h1>
      <ul>
        <li>
          <RiHome7Fill />
          <Link to="/">Home</Link>
        </li>
        <li>
          <MdLeaderboard />
          <Link to="/leaderboards">Leaderboards</Link>
        </li>
        <li>
          <img src={avatar} alt={id} title={name} />
          <div className="user-name">{name}</div>
        </li>
        <li><button id="signout-btn" type="button" onClick={onSignOut}>Sign out</button></li>
      </ul>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  onSignOut: PropTypes.func.isRequired,
};

export default Navigation;
