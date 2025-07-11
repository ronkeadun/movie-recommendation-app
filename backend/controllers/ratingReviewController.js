const RatingReview = require('../models/RatingReview');

exports.addReview = async (req, res) => {
  const { userId, movieId, rating, review } = req.body;
  try {
    const ratingReview = new RatingReview({
      userId,
      movieId,
      rating,
      review
    });
    await ratingReview.save();
    res.status(201).json(ratingReview);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: 'Failed to submit review' });
  }
};

exports.getReviews = async (req, res) => {
  try {
    const reviews = await RatingReview.find({ movieId: req.params.movieId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review } = req.body;
  try{
    const ratingReview = await RatingReview.findByIdAndUpdate(reviewId, { rating, review }, { new: true });
    res.json(ratingReview);
  }catch (err) {
    res.status(500).json({ message: 'Failed to update reviews' });
  }
};

exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const ratingReview = await RatingReview.findById(reviewId);
    if (!ratingReview) return res.status(404).json({ message: 'Review not found' });
    if (ratingReview.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await ratingReview.deleteOne();
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};