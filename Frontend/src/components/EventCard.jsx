import React from 'react';
import { formatDate } from '../utils/dateUtils';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={event.imageUrl || "/api/placeholder/400/200"} 
          alt={event.title} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <h3 className="text-white font-bold text-xl">{event.title}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-700 mb-2">{formatDate(event.startDate)}</p>
        <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {event.registeredAttendees}/{event.maxSeats} seats taken
          </span>
          <Link 
            to={`/event/${event.id}`} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;