// pages/BlogDetailPage.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogDetail from '../components/BlogDetail';
import { useBlogContext } from '../context/BlogContext';

const BlogDetailPage = () => {
  const { id } = useParams();
  const { getBlogById } = useBlogContext();
  
  const blog = getBlogById(id);
  
  if (!blog) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">Blog not found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Return to homepage
        </Link>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to blogs
        </Link>
      </div>
      
      <BlogDetail blog={blog} />
    </div>
  );
};

export default BlogDetailPage;