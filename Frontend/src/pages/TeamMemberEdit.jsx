// pages/TeamMemberEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTeamContext } from '../contexts/TeamContext';
import TeamForm from '../components/TeamForm';

const TeamMemberEdit = () => {
  const { id } = useParams(); // Use 'new' to create, otherwise edit an existing team member
  const navigate = useNavigate();
  const { getTeamById, addTeamMember, updateTeamMember } = useTeamContext();
  const isEditing = id && id !== 'new';

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (isEditing) {
      const member = getTeamById(id);
      if (member) {
        setInitialData(member);
      } else {
        // Redirect to dashboard if team member not found
        navigate('/admin/teams');
      }
    }
  }, [id, isEditing, getTeamById, navigate]);

  const handleFormSubmit = (data) => {
    if (isEditing) {
      updateTeamMember(id, data);
    } else {
      addTeamMember(data);
    }
    navigate('/admin/teams');
  };

  const handleCancel = () => {
    navigate('/admin/teams');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEditing ? 'Edit Team Member' : 'Add New Team Member'}
        </h1>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <TeamForm
          initialData={isEditing ? initialData : null}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default TeamMemberEdit;