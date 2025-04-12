// pages/BlogPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import BlogDetail from '../components/BlogDetail';
import { useBlogContext } from '../contexts/BlogContext';
import BlogList from '../components/BlogList';

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, getBlogById, getBlogsByCategory } = useBlogContext();
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Reset active category when navigating back to home
  useEffect(() => {
    if (!id) {
      setActiveCategory('All');
    }
  }, [id]);
  
  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    // If we're in detail view, navigate back to home when selecting a category
    if (id) {
      navigate('/');
    }
  };
  
  // Get the current blog if an ID is provided
  const currentBlog = id ? getBlogById(id) : null;
  
  // Get filtered blogs for the home view
  const filteredBlogs = getBlogsByCategory(activeCategory);
  
  // Back button handler for detail view
  const handleBackToBlogs = () => {
    navigate('/');
  };
  
  return (
    <div>
      {/* Categories are shown in both views */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {id ? 'Blog Post' : 'Blog Posts'}
        </h1>
        
        <CategoryList
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>
      
      {/* Conditional rendering based on whether we're viewing detail or list */}
      {id ? (
        <>
          {/* Blog Detail View */}
          <div className="mb-6">
            <button 
              onClick={handleBackToBlogs}
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to blogs
            </button>
          </div>
          
          {currentBlog ? (
            <BlogDetail blog={currentBlog} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Blog not found</h2>
              <button 
                onClick={handleBackToBlogs}
                className="text-blue-600 hover:underline"
              >
                Return to homepage
              </button>
            </div>
          )}
        </>
      ) : (
        /* Blog List View */
        <BlogList blogs={filteredBlogs} />
      )}
    </div>
  );
};

export default BlogPage;