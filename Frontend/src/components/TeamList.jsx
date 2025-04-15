// components/TeamList.js
import React from 'react';
import TeamCard from './TeamCard';

const TeamList = ({ members }) => {
  if (members.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-600 mb-4">No team members found in this category</h3>
        <p className="text-gray-500">Try selecting a different category or add new team members.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map(member => (
          <TeamCard member={member} key={member._id} />
      ))}
    </div>
  );
};

export default TeamList;