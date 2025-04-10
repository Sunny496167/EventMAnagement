// src/api.js
import axios from 'axios';


const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000',
  withCredentials: true
});

// Request interceptor to add auth token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default {
  // Auth
  register: (data) => API.post('/api/v1/auth/register', data),
  login: (data) => API.post('/api/v1/auth/login', data),

  // Events
  getEvents: (params) => API.get('/api/v1/events', { params }),
  createEvent: (data) => API.post('/api/v1/events', data),
  
  // Registrations
  registerForEvent: (eventId, data) => 
    API.post(`/api/v1/events/${eventId}/registrations`, data),
  
  // Media
  uploadEventMedia: (eventId, formData) => 
    API.post(`/api/v1/media/${eventId}/media`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
};