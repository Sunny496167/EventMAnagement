// pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center py-16">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <div className="flex justify-center space-x-4">
        <Link 
          to="/" 
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </Link>
        <Link 
          to="/admin" 
          className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Go to Admin
        </Link>
      </div>
    </div>
  );
};

export default NotFound;