// pages/NewsAdminPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNewsContext } from '../contexts/NewsContext';

const NewsAdminPage = () => {
  const navigate = useNavigate();
  const { newsItems, deleteNews } = useNewsContext();
  
  // Search query state for filtering news in the dashboard view
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddNew = () => {
    navigate('/admin/news/new');
  };

  const handleEdit = (newsId) => {
    navigate(`/admin/news/edit/${newsId}`);
  };

  const handleDelete = (newsId) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      deleteNews(newsId);
    }
  };

  // Filter news using the search query. Here we filter by title (case-insensitive)
  const filteredNews = newsItems.filter(news =>
    news.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">News Admin Dashboard</h1>
        <button 
          onClick={handleAddNew}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
        >
          Add New Article
        </button>
      </div>
      
      {/* Search Input */}
      <div className="mb-4">
        <input 
          type="text"
          placeholder="Search news by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {filteredNews.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-500">No news articles found matching your search. Create your first news article!</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNews.map(news => (
                  <tr key={news._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{news.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(news.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(news._id)}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(news._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsAdminPage;