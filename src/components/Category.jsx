import React from 'react';
import PropTypes, { string } from 'prop-types';

export default function Category({ categories, selectedCategory }) {
  return (
    <div className="flex-1" id="category">
      <h2>Category</h2>
      {
        categories.map((category) => (
          <div className="category-item">
            <button className="categoryItemThread" type="button" onClick={selectedCategory(category)}>{category}</button>
          </div>
        ))
      }
    </div>
  );
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.objectOf(string)).isRequired,
  selectedCategory: PropTypes.func.isRequired,
};
