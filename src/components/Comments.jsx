import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike,
} from 'react-icons/ai';
import { asyncDownvoteComment, asyncUpvoteComment } from '../states/comment/action';

function Comments({
  id, content, createdAt, owner, authUser,
  upVotesBy, downVotesBy, threadId,
}) {
  const isThreadLiked = upVotesBy.includes(authUser);
  const isThreadDisliked = downVotesBy.includes(authUser);

  const onLikeClick = (event) => {
    event.stopPropagation();
    asyncUpvoteComment(threadId, id);
  };

  const onLikeComment = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      onLikeClick();
    }
  };

  const onDislikeClick = (event) => {
    event.stopPropagation();
    asyncDownvoteComment(threadId, id);
  };

  const onDislikeComment = (event) => {
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
    <div className="item-comment">
      <div className="owner-date">
        <div className="owner">
          <img src={owner.avatar} alt="comment-owner" />
          <p>{owner.name}</p>
        </div>
        <div className="created">
          <p>
            {showFormattedDate(createdAt)}
          </p>
        </div>
      </div>
      <p>{content}</p>
      <div className="reactions">
        <button className="reaction-icon" type="button" onClick={onLikeClick} onKeyDown={onLikeComment}>
          { isThreadLiked ? <AiFillLike style={{ color: '#3b82f6' }} /> : <AiOutlineLike />}
          {upVotesBy.length}
        </button>
        <button className="reaction-icon" type="button" onClick={onDislikeClick} onKeyDown={onDislikeComment}>
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

Comments.propTypes = {
  id: PropTypes.string.isRequired,
  threadId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default Comments;
