import React, { createContext, useState, useEffect, useContext } from 'react';
import { getEventStatus } from '../utils/dateUtils';

// Sample initial data
const initialEvents = [
  {
    id: 1,
    title: 'Web Development Workshop',
    description: 'Learn the fundamentals of modern web development with React and Node.js.',
    startDate: '2025-04-15T10:00:00',
    endDate: '2025-04-15T16:00:00',
    location: 'Tech Hub, Downtown',
    maxSeats: 50,
    registeredAttendees: 42,
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8',
    additionalInfo: 'Bring your own laptop. Lunch will be provided.'
  },
  {
    id: 2,
    title: 'Data Science Conference',
    description: 'Annual conference featuring the latest trends in data science and AI.',
    startDate: '2025-04-08T09:00:00',
    endDate: '2025-04-09T18:00:00',
    location: 'Grand Convention Center',
    maxSeats: 200,
    registeredAttendees: 200,
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/ua-CiDNNj30',
    additionalInfo: 'Network with industry professionals and academic researchers.'
  },
  {
    id: 3,
    title: 'Mobile App Development Bootcamp',
    description: 'Intensive two-day bootcamp covering iOS and Android development.',
    startDate: '2025-05-20T09:00:00',
    endDate: '2025-05-21T17:00:00',
    location: 'Innovation Lab',
    maxSeats: 30,
    registeredAttendees: 12,
    imageUrl: '/api/placeholder/800/400',
    videoUrl: null,
    additionalInfo: 'Prior programming experience recommended but not required.'
  },
  {
    id: 4,
    title: 'Product Management Workshop',
    description: 'Learn essential product management skills from industry experts.',
    startDate: '2025-04-10T08:00:00',
    endDate: '2025-04-10T18:00:00',
    location: 'Business Center',
    maxSeats: 80,
    registeredAttendees: 45,
    imageUrl: '/api/placeholder/800/400',
    videoUrl: null,
    additionalInfo: 'Certificate of completion will be provided.'
  },
];

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(initialEvents);
  
  // For demo purposes, we're using localStorage
  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (newEvent) => {
    const eventWithId = {
      ...newEvent,
      id: Date.now(),
      registeredAttendees: 0
    };
    setEvents([...events, eventWithId]);
    return eventWithId;
  };

  const updateEvent = (updatedEvent) => {
    setEvents(events.map(event => 
      event.id === updatedEvent.id ? updatedEvent : event
    ));
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const registerForEvent = (eventId, attendeeInfo) => {
    setEvents(events.map(event => {
      if (event.id === eventId && event.registeredAttendees < event.maxSeats) {
        return {
          ...event,
          registeredAttendees: event.registeredAttendees + 1,
          // In a real app, you'd store attendee info in a separate collection
          attendees: [...(event.attendees || []), attendeeInfo]
        };
      }
      return event;
    }));
  };

  // Filter events by category
  const getEventsByCategory = () => {
    const upcoming = [];
    const current = [];
    const past = [];

    events.forEach(event => {
      const status = getEventStatus(event.startDate, event.endDate);
      if (status === 'upcoming') upcoming.push(event);
      else if (status === 'current') current.push(event);
      else past.push(event);
    });

    return { upcoming, current, past };
  };

  const value = {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    registerForEvent,
    getEventsByCategory
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};