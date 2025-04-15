// components/NewsList.js
import React from 'react';
import NewsCard from './NewsCard';

const NewsList = ({ newsItems }) => {
  if (newsItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">No news found</h3>
        <p className="text-gray-500">Check back later for updates.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsItems.map(news => (
        <NewsCard key={news._id} news={news} />
      ))}
    </div>
  );
};

export default NewsList;