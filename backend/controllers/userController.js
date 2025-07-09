const User = require('../models/User');
const Review = require('../models/RatingReview');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const reviews = await Review.find({ userId: req.user.id });
    res.json({ ...user._doc, reviews });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { username }, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update profile' });
  }
};