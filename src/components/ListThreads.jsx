import React from 'react';
import PropTypes from 'prop-types';
import ItemThread, { threadItemShape } from './ItemThread';

function ListThreads({ threads, like, dislike }) {
  return (
    <div className="threads-list">
      {
        threads.map((thread) => (
          <ItemThread key={thread.id} {...thread} like={like} dislike={dislike} />
        ))
      }
    </div>
  );
}

ListThreads.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
};

export default ListThreads;
