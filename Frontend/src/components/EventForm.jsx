import React, { useState, useEffect } from 'react';

const EventForm = ({ event, onSubmit, isSubmitting }) => {
  const initialFormState = {
    id: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    maxSeats: 50,
    imageUrl: '',
    videoUrl: '',
    additionalInfo: '',
    registeredAttendees: 0
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (event) {
      // Format dates for input fields
      const startDate = new Date(event.startDate);
      const endDate = event.endDate ? new Date(event.endDate) : '';
      
      setFormData({
        ...event,
        startDate: startDate.toISOString().slice(0, 16),
        endDate: endDate ? endDate.toISOString().slice(0, 16) : ''
      });
    } else {
      setFormData(initialFormState);
    }
  }, [event]);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.maxSeats || formData.maxSeats < 1) {
      newErrors.maxSeats = 'Max seats must be at least 1';
    }
    
    if (formData.videoUrl && !isValidYouTubeUrl(formData.videoUrl)) {
      newErrors.videoUrl = 'Please enter a valid YouTube embed URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidYouTubeUrl = (url) => {
    if (!url) return true;
    return url.includes('youtube.com/embed/') || url.includes('youtu.be/');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="title">
          Event Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        ></textarea>
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="startDate">
            Start Date and Time *
          </label>
          <input
            type="datetime-local"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.startDate ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
        </div>
        
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="endDate">
            End Date and Time (Optional)
          </label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="location">
          Location *
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.location ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="maxSeats">
          Maximum Seats *
        </label>
        <input
          type="number"
          id="maxSeats"
          name="maxSeats"
          min="1"
          value={formData.maxSeats}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.maxSeats ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.maxSeats && <p className="text-red-500 text-sm mt-1">{errors.maxSeats}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="imageUrl">
          Image URL (Optional)
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Use /api/placeholder/800/400 for a placeholder image"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="videoUrl">
          YouTube Embed URL (Optional)
        </label>
        <input
          type="text"
          id="videoUrl"
          name="videoUrl"
          value={formData.videoUrl || ''}
          onChange={handleChange}
          placeholder="https://www.youtube.com/embed/..."
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.videoUrl ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.videoUrl && <p className="text-red-500 text-sm mt-1">{errors.videoUrl}</p>}
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2" htmlFor="additionalInfo">
          Additional Information (Optional)
        </label>
        <textarea
          id="additionalInfo"
          name="additionalInfo"
          value={formData.additionalInfo || ''}
          onChange={handleChange}
          rows="4"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
      </div>
      
      {formData.id && (
        <div>
          <label className="block text-gray-700 font-medium mb-2" htmlFor="registeredAttendees">
            Current Registrations
          </label>
          <input
            type="number"
            id="registeredAttendees"
            name="registeredAttendees"
            min="0"
            value={formData.registeredAttendees}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
        >
          {isSubmitting ? 'Saving...' : event?.id ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;