const Watchlist = require('../models/Watchlist');

exports.addWatchList =  async (req, res) => {
  const { userId, movie } = req.body;
  const update = { $addToSet : {watchlist : movie}}
  let userList = await Watchlist.findOneAndUpdate({ userId }, update, {upsert: true, new: true});
  res.json(userList);
}

exports.getWatchList =  async (req, res) => {
  const userList = await Watchlist.findOne({ userId: req.params.userId });
  res.json(userList ? userList.watchlist : []);
}

exports.deleteWatchList =  async (req, res) => {
  const { userId, movieId } = req.params;
  const userList = await Watchlist.findOne({ userId });
  if (userList) {
    userList.watchlist = userList.watchlist.filter(movie => movie.id != movieId);
    await userList.save();
  }
  res.json(userList ? userList.watchlist : []);
}