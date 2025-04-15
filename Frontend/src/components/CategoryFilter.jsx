// components/CategoryFilter.js
import React from 'react';

const CategoryFilter = ({ categories, activeCategory, onCategorySelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        className={`px-4 py-2 rounded-full ${
          activeCategory === 'All'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
