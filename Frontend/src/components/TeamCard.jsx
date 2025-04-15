// components/TeamCard.js
import React from 'react';

const TeamCard = ({ member }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={member.profilePic} 
        alt={member.fullName} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
          {member.category}
        </span>
        <h3 className="text-xl font-semibold mb-2">{member.fullName}</h3>
        <p className="text-gray-600 mb-2">{member.position}</p>
        <p className="text-gray-500 text-sm">{member.introduction}</p>
      </div>
    </div>
  );
};

export default TeamCard;