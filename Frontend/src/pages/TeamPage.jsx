// pages/TeamPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTeamContext } from '../contexts/TeamContext';
import CategoryFilter from '../components/CategoryFilter';
import TeamDetail from '../components/TeamDetails';
import TeamList from '../components/TeamList';

const TeamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, getTeamById, getTeamsByCategory } = useTeamContext();
  const [activeCategory, setActiveCategory] = useState('All');

  // Reset active category when navigating back to home
  useEffect(() => {
    if (!id) {
      setActiveCategory('All');
    }
  }, [id]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
    // If we're in detail view, navigate back to team list when selecting a category
    if (id) {
      navigate('/teams');
    }
  };

  // Get the current team member if an ID is provided
  const currentMember = id ? getTeamById(id) : null;

  // Get filtered team members for the list view
  const filteredMembers = getTeamsByCategory(activeCategory);

  // Back button handler for detail view
  const handleBackToTeam = () => {
    navigate('/teams');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">
          {id ? 'Team Member' : 'Our Team'}
        </h1>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {id ? (
        <>
          {/* Team Member Detail View */}
          <div className="mb-6">
            <button 
              onClick={handleBackToTeam}
              className="text-blue-600 hover:underline flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to team
            </button>
          </div>

          {currentMember ? (
            <TeamDetail member={currentMember} />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-600 mb-4">Team member not found</h2>
              <button 
                onClick={handleBackToTeam}
                className="text-blue-600 hover:underline"
              >
                Return to team page
              </button>
            </div>
          )}
        </>
      ) : (
        /* Team List View */
        <TeamList members={filteredMembers} />
      )}
    </div>
  );
};

export default TeamPage;