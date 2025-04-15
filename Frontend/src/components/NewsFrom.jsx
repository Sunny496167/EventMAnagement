// components/NewsForm.js
import React, { useState, useEffect } from 'react';

const NewsForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    coverImage: '',
    publishedAt: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      // Format the date for the input field
      const formattedData = {
        ...initialData,
        publishedAt: initialData.publishedAt 
          ? new Date(initialData.publishedAt).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0]
      };
      setFormData(formattedData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Summary
        </label>
        <textarea
          id="summary"
          name="summary"
          value={formData.summary}
          onChange={handleChange}
          required
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows="10"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
          Cover Image URL
        </label>
        <input
          type="text"
          id="coverImage"
          name="coverImage"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {formData.coverImage && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Preview:</p>
            <img 
              src={formData.coverImage} 
              alt="Preview" 
              className="h-40 object-cover rounded-md"
            />
          </div>
        )}
      </div>
      
      <div>
        <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700 mb-1">
          Publish Date
        </label>
        <input
          type="date"
          id="publishedAt"
          name="publishedAt"
          value={formData.publishedAt}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default NewsForm;