import React from 'react';
import PropTypes from 'prop-types';

export default function Category({ categories, selectedCategory }) {
  const categoriesArray = [...categories];

  return (
    <div className="flex-1" id="category">
      <h2>Category</h2>
      {
        categoriesArray.map((category) => (
          <div className="category-item" key={category}>
            <button className="categoryItemThread" type="button" onClick={() => selectedCategory(category)}>{category}</button>
          </div>
        ))
      }
    </div>
  );
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.func.isRequired,
};
