// controllers/blogController.js
const Blog = require('../models/Blog');
const catchAsync = require('../utils/catchAsync');
const { BadRequestError, NotFoundError, ForbiddenError } = require('../utils/errors');

// GET all blogs (public)
exports.getAllBlogs = catchAsync(async (req, res, next) => {
    let filter = {};
  
    // Filter by tag if provided
    if (req.query.tag) {
      filter.tags = { $in: [req.query.tag] };
    }
  
    // Search by title, content, or summary
    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { summary: searchRegex }
      ];
    }
  
    const query = Blog.find(filter);
  
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query.sort(sortBy);
    } else {
      query.sort('-publishedAt');
    }
  
    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);
  
    // Execute query
    const blogs = await query;
    const totalCount = await Blog.countDocuments(filter);
  
    res.status(200).json({
      status: 'success',
      results: blogs.length,
      totalCount,
      data: { blogs }
    });
  });
  
  // GET single blog by ID
  exports.getBlog = catchAsync(async (req, res, next) => {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return next(new NotFoundError('No blog found with that ID'));
    }
  
    res.status(200).json({
      status: 'success',
      data: { blog }
    });
  });
  
  // GET single blog by slug
  exports.getBlogBySlug = catchAsync(async (req, res, next) => {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return next(new NotFoundError('No blog found with that slug'));
    }
  
    res.status(200).json({
      status: 'success',
      data: { blog }
    });
  });
  

// CREATE blog (admin only)
// Expects the 'author' field from the form and if an image is provided, it comes via req.file
exports.createBlog = catchAsync(async (req, res, next) => {
  // Ensure that the author name is provided
  if (!req.body.author) {
    return next(new BadRequestError('A blog must have an author name provided in the form'));
  }

  // If tags are provided as a comma-separated string, split them into an array
  if (req.body.tags && typeof req.body.tags === 'string') {
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
  }
  
  // If an image was uploaded via Cloudinary, set its URL to the coverImage property
  if (req.file) {
    req.body.coverImage = req.file.path; // Cloudinary returns the secure URL in 'path'
  }
  
  // Set publishedAt if status is published
  if (req.body.status === 'published') {
    req.body.publishedAt = Date.now();
  }
  
  const newBlog = await Blog.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { blog: newBlog }
  });
});

// UPDATE blog (admin only)
exports.updateBlog = catchAsync(async (req, res, next) => {
  // Handle tags if provided
  if (req.body.tags && typeof req.body.tags === 'string') {
    req.body.tags = req.body.tags.split(',').map(tag => tag.trim());
  }
  
  // If an image was uploaded via Cloudinary, update the coverImage URL
  if (req.file) {
    req.body.coverImage = req.file.path;
  }
  
  // If status is updated to published and the blog wasn't published before, update publishedAt
  if (req.body.status === 'published') {
    const blog = await Blog.findById(req.params.id);
    if (blog && blog.status !== 'published') {
      req.body.publishedAt = Date.now();
    }
  }
  
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!updatedBlog) {
    return next(new NotFoundError('No blog found with that ID'));
  }
  
  res.status(200).json({
    status: 'success',
    data: { blog: updatedBlog }
  });
});

// DELETE blog (admin only)
exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) {
    return next(new NotFoundError('No blog found with that ID'));
  }
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// GET blog dashboard stats (admin)
exports.getBlogStats = catchAsync(async (req, res, next) => {
  const stats = await Blog.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const formattedStats = {
    total: 0,
    published: 0,
    draft: 0,
    archived: 0
  };
  
  stats.forEach(stat => {
    formattedStats[stat._id] = stat.count;
    formattedStats.total += stat.count;
  });
  
  res.status(200).json({
    status: 'success',
    data: { stats: formattedStats }
  });
});
