import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  CREATE_COMMENT: 'CREATE_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_DISLIKE_COMMENT: 'TOGGLE_DISLIKE_COMMENT',
};

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpvoteActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      threadId,
      commentId,
    },
  };
}

function toggleDownvoteActionCreator({ threadId, commentId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_COMMENT,
    payload: {
      threadId,
      commentId,
    },
  };
}

function asyncCreateComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpvoteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleUpvoteActionCreator({ threadId, commentId }));
    try {
      await api.upvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteActionCreator({ threadId, commentId }));
    }
    dispatch(hideLoading());
  };
}

function asyncDownvoteComment(threadId, commentId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(toggleUpvoteActionCreator({ threadId, commentId }));
    try {
      await api.downvoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteActionCreator({ threadId, commentId }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  createCommentActionCreator,
  toggleDownvoteActionCreator,
  toggleUpvoteActionCreator,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncCreateComment,
};
