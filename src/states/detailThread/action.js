import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_THREAD_DETAIL: 'TOGGLE_LIKE_THREAD_DETAIL',
  TOGGLE_DISLIKE_THREAD_DETAIL: 'TOGGLE_DISLIKE_THREAD_DETAIL',
  CREATE_COMMENT: 'CREATE_COMMENT',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_DISLIKE_COMMENT: 'TOGGLE_DISLIKE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDislikeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleLikeThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeThreadDetailActionCreator(authUser.id));
    try {
      await api.upvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDislikeThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleDislikeThreadDetailActionCreator(authUser.id));

    try {
      await api.downvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// COMMENT

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
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleLikeThreadDetailActionCreator,
  toggleDislikeThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleLikeThreadDetail,
  asyncToggleDislikeThreadDetail,
  createCommentActionCreator,
  toggleDownvoteActionCreator,
  toggleUpvoteActionCreator,
  asyncUpvoteComment,
  asyncDownvoteComment,
  asyncCreateComment,
};
