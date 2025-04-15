// contexts/TeamContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
const TeamContext = createContext();

// Sample initial data for team members
const initialTeamMembers = [
  {
    _id: '1',
    fullName: 'John Smith',
    position: 'CEO',
    category: 'Management',
    introduction: 'John leads our company with over 15 years of experience in tech leadership.',
    profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
    publishedAt: '2023-01-15'
  },
  {
    _id: '2',
    fullName: 'Emily Chen',
    position: 'Lead Developer',
    category: 'Development',
    introduction: 'Emily specializes in frontend architecture and has contributed to multiple open-source projects.',
    profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
    publishedAt: '2023-02-10'
  },
  {
    _id: '3',
    fullName: 'Michael Johnson',
    position: 'Marketing Director',
    category: 'Marketing',
    introduction: 'Michael brings creative marketing strategies with a background in digital campaigns.',
    profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
    publishedAt: '2023-01-20'
  }
];

export const TeamProvider = ({ children }) => {
  // State for team members
  const [teamMembers, setTeamMembers] = useState(() => {
    const savedTeamMembers = localStorage.getItem('teamMembers');
    return savedTeamMembers ? JSON.parse(savedTeamMembers) : initialTeamMembers;
  });

  // Save to localStorage whenever team members change
  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
  }, [teamMembers]);

  // Extract unique categories from team members
  const categories = Array.from(
    new Set(teamMembers.map(member => member.category))
  );

  // Get team member by ID
  const getTeamById = (id) => {
    return teamMembers.find(member => member._id === id);
  };

  // Get team members by category
  const getTeamsByCategory = (category) => {
    if (category === 'All') {
      return teamMembers;
    }
    return teamMembers.filter(member => member.category === category);
  };

  // Add new team member
  const addTeamMember = (teamData) => {
    const newTeamMember = {
      ...teamData,
      _id: Date.now().toString(), // Simple ID generation
      profilePic: teamData.profilePic || 'default-profile.jpg'
    };
    setTeamMembers(prev => [...prev, newTeamMember]);
  };

  // Update existing team member
  const updateTeamMember = (id, teamData) => {
    setTeamMembers(prev => 
      prev.map(member => 
        member._id === id ? { ...member, ...teamData } : member
      )
    );
  };

  // Delete team member
  const deleteTeamMember = (id) => {
    setTeamMembers(prev => prev.filter(member => member._id !== id));
  };

  // Context value
  const value = {
    teamMembers,
    categories,
    getTeamById,
    getTeamsByCategory,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};

// Custom hook to use the team context
export const useTeamContext = () => {
  return useContext(TeamContext);
};