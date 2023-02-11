import { ActionType } from './action';

function commentReducer(comments = [], action = {}) {
  switch (action.type) {
    case ActionType.CREATE_COMMENT:
      return action.payload.comment;
    case ActionType.TOGGLE_LIKE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.threadId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.commentId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.commentId)
              : comment.upVotesBy.concat([action.payload.commentId]),
          };
        } return comment;
      });
    case ActionType.TOGGLE_DISLIKE_COMMENT:
      return comments.map((comment) => {
        if (comment.id === action.payload.threadId) {
          return {
            ...comment,
            downVotesBy: comment.downVotesBy.includes(action.payload.commentId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.commentId)
              : comment.downVotesBy.concat([action.payload.commentId]),
          };
        } return comment;
      });
    default:
      return comments;
  }
}

export default commentReducer;
