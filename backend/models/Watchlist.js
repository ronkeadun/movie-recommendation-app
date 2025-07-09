const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  watchlist: { type: [Object], default: [] }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
