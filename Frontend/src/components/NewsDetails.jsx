// components/NewsDetail.js
import React from 'react';

const NewsDetail = ({ news }) => {
  if (!news) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
      <div className="text-gray-600 mb-6">
        Published on {new Date(news.publishedAt).toLocaleDateString()}
      </div>

      <img 
        src={news.coverImage} 
        alt={news.title} 
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
      />

      <div className="prose max-w-none">
        {news.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;