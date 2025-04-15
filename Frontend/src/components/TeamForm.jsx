// components/TeamForm.js
import React, { useState, useEffect } from 'react';

const TeamForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    position: '',
    category: '',
    introduction: '',
    profilePic: '',
    publishedAt: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  // Initialize form with existing data if editing
  useEffect(() => {
    if (initialData) {
      const date = initialData.publishedAt 
        ? new Date(initialData.publishedAt).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
        
      setFormData({
        ...initialData,
        publishedAt: date
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }

    if (formData.introduction && formData.introduction.length > 200) {
      newErrors.introduction = 'Introduction must be less than 200 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.fullName ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
        )}
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700">
          Position *
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.position ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.position && (
          <p className="mt-1 text-sm text-red-600">{errors.position}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <input
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="e.g., Management, Development, Marketing"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="introduction" className="block text-sm font-medium text-gray-700">
          Introduction
        </label>
        <textarea
          id="introduction"
          name="introduction"
          rows="3"
          value={formData.introduction}
          onChange={handleChange}
          maxLength="200"
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.introduction ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        />
        <div className="mt-1 flex justify-between">
          <p className="text-sm text-gray-500">
            {formData.introduction ? formData.introduction.length : 0}/200 characters
          </p>
          {errors.introduction && (
            <p className="text-sm text-red-600">{errors.introduction}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
          Profile Picture URL
        </label>
        <input
          type="text"
          id="profilePic"
          name="profilePic"
          value={formData.profilePic}
          onChange={handleChange}
          placeholder="URL to profile picture (default will be used if not provided)"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-700">
          Publish Date
        </label>
        <input
          type="date"
          id="publishedAt"
          name="publishedAt"
          value={formData.publishedAt}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TeamForm;
