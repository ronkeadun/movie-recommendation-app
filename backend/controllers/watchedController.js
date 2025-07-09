const Watchlist = require('../models/Watchlist');
const Watched = require('../models/Watched');

exports.addWatched =  async (req, res) => {
  const { userId, movie } = req.body;
  const update = { $addToSet : {watched : movie}}
  let userList = await Watched.findOneAndUpdate({ userId }, update, {upsert: true, new: true});
  res.json(userList);
}

exports.getWatched =  async (req, res) => {
  const userList = await Watched.findOne({ userId: req.params.userId });
  res.json(userList ? userList.watched : []);
}

exports.deleteWatched =  async (req, res) => {
  const { userId, movieId } = req.params;
  const userList = await Watched.findOne({ userId });
  if (userList) {
    userList.watched = userList.watched.filter(movie => movie.id != movieId);
    await userList.save();
  }
  res.json(userList ? userList.watched : []);
}

exports.moveWatched =  async (req, res) => {
  const { userId, movie } = req.body;

  let userList = await Watched.findOne({ userId });
  if (!userList) {
    userList = new Watched({ userId, watched: [] });
  }
  userList.watched.push(movie);
  await userList.save();

  const watchlist = await Watchlist.findOne({ user: userId });
  if (watchlist) {
    watchlist.movies = watchlist.movies.filter(m => m.toString() !== movie._id);
    await watchlist.save();
  }

  res.json({ userList, watchlist });
}