import React from 'react';
import { formatDate, getEventStatus } from '../utils/dateUtils';
import YouTubeEmbed from './YouTubeEmbed';
import RegistrationForm from './RegistrationForm';

const EventDetails = ({ event }) => {
  const eventStatus = getEventStatus(event.startDate, event.endDate);
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={event.imageUrl || "/api/placeholder/1200/600"} 
          alt={event.title} 
          className="w-full h-64 md:h-96 object-cover"
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start flex-wrap">
            <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
              eventStatus === 'upcoming' ? 'bg-green-100 text-green-800' :
              eventStatus === 'current' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {eventStatus.charAt(0).toUpperCase() + eventStatus.slice(1)}
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                <strong>Date & Time:</strong> {formatDate(event.startDate)}
              </p>
              <p className="text-gray-600">
                <strong>Location:</strong> {event.location}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <strong>Available Seats:</strong> {event.maxSeats - event.registeredAttendees}/{event.maxSeats}
              </p>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">About This Event</h2>
            <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
          </div>
          
          {event.additionalInfo && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
              <p className="text-gray-700 whitespace-pre-line">{event.additionalInfo}</p>
            </div>
          )}
          
          {event.videoUrl && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Event Preview</h2>
              <YouTubeEmbed videoUrl={event.videoUrl} />
            </div>
          )}
          
          {eventStatus === 'upcoming' && (
            <div className="mt-8">
              <RegistrationForm event={event} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;