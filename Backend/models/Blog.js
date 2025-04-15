// models/blogModel.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A blog must have a title'],
      trim: true,
      maxlength: [100, 'A blog title must have less than 100 characters']
    },
    summary: {
      type: String,
      trim: true,
      maxlength: [200, 'A summary must have less than 200 characters']
    },
    coverImage: {
      type: String,
      default: 'default-blog.jpg'
    },
    publishedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);


const News = mongoose.model('News', newsSchema);

module.exports = News;
