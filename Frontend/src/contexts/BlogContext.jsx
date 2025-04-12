// context/BlogContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Sample initial data
const initialBlogs = [
  {
    id: '1',
    title: 'Getting Started with React',
    category: 'Technology',
    excerpt: 'Learn the basics of React and how to create your first component.',
    content: 'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update them when your data changes. In this blog post, we will cover the fundamentals of React and guide you through creating your first component.\n\nTo get started with React, you need to have Node.js installed on your machine. Once you have Node.js, you can create a new React project using Create React App by running the following command: `npx create-react-app my-app`.',
    author: 'Jane Doe',
    date: '2025-03-15',
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    id: '2',
    title: 'The Art of Baking Sourdough',
    category: 'Food',
    excerpt: 'Master the ancient technique of sourdough bread making at home.',
    content: 'Sourdough bread making is an art that has been practiced for thousands of years. The process involves cultivating wild yeast and bacteria to leaven bread, resulting in a tangy flavor and chewy texture that many bread enthusiasts love.\n\nThe first step in making sourdough bread is creating a starter. A sourdough starter is a mixture of flour and water that ferments over time, cultivating wild yeast and beneficial bacteria. This process takes about 5-7 days, and once your starter is active, you can use it to bake delicious sourdough bread.',
    author: 'Mark Johnson',
    date: '2025-03-20',
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Baking', 'Sourdough', 'Recipes']
  },
  {
    id: '3',
    title: 'Sustainable Urban Gardening',
    category: 'Lifestyle',
    excerpt: 'Transform your balcony or windowsill into a thriving garden.',
    content: 'Urban gardening is a fantastic way to bring nature into your city life, even with limited space. Whether you have a small balcony, windowsill, or rooftop, you can create a lush green space that provides fresh herbs, vegetables, and beautiful flowers.\n\nThe key to successful urban gardening is choosing the right plants for your space and climate. Consider factors such as sunlight exposure, wind conditions, and how much time you can dedicate to maintenance. Some great low-maintenance options for beginners include herbs like basil and mint, leafy greens like lettuce and spinach, and hardy flowers like marigolds and petunias.',
    author: 'Sophia Lee',
    date: '2025-04-01',
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Gardening', 'Sustainability', 'Urban Living']
  },
  {
    id: '4',
    title: 'Introduction to Machine Learning',
    category: 'Technology',
    excerpt: 'Explore the fundamentals of machine learning and AI applications.',
    content: 'Machine learning is a branch of artificial intelligence that focuses on building systems that can learn from and make decisions based on data. It has become increasingly important in our technology-driven world, powering everything from recommendation systems to self-driving cars.\n\nThere are three main types of machine learning: supervised learning, unsupervised learning, and reinforcement learning. In supervised learning, the algorithm is trained on labeled data to make predictions or decisions. Unsupervised learning involves finding patterns in unlabeled data. Reinforcement learning is based on training agents to make sequences of decisions by rewarding desired behaviors.',
    author: 'Alex Chen',
    date: '2025-04-05',
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['AI', 'Machine Learning', 'Data Science']
  },
  {
    id: '5',
    title: 'Mindfulness Meditation for Beginners',
    category: 'Health',
    excerpt: 'Start your meditation journey with these simple techniques.',
    content: 'Mindfulness meditation is a practice that involves focusing your attention on the present moment and accepting it without judgment. It has been shown to reduce stress, improve concentration, and enhance overall well-being.\n\nTo begin practicing mindfulness meditation, find a quiet and comfortable place to sit. Close your eyes and focus on your breath, noticing the sensation of air moving in and out of your body. When your mind wanders (and it will), gently bring your attention back to your breath without criticizing yourself. Start with just 5 minutes a day and gradually increase the duration as you become more comfortable with the practice.',
    author: 'Emma Wilson',
    date: '2025-04-10',
    imageUrl: '/api/placeholder/800/400',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    tags: ['Meditation', 'Mental Health', 'Wellness']
  }
];

// Define the context
const BlogContext = createContext();

export const useBlogContext = () => useContext(BlogContext);

// Create a provider component
export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // Initialize blogs and categories
  useEffect(() => {
    // In a real app, you'd fetch from an API here
    setBlogs(initialBlogs);
    
    // Extract unique categories
    const uniqueCategories = [...new Set(initialBlogs.map(blog => blog.category))];
    setCategories(uniqueCategories);
  }, []);
  
  // Get a blog by ID
  const getBlogById = (id) => {
    return blogs.find(blog => blog.id === id);
  };
  
  // Get blogs by category
  const getBlogsByCategory = (category) => {
    if (!category || category === 'All') {
      return blogs;
    }
    return blogs.filter(blog => blog.category === category);
  };
  
  // Add a new blog
  const addBlog = (blog) => {
    const newBlog = {
      ...blog,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    
    setBlogs(prevBlogs => [...prevBlogs, newBlog]);
    
    // Update categories if needed
    if (!categories.includes(blog.category)) {
      setCategories(prevCategories => [...prevCategories, blog.category]);
    }
  };
  
  // Update an existing blog
  const updateBlog = (id, updatedBlog) => {
    setBlogs(prevBlogs => 
      prevBlogs.map(blog => 
        blog.id === id ? { ...blog, ...updatedBlog } : blog
      )
    );
    
    // Update categories if needed
    const uniqueCategories = [...new Set(blogs.map(blog => blog.category))];
    setCategories(uniqueCategories);
  };
  
  // Delete a blog
  const deleteBlog = (id) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== id));
    
    // Update categories if needed
    const remainingBlogs = blogs.filter(blog => blog.id !== id);
    const uniqueCategories = [...new Set(remainingBlogs.map(blog => blog.category))];
    setCategories(uniqueCategories);
  };
  
  const value = {
    blogs,
    categories,
    getBlogById,
    getBlogsByCategory,
    addBlog,
    updateBlog,
    deleteBlog
  };
  
  return (
    <BlogContext.Provider value={value}>
        {children}
    </BlogContext.Provider>
  )
};

