// models/blogModel.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A blog must have a title'],
      trim: true,
      maxlength: [100, 'A blog title must have less than 100 characters']
    },
    slug: String,
    content: {
      type: String,
      required: [true, 'A blog must have content']
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
    author: {
      type: String,
      required: [true, 'A blog must have an author']
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

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
blogSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// QUERY MIDDLEWARE
blogSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'author',
    select: 'name photo'
  });
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;