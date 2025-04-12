// components/CategoryList.js
import React from 'react';

const CategoryList = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full ${
            activeCategory === 'All' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
          onClick={() => onCategorySelect('All')}
        >
          All
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            className={`px-4 py-2 rounded-full ${
              activeCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            onClick={() => onCategorySelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;