import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Container from '../components/styled/Container';
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

  if (threadDetail.comments === undefined) {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }

  return (
    <Container maxWidth="90%" padding="0">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser.id}
        like={onLikeThread}
        dislike={onDisikeThread}
      />
      <ThreadComment onCreateComment={onCreateComment} />
      {
        threadDetail.comments.map((comment) => (
          <Comments key={comment.id} {...comment} authUser={authUser.id} threadId={id} />
        ))
      }
    </Container>
  );
}

export default DetailPage;
