// components/BlogDetail.js
import React from 'react';

const BlogDetail = ({ blog }) => {
  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-2">
          {blog.category}
        </span>
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <div className="flex items-center text-gray-600 mb-4">
          <span>By {blog.author}</span>
          <span className="mx-2">•</span>
          <span>{blog.date}</span>
        </div>
      </div>

      <img 
        src={blog.imageUrl} 
        alt={blog.title} 
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
      />

      <div className="prose max-w-none mb-8">
        {blog.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>

      {blog.videoUrl && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Video</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-64 md:h-96 rounded-lg"
              src={blog.videoUrl}
              title="YouTube video"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-6">
        {blog.tags.map(tag => (
          <span 
            key={tag}
            className="px-3 py-1 bg-gray-200 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogDetail;