import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import EventForm from '../components/EventForm';

const AdminEventEdit = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvents();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const isNewEvent = eventId === 'new';

  useEffect(() => {
    if (!isNewEvent) {
      setLoading(true);
      try {
        const foundEvent = events.find(e => e.id === parseInt(eventId));
        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Event not found');
        }
      } catch{
        setError('Failed to load event');
      } finally {
        setLoading(false);
      }
    }
  }, [eventId, events, isNewEvent]);

  const handleSubmit = async (formData) => {
    setSubmitting(true);
    setError(null);
    
    try {
      if (isNewEvent) {
        // Create new event
        const newEvent = await addEvent(formData);
        // Redirect to the edit page of the new event
        navigate(`/admin/edit/${newEvent.id}`, { replace: true });
      } else {
        // Update existing event
        await updateEvent(formData);
        setEvent(formData); // Update local state
      }
      
      // Show success message or redirect
      setTimeout(() => {
        navigate('/admin');
      }, 500);
    } catch {
      setError('Failed to save event. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse flex flex-col">
          <div className="h-10 bg-gray-200 rounded w-1/4 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-full mt-8"></div>
          <div className="h-6 bg-gray-200 rounded w-full mt-4"></div>
          <div className="h-6 bg-gray-200 rounded w-2/3 mt-4"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {isNewEvent ? 'Create New Event' : 'Edit Event'}
        </h1>
        <Link 
          to="/admin"
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Admin
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-6">
        <EventForm 
          event={event} 
          onSubmit={handleSubmit} 
          isSubmitting={submitting} 
        />
      </div>
    </div>
  );
};

export default AdminEventEdit;