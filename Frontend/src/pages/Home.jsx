import React, { useState } from 'react';
import { useEvents } from '../contexts/EventContext';
import EventList from '../components/EventList';

const Home = () => {
  const { getEventsByCategory } = useEvents();
  const [activeTab, setActiveTab] = useState('upcoming');
  const { upcoming, current, past } = getEventsByCategory();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center mb-6">Event Management System</h1>
        
        <nav className="flex justify-center">
          <ul className="flex space-x-2 p-1 bg-gray-100 rounded-lg">
            <li>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'upcoming' 
                    ? 'bg-white shadow-sm font-medium text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Upcoming Events
                {upcoming.length > 0 && (
                  <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                    {upcoming.length}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('current')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'current' 
                    ? 'bg-white shadow-sm font-medium text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Current Events
                {current.length > 0 && (
                  <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
                    {current.length}
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'past' 
                    ? 'bg-white shadow-sm font-medium text-blue-600' 
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                Past Events
                {past.length > 0 && (
                  <span className="ml-2 bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs">
                    {past.length}
                  </span>
                )}
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {activeTab === 'upcoming' && (
          <EventList 
            events={upcoming} 
            title="Upcoming Events" 
          />
        )}
        
        {activeTab === 'current' && (
          <EventList 
            events={current} 
            title="Currently Happening" 
          />
        )}
        
        {activeTab === 'past' && (
          <EventList 
            events={past} 
            title="Past Events" 
          />
        )}
      </main>
    </div>
  );
};

export default Home;