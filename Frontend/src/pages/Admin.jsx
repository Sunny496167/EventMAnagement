// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useEvents } from '../contexts/EventContext';
// import { formatDate, getEventStatus } from '../utils/dateUtils';

// const Admin = () => {
//   const { events, deleteEvent } = useEvents();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
  
//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };
  
//   // Filter events based on search term
//   const filteredEvents = events.filter(event => 
//     event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     event.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );
  
//   // Confirm delete modal
//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setShowDeleteModal(true);
//   };
  
//   // Handle event deletion
//   const handleDelete = async () => {
//     if (!deleteId) return;
    
//     setIsDeleting(true);
//     try {
//       // Delete the event
//       deleteEvent(deleteId);
//       setShowDeleteModal(false);
//     } catch (error) {
//       console.error('Failed to delete event:', error);
//     } finally {
//       setIsDeleting(false);
//       setDeleteId(null);
//     }
//   };
  
//   // Cancel delete
//   const cancelDelete = () => {
//     setShowDeleteModal(false);
//     setDeleteId(null);
//   };

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <header className="mb-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <Link 
//             to="/admin/new"
//             className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Create New Event
//           </Link>
//         </div>
        
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search events..."
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <svg 
//             xmlns="http://www.w3.org/2000/svg" 
//             className="h-5 w-5 text-gray-400 absolute left-3 top-3.5" 
//             viewBox="0 0 20 20" 
//             fill="currentColor"
//           >
//             <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//           </svg>
//         </div>
//       </header>

//       <main>
//         <div className="bg-white shadow-md rounded-lg overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Event
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Location
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Registrations
//                   </th>
//                   <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {filteredEvents.length === 0 ? (
//                   <tr>
//                     <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
//                       No events found. Create a new event to get started.
//                     </td>
//                   </tr>
//                 ) : (
//                   filteredEvents.map(event => {
//                     const status = getEventStatus(event.startDate, event.endDate);
//                     return (
//                       <tr key={event.id} className="hover:bg-gray-50">
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="flex items-center">
//                             <div className="flex-shrink-0 h-10 w-10">
//                               <img 
//                                 className="h-10 w-10 rounded-full object-cover" 
//                                 src={event.imageUrl || "/api/placeholder/100/100"} 
//                                 alt="" 
//                               />
//                             </div>
//                             <div className="ml-4">
//                               <div className="text-sm font-medium text-gray-900">{event.title}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{formatDate(event.startDate)}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900">{event.location}</div>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                             status === 'upcoming' ? 'bg-green-100 text-green-800' :
//                             status === 'current' ? 'bg-blue-100 text-blue-800' :
//                             'bg-gray-100 text-gray-800'
//                           }`}>
//                             {status.charAt(0).toUpperCase() + status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                           {event.registeredAttendees}/{event.maxSeats}
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                           <Link 
//                             to={`/event/${event.id}`}
//                             className="text-indigo-600 hover:text-indigo-900 mr-4"
//                           >
//                             View
//                           </Link>
//                           <Link 
//                             to={`/admin/edit/${event.id}`}
//                             className="text-blue-600 hover:text-blue-900 mr-4"
//                           >
//                             Edit
//                           </Link>
//                           <button 
//                             onClick={() => confirmDelete(event.id)}
//                             className="text-red-600 hover:text-red-900"
//                           >
//                             Delete
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
//             <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
//             <p className="text-gray-500 mb-6">
//               Are you sure you want to delete this event? This action cannot be undone.
//             </p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={cancelDelete}
//                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={isDeleting}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
//               >
//                 {isDeleting ? 'Deleting...' : 'Delete'}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;

// pages/Admin.js
import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Events</h2>
          <p className="text-gray-600 mb-4">Manage your events, schedules, and locations.</p>
          <Link 
            to="/admin/event/new" 
            className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-2"
          >
            Add New Event
          </Link>
          <Link 
            to="/admin" 
            className="block text-center w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Manage Events
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blog Posts</h2>
          <p className="text-gray-600 mb-4">Create and manage your blog content.</p>
          <Link 
            to="/admin/blog/new" 
            className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-2"
          >
            Add New Blog
          </Link>
          <Link 
            to="/admin/blog" 
            className="block text-center w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Manage Blogs
          </Link>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">News</h2>
          <p className="text-gray-600 mb-4">Publish and manage news articles.</p>
          <Link 
            to="/admin/news/new" 
            className="block text-center w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-2"
          >
            Add News Article
          </Link>
          <Link 
            to="/admin/news" 
            className="block text-center w-full px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
          >
            Manage News
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
