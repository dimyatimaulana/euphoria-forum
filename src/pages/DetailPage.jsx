/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import ThreadComment from '../components/ThreadComment';
import Comments from '../components/Comments';
import { asyncReceiveThreadDetail, asyncToggleLikeThreadDetail, asyncToggleDislikeThreadDetail } from '../states/detailThread/action';
import { asyncCreateComment } from '../states/comment/action';

function DetailPage() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);

  console.log(threadDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onLikeThread = () => {
    dispatch(asyncToggleLikeThreadDetail());
  };

  const onDisikeThread = () => {
    dispatch(asyncToggleDislikeThreadDetail());
  };

  const onCreateComment = (content) => {
    dispatch(asyncCreateComment({ threadId: id, content }));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section>
      <ThreadDetail {...threadDetail} authUser={authUser.id} like={onLikeThread} dislike={onDisikeThread} />
      <ThreadComment onCreateComment={onCreateComment} />
      {
        threadDetail.comments.map((comment) => (
          <Comments {...comment} authUser={authUser.id} threadId={id} />
          // <div className="item-comment">
          //   <div className="owner-date">
          //     <div className="owner">
          //       <img src={comment.owner.avatar} alt="comment-owner" />
          //       <p>{comment.owner.name}</p>
          //     </div>
          //     <div className="created">
          //       <p>
          //         {showFormattedDate(comment.createdAt)}
          //       </p>
          //     </div>
          //   </div>
          //   <p>{comment.content}</p>
          //   <div className="reactions">
          //     <button className="reaction-icon" type="button" onClick={onLikeClick} onKeyDown={onLikeThread}>
          //       { isThreadLiked ? <AiFillLike style={{ color: '#3b82f6' }} /> : <AiOutlineLike />}
          //       {comment.upVotesBy.length}
          //     </button>
          //     <button className="reaction-icon" type="button" onClick={onDislikeClick} onKeyDown={onDislikeThread}>
          //       { isThreadDisliked ? <AiFillDislike style={{ color: 'black' }} /> : <AiOutlineDislike />}
          //       {comment.downVotesBy.length}
          //     </button>
          //   </div>
          // </div>
        ))
      }
    </section>
  );
}

export default DetailPage;
