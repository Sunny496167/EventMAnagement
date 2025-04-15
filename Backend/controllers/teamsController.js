const Teams = require('../models/Teams');
const catchAsync = require('../utils/catchAsync');
const { NotFoundError } = require('../utils/errors');

// GET team statistics (e.g., total members)
exports.getTeamStats = catchAsync(async (req, res, next) => {
  const stats = await Teams.aggregate([
    {
      $group: {
        _id: null,
        totalMembers: { $sum: 1 }
      }
    }
  ]);

  res.status(200).json({
    status: 'success',
    data: { totalMembers: stats.length > 0 ? stats[0].totalMembers : 0 }
  });
});

// GET all team members (with search, pagination, sort)
exports.getAllTeamMembers = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search, 'i');
    filter.$or = [
      { fullName: searchRegex },
      { position: searchRegex },
      { category: searchRegex }
    ];
  }

  const query = Teams.find(filter);

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

  const teamMembers = await query;
  const totalCount = await Teams.countDocuments(filter);

  res.status(200).json({
    status: 'success',
    results: teamMembers.length,
    totalCount,
    data: { team: teamMembers }
  });
});

// GET single team member by ID
exports.getTeamMember = catchAsync(async (req, res, next) => {
  const team = await Teams.findById(req.params.id);
  if (!team) return next(new NotFoundError('No team member found with that ID'));

  res.status(200).json({
    status: 'success',
    data: { team }
  });
});

// CREATE team member
exports.createTeamMember = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.profilePic = req.file.path;
  }

  const newMember = await Teams.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { team: newMember }
  });
});

// UPDATE team member
exports.updateTeamMember = catchAsync(async (req, res, next) => {
  if (req.file) {
    req.body.profilePic = req.file.path;
  }

  const team = await Teams.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!team) return next(new NotFoundError('No team member found with that ID'));

  res.status(200).json({
    status: 'success',
    data: { team }
  });
});

// DELETE team member
exports.deleteTeamMember = catchAsync(async (req, res, next) => {
  const team = await Teams.findByIdAndDelete(req.params.id);
  if (!team) return next(new NotFoundError('No team member found with that ID'));

  res.status(203).json({
    status: 'success',
    data: null
  });
});
