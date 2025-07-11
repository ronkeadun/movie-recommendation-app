const mongoose = require('mongoose');

const ratingReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  movieId: { type: Number, required: true },
  rating: { type: Number, min : 0, max : 10 },
  review: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('RatingReview', ratingReviewSchema);