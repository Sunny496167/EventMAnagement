// pages/AdminNewsEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNewsContext } from '../contexts/NewsContext';
import NewsForm from '../components/NewsFrom';

const AdminNewsEdit = () => {
  const { id } = useParams(); // Use 'new' to create, otherwise edit an existing news item
  const navigate = useNavigate();
  const { getNewsById, addNews, updateNews } = useNewsContext();
  const isEditing = id && id !== 'new';

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const news = getNewsById(id);
      if (news) {
        setInitialData(news);
      } else {
        // Redirect to dashboard if news not found
        navigate('/admin/news');
      }
    }
  }, [id, isEditing, getNewsById, navigate]);

  const handleFormSubmit = (data) => {
    if (isEditing) {
      updateNews(id, data);
    } else {
      addNews(data);
    }
    navigate('/admin/news');
  };

  const handleCancel = () => {
    navigate('/admin/news');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit News Article' : 'Create New News Article'}
        </h1>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <NewsForm
          initialData={isEditing ? initialData : null}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default AdminNewsEdit;