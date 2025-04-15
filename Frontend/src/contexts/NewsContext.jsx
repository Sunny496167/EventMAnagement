// contexts/NewsContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Sample initial data
const initialNews = [
  {
    _id: '1',
    title: 'New Event Center Opening in Downtown',
    summary: 'The city&pos;s newest event venue is set to open next month with a grand celebration.',
    content: 'The long-awaited Downtown Event Center will open its doors on May 15th with a ribbon-cutting ceremony followed by a community celebration. The 50,000-square-foot facility features state-of-the-art sound and lighting systems, flexible event spaces, and can accommodate up to 2,000 guests.\n\nMayor Johnson will lead the ribbon-cutting ceremony at 10 AM, followed by tours of the facility and a free concert in the main hall. Local food vendors will be on site throughout the day.\n\n"This venue will transform our downtown area and bring world-class entertainment to our community," said Event Center Director Sarah Williams. "We&pos;ve already booked several major concerts and conferences for the coming year."',
    coverImage: '/api/placeholder/800/400',
    publishedAt: '2025-04-01T10:00:00.000Z'
  },
  {
    _id: '2',
    title: 'Tech Conference Announces Keynote Speakers',
    summary: 'TechNow 2025 has revealed its impressive lineup of industry leaders for next month&pos;s conference.',
    content: 'TechNow 2025, the region&pos;s largest technology conference, has announced its keynote speakers for this year&pos;s event taking place May 10-12 at the Convention Center.\n\nHeadlining the conference will be Dr. Lisa Chen, AI Research Director at FutureTech, who will discuss recent breakthroughs in machine learning. Other notable speakers include software pioneer Marcus Johnson, cybersecurity expert Alicia Rodriguez, and startup founder David Park.\n\n"We&pos;re thrilled to bring together such an accomplished group of speakers," said conference organizer Michael Thompson. "Attendees will gain valuable insights into emerging technologies and future trends."\n\nEarly bird registration is available until April 25th with special rates for students and startups.',
    coverImage: '/api/placeholder/800/400',
    publishedAt: '2025-04-05T14:30:00.000Z'
  },
  {
    _id: '3',
    title: 'Local Festival Announces Expanded Program',
    summary: 'This year&pos;s Arts & Culture Festival will feature more performers, exhibitions, and activities than ever before.',
    content: 'The annual Arts & Culture Festival has announced an expanded program for this year&pos;s event, which will run from June 5-8 in City Park.\n\nThe festival will feature over 100 artists, musicians, and performers across five stages, up from three stages last year. New additions include an interactive art installation zone, a dedicated space for digital art, and extended evening performances.\n\n"We&pos;re responding to the incredible community support we&pos;ve received," said Festival Director Emma Clark. "Last year&pos;s attendance exceeded our expectations, so we&pos;re growing the festival to offer even more diverse cultural experiences."\n\nAdvance tickets are available online with a 20% discount until May 15th. The festival will also offer free admission to children under 12 and seniors over 65.',
    coverImage: '/api/placeholder/800/400',
    publishedAt: '2025-04-10T09:15:00.000Z'
  }
];

// Define the context
const NewsContext = createContext();

export const useNewsContext = () => useContext(NewsContext);

// Create a provider component
export const NewsProvider = ({ children }) => {
  const [newsItems, setNewsItems] = useState([]);
  
  // Initialize news
  useEffect(() => {
    // In a real app, you'd fetch from an API here
    setNewsItems(initialNews);
  }, []);
  
  // Get a news item by ID
  const getNewsById = (id) => {
    return newsItems.find(news => news._id === id);
  };
  
  // Add a new news item
  const addNews = (news) => {
    const newNews = {
      ...news,
      _id: Date.now().toString(),
      publishedAt: new Date().toISOString()
    };
    
    setNewsItems(prevNews => [...prevNews, newNews]);
  };
  
  // Update an existing news item
  const updateNews = (id, updatedNews) => {
    setNewsItems(prevNews => 
      prevNews.map(news => 
        news._id === id ? { ...news, ...updatedNews } : news
      )
    );
  };
  
  // Delete a news item
  const deleteNews = (id) => {
    setNewsItems(prevNews => prevNews.filter(news => news._id !== id));
  };
  
  const value = {
    newsItems,
    getNewsById,
    addNews,
    updateNews,
    deleteNews
  };
  
  return (
    <NewsContext.Provider value={value}>
      {children}
    </NewsContext.Provider>
  );
};