import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import { IoMdArrowRoundBack } from 'react-icons/io';
import '../styles/ThreadDetail.css';

function ThreadDetail({
  id, title, body, category, createdAt, owner, authUser,
  upVotesBy, downVotesBy, like, dislike,
}) {
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

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
  return (
    <div className="detail-thread">
      <div className="header-detail-page">
        <Link to="/"><IoMdArrowRoundBack /></Link>
        <h2>Thread</h2>
      </div>
      <div className="owner-category">
        <div className="owner">
          <img src={owner.avatar} alt="owner-name" />
          <p>{owner.name}</p>
        </div>
        <div className="created created-detail">
          <p>
            {showFormattedDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="body-thread">
        <div className="categoryItemThread">{category}</div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      <div className="reactions">
        <button className="reaction-icon" type="button" onClick={onLikeClick} onKeyDown={onLikeThread}>
          { isThreadLiked ? <AiFillLike style={{ color: '#3b82f6' }} /> : <AiOutlineLike />}
          {upVotesBy.length}
        </button>
        <button className="reaction-icon" type="button" onClick={onDislikeClick} onKeyDown={onDislikeThread}>
          { isThreadDisliked ? <AiFillDislike style={{ color: 'black' }} /> : <AiOutlineDislike />}
          {downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  authUser: PropTypes.string.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ThreadDetail;
