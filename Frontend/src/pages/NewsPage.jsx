// pages/NewsPage.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNewsContext } from '../contexts/NewsContext';
import NewsDetail from '../components/NewsDetails';
import NewsList from '../components/NewsList';

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { newsItems, getNewsById } = useNewsContext();
  
  // Get the current news item if an ID is provided
  const currentNews = id ? getNewsById(id) : null;
  
  // Back button handler for detail view
  const handleBackToNews = () => {
    navigate('/news');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {id ? 'News Article' : 'Latest News'}
      </h1>
      
      {/* Conditional rendering based on whether we're viewing detail or list */}
      {id ? (
        <>
          {/* News Detail View */}
          <div className="mb-6">
            <button 
              onClick={handleBackToNews}
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to news
            </button>
          </div>
          
          {currentNews ? (
            <NewsDetail news={currentNews} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">News article not found</h2>
              <button 
                onClick={handleBackToNews}
                className="text-blue-600 hover:underline"
              >
                Return to news page
              </button>
            </div>
          )}
        </>
      ) : (
        /* News List View */
        <NewsList newsItems={newsItems.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))} />
      )}
    </div>
  );
};

export default NewsPage;