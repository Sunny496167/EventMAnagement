import React from 'react';

const YouTubeEmbed = ({ videoUrl }) => {
  if (!videoUrl) return null;
  
  return (
    <div className="aspect-w-16 aspect-h-9 mb-6">
      <iframe
        className="w-full h-64 md:h-96 rounded-lg"
        src={videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbed;