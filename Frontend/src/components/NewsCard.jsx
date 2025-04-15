// components/NewsCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={news.coverImage} 
        alt={news.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
        <p className="text-gray-600 mb-4">{news.summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(news.publishedAt).toLocaleDateString()}
          </span>
          <Link 
            to={`/news/${news._id}`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;