import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { EventProvider } from './contexts/EventContext';

// Import pages
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import Admin from './pages/Admin';
import AdminEventEdit from './pages/AdminEventEdit';

const App = () => {
  return (
    <EventProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link to="/" className="text-xl font-bold text-blue-600">
                    EventHub
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link to="/" className="text-gray-700 hover:text-blue-600">
                    Events
                  </Link>
                  <Link to="/admin" className="text-gray-700 hover:text-blue-600">
                    Admin
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/event/:eventId" element={<EventPage />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/new" element={<AdminEventEdit />} />
              <Route path="/admin/edit/:eventId" element={<AdminEventEdit />} />
            </Routes>
          </main>

          <footer className="bg-white mt-12 py-6 border-t">
            <div className="max-w-7xl mx-auto px-4">
              <p className="text-center text-gray-500">
                &copy; {new Date().getFullYear()} EventHub. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </EventProvider>
  );
};

export default App;