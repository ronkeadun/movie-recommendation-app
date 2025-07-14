const User = require('../models/User');
const Favorite = require('../models/Favorite');
const Watchlist = require('../models/Watchlist');
const Watched = require('../models/Watched');
const RatingReview = require('../models/RatingReview');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Fetch related data counts
    const [favoriteCount, watchlistCount, watchedCount, reviewCount] = await Promise.all([
      Favorite.findOne({userId }),
      Watchlist.findOne({userId }),
      Watched.findOne({userId }),
      RatingReview.countDocuments({userId })
    ]);

    res.json({
      user,
      stats: {
        favorites: favoriteCount?.favorites?.length ?? 0,
        watchlist: watchlistCount?.watchlist?.length ?? 0,
        watched: watchedCount?.watched?.length ?? 0,
        reviews: reviewCount
      }
    });
  } catch (error) {
    console.error('Error in getMe:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.getReviews = async (req, res) => {
  try {
    const userId = req.user.id;       
    const reviews = await RatingReview
      .find({ userId })
      .sort({ createdAt: -1 })              // newest first
    res.status(200).json(reviews);
  } catch (err) {
    console.error('getMyReviews error', err);
    res.status(500).json({ message: 'Server error' });
  }
}

exports.updateProfile = async (req, res) => {
  const { username, email, password } = req.body;
  const updateFields = {};

  if (username) updateFields.username = username;
  if (email) updateFields.email = email;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    updateFields.password = await bcrypt.hash(password, salt);
  }

  try {
    let user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}