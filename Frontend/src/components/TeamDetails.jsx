// components/TeamDetail.js
import React from 'react';

const TeamDetail = ({ member }) => {
  if (!member) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img 
            src={member.profilePic} 
            alt={member.fullName} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-2/3">
          <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
            {member.category}
          </span>
          <h1 className="text-3xl font-bold mb-2">{member.fullName}</h1>
          <h2 className="text-xl text-gray-700 mb-4">{member.position}</h2>
          
          <div className="prose max-w-none mb-8">
            <p>{member.introduction}</p>
          </div>
          
          <div className="text-sm text-gray-500">
            Member since: {new Date(member.publishedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetail;