// components/TeamList.js
import React from 'react';
import { Link } from 'react-router-dom';
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
        <Link to={`/team/${member._id}`} key={member._id} className="no-underline">
          <TeamCard member={member} />
        </Link>
      ))}
    </div>
  );
};

export default TeamList;