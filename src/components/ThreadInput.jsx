import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadInput({ createThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  function createthread() {
    if (body.trim()) {
      createThread({ title, body, category });
      setTitle('');
      setBody('');
      setCategory('');
    }
  }

  function handleCategoryChange({ target }) {
    setCategory(target.value);
  }

  function handleTitleChange({ target }) {
    setTitle(target.value);
  }

  function handleTextChange({ target }) {
    if (target.value.length <= 320) {
      setBody(target.value);
    }
  }

  return (
    <div className="thread-input">
      <h2>Home</h2>
      <label className="inp" htmlFor="inp">
        <input id="inp" type="text" placeholder="Type Category" value={category} onChange={handleCategoryChange} />
        <span className="focus-bg" />
        <input id="inp" type="text" placeholder="Type Title" value={title} onChange={handleTitleChange} />
        <span className="focus-bg" />
        <textarea type="text" placeholder="Type Something" value={body} onChange={handleTextChange} id="inp" />
        <span className="focus-bg" />
      </label>
      <div id="container-btnCreate"><button id="btnCreate" type="button" onClick={createthread}>Create</button></div>
    </div>
  );
}

ThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default ThreadInput;
