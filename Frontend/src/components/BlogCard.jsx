// components/BlogCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={blog.imageUrl} 
        alt={blog.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
          {blog.category}
        </span>
        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
        <p className="text-gray-600 mb-4">{blog.excerpt}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{blog.date}</span>
          <Link 
            to={`/blog/${blog.id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;