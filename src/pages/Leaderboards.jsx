/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Container from '../components/styled/Container';
import ItemLeaderboards from '../components/ItemLeaderboards';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function Leaderboards() {
  const { leaderboards } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <Container>
      <div className="header-detail-page">
        <Link to="/"><IoMdArrowRoundBack /></Link>
        <h2>Leaderboards</h2>
      </div>
      {
        leaderboards.map((leaderboard) => (
          <ItemLeaderboards key={leaderboard.user.id} {...leaderboard} index={leaderboards.indexOf(leaderboard)} />
        ))
      }
    </Container>
  );
}

export default Leaderboards;
