import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Leaderboards.css';

function ItemLeaderboards({ user, score, index }) {
  const rank = (index + 1);
  return (
    <div className="leaderboard">
      <div className="owner">
        <p>{rank}</p>
        <img src={user.avatar} alt="user-avatar" />
        <p>{user.name}</p>
      </div>
      <p>{score}</p>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ItemLeaderboards.propTypes = {
  user: PropTypes.shape(userShape).isRequired,
  score: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default ItemLeaderboards;
