import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../contexts/EventContext';
import EventDetails from '../components/EventDetails';
import { Link } from 'react-router-dom';

const EventPage = () => {
  const { eventId } = useParams();
  const { events } = useEvents();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    try {
      const foundEvent = events.find(e => e.id === parseInt(eventId));
      if (foundEvent) {
        setEvent(foundEvent);
        setError(null);
      } else {
        setError('Event not found');
      }
    } catch {
      setError('Failed to load event details');
    } finally {
      setLoading(false);
    }
  }, [eventId, events]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-lg bg-gray-200 h-64 w-full max-w-4xl"></div>
          <div className="h-8 bg-gray-200 rounded w-1/3 mt-8"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mt-2"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg inline-block">
          <h2 className="text-xl font-bold mb-2">{error}</h2>
          <p className="mb-4">The event you're looking for might have been removed or doesn't exist.</p>
          <button 
            onClick={handleGoBack}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors mr-4"
          >
            Go Back
          </button>
          <Link 
            to="/"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Home Page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={handleGoBack}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              All Events
            </Link>
          </div>
        </div>
      </div>
      
      {event && <EventDetails event={event} />}
    </div>
  );
};

export default EventPage;