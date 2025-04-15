const News = require('../models/News');
const catchAsync = require('../utils/catchAsync');
const { NotFoundError } = require('../utils/errors');


// GET news statistics (monthly count of news articles)
exports.getNewsStats = catchAsync(async (req, res, next) => {
    const stats = await News.aggregate([
      {
        $group: {
          _id: null,
          totalNews: { $sum: 1 }
        }
      }
    ]);
  
    res.status(200).json({
      status: 'success',
      data: { totalNews: stats.length > 0 ? stats[0].totalNews : 0 }
    });
  });
  
  

// GET all news
exports.getAllNews = catchAsync(async (req, res, next) => {
  let filter = {};

  // Optional: Search by title or summary if query parameter is provided
  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filter.$or = [
      { title: searchRegex },
      { summary: searchRegex }
    ];
  }

  const query = News.find(filter);

  // Sorting (default sort by publishedAt in descending order)
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
  const newsItems = await query;
  const totalCount = await News.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: newsItems.length,
    totalCount,
    data: { news: newsItems }
  });
});

// GET single news item by ID
exports.getNews = catchAsync(async (req, res, next) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return next(new NotFoundError('No news found with that ID'));
  }

  res.status(200).json({
    status: 'success',
    data: { news }
  });
});

// CREATE news item (admin only)
exports.createNews = catchAsync(async (req, res, next) => {
  // If an image was uploaded, Cloudinary returns the URL in `req.file.path`
  if (req.file) {
    req.body.coverImage = req.file.path;
  }

  const newNews = await News.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { news: newNews }
  });
});

// UPDATE news item (admin only)
exports.updateNews = catchAsync(async (req, res, next) => {
  // If a new image file is provided, update the coverImage field
  if (req.file) {
    req.body.coverImage = req.file.path;
  }

  const news = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!news) {
    return next(new NotFoundError('No news found with that ID'));
  }

  res.status(200).json({
    status: 'success',
    data: { news }
  });
});

// DELETE news item (admin only)
exports.deleteNews = catchAsync(async (req, res, next) => {
  const news = await News.findByIdAndDelete(req.params.id);
  if (!news) {
    return next(new NotFoundError('No news found with that ID'));
  }

  res.status(203).json({
    status: 'success',
    data: null
  });
});
