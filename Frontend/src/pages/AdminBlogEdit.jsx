// pages/AdminBlogEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogContext } from '../contexts/BlogContext';
import BlogForm from '../components/BlogForm';

const AdminBlogEdit = () => {
  const { id } = useParams(); // The route parameter. Use 'new' to create, otherwise edit.
  const navigate = useNavigate();
  const { getBlogById, addBlog, updateBlog } = useBlogContext();
  const isEditing = id && id !== 'new';

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const blog = getBlogById(id);
      if (blog) {
        setInitialData(blog);
      } else {
        // Redirect to dashboard if blog not found
        navigate('/admin');
      }
    }
  }, [id, isEditing, getBlogById, navigate]);

  const handleFormSubmit = (data) => {
    if (isEditing) {
      updateBlog(id, data);
    } else {
      addBlog(data);
    }
    navigate('/admin');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <BlogForm
          initialData={isEditing ? initialData : null}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AdminBlogEdit;
