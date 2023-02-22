import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import { FaComments } from 'react-icons/fa';
import Container from './styled/Container';
import '../styles/ItemThread.css';

function ItemThread({
  id, title, body, category, createdAt,
  totalComments, upVotesBy, downVotesBy, user, authUser, like, dislike,
}) {
  const navigate = useNavigate();
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

  const onThreadPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/threads/${id}`);
    }
  };

  const onLikeClick = (event) => {
    event.stopPropagation();
    if (!isThreadDisliked) {
      like(id);
    }
  };

  const onLikeThread = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onLikeClick();
    }
  };

  const onDislikeClick = (event) => {
    event.stopPropagation();
    if (!isThreadLiked) {
      dislike(id);
    }
  };

  const onDislikeThread = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onDislikeClick();
    }
  };

  const showFormattedDate = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString('id-ID', options);
  };

  if (user === undefined) {
    return (null);
  }

  return (
    <Container className="item-thread">
      <div role="button" tabIndex={0} onKeyDown={onThreadPress} onClick={onThreadClick}>
        <div className="categoryItemThread">{category}</div>
        <h2>{title}</h2>
      </div>
      <p>{body}</p>
      <div className="reactions">
        <button className="reaction-icon" type="button" onClick={onLikeClick} onKeyDown={onLikeThread}>
          { isThreadLiked ? <AiFillLike style={{ color: '#3b82f6' }} /> : <AiOutlineLike />}
          {upVotesBy.length}
        </button>
        <button className="reaction-icon" type="button" onClick={onDislikeClick} onKeyDown={onDislikeThread}>
          { isThreadDisliked ? <AiFillDislike style={{ color: 'black' }} /> : <AiOutlineDislike />}
          {downVotesBy.length}
        </button>
        <button className="reaction-icon" type="button">
          <FaComments />
          {totalComments}
        </button>
      </div>
      <div className="created">
        <p>
          {showFormattedDate(createdAt)}
        </p>
        <p>
          dibuat oleh
          {' '}
          {user.name}
        </p>
      </div>
    </Container>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape),
};

ItemThread.propTypes = {
  ...ItemThread,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export {
  threadItemShape,
};

export default ItemThread;
