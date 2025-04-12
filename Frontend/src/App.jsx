// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import AdminBlogEdit from './pages/AdminBlogEdit';

// Import pages
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import Admin from './pages/Admin';
import AdminEventEdit from './pages/AdminEventEdit';
import BlogPage from './pages/BlogPage';
import NewsPage from './pages/NewsPage';
import BlogAdminPage from './pages/BlogAdminPage';
import { EventProvider } from './contexts/EventContext';


const App = () => {
  return (
    <EventProvider>
      <BlogProvider>
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
                    <Link to="/news" className="text-gray-700 hover:text-blue-600">
                      News
                    </Link>
                    <Link to="/blog" className="text-gray-700 hover:text-blue-600">
                      Blogs
                    </Link>
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
                <Route path="/news" element={<NewsPage />} />
                {/* Blog routes: assuming BlogPage handles both list and detail views */}
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/event/new" element={<AdminEventEdit />} />
                <Route path="/admin/event/edit/:eventId" element={<AdminEventEdit />} />
                <Route path="/admin/blog" element={<BlogAdminPage />} />
                <Route path="/admin/blog/new" element={<AdminBlogEdit />} />
                <Route path="/admin/blog/edit/:blogId" element={<AdminBlogEdit />} />
                <Route path="/admin/news/new" element={<AdminEventEdit />} />
                <Route path="/admin/news/edit/:newsId" element={<AdminEventEdit />} />
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
      </BlogProvider>
    </EventProvider>
  );
};

export default App;
