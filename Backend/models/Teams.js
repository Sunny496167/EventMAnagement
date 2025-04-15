const mongoose = require('mongoose');

const teamsSchema = new mongoose.Schema(
  {
    fullName: {
        type: String,
        required: [true, 'Name is required']
      },
    position: {
        type: String,
        required: [true, 'Position is required']
      },
    category: {
        type: String,
        required: [true, 'Category is required']
      },
    introduction: {
      type: String,
      trim: true,
      maxlength: [200, 'A Introduction must have less than 200 characters']
    },
    profilePic: {
      type: String,
      default: 'default-profile.jpg'
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


const Teams = mongoose.model('Teams', teamsSchema);

module.exports = Teams;
