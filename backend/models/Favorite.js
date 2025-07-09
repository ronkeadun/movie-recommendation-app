
const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  favorites: { type: [Object], default: [] }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
