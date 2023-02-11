import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadComment({ onCreateComment }) {
  const [content, setText] = useState('');

  function createCommentHandler() {
    if (content.trim()) {
      onCreateComment(content);
      setText('');
    }
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setText(target.value);
    }
  }

  return (
    <div className="thread-input comment-input">
      <label className="inp" htmlFor="inp">
        <textarea type="text" placeholder="Talk your reply" value={content} onChange={handleTextChange} />
      </label>
      <div className="length-button">
        <p>
          <strong>{content.length}</strong>
          /320
        </p>
        <div id="container-btnCreate"><button id="btnCreate" type="submit" onClick={createCommentHandler}>Reply</button></div>
      </div>
    </div>
  );
}

ThreadComment.propTypes = {
  onCreateComment: PropTypes.func.isRequired,
};

export default ThreadComment;
