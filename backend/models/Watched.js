const mongoose = require('mongoose');

const watchedSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  watched: { type: [Object], default: [] }
});

module.exports = mongoose.model('Watched', watchedSchema);