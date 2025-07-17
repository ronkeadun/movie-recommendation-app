const Watchlist = require('../models/Watchlist');
const Watched = require('../models/Watched');

exports.addWatched = async (req, res) => {
  const { userId, movie } = req.body;
  try {
    let userList = await Watched.findOne({ userId });
    // Create doc if non exists
    if (!userList) {
      userList = new Watched({ userId, watched: [movie] }); 
    }else{
      //Prevent Duplicate
      const alreadyExists = userList.watched.some(item => item.id === movie.id)
      if (alreadyExists) {
        return res.status(409).json({ message: "Movie already in watched" });
      }
      userList.watched.push(movie)
    }
    await userList.save();
    res.status(201).json(userList);
  } catch (error) {
    res.status(500).json({ message: "Error adding to watched", error });
  }
};

exports.getWatched =  async (req, res) => {
  try{
    const userList = await Watched.findOne({ userId: req.params.userId });
    res.json(userList ? userList : {});
  }catch (error) {
    res.status(500).json({ message: "Error fetching watched", error });
  }
}

exports.deleteWatched =  async (req, res) => {
  const { userId, movieId } = req.params;
  try{
    const userList = await Watched.findOne({ userId });
    if (userList) {
      userList.watched = userList.watched.filter(movie => movie.id != movieId);
      await userList.save();
    }
    res.json(userList ? userList.watched : []);
  }catch (error) {
    res.status(500).json({ message: "Error removing from watched", error });
  }
}

exports.moveWatched = async (req, res) => {
  const { userId, movie } = req.body;

  try {
    // 1. Remove from watchlist
    let watchlistDoc = await Watchlist.findOne({ userId });

    if (!watchlistDoc) {
      return res.status(404).json({ message: "Watchlist not found" });
    }

    const isInWatchlist = watchlistDoc.watchlist.some(m => m.id === movie.id);
    if (!isInWatchlist) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    // Remove movie from watchlist here
    watchlistDoc.watchlist = watchlistDoc.watchlist.filter(m => m.id !== movie.id);
    await watchlistDoc.save();

    // 2. Add to watched only if not already there
    let watchedDoc = await Watched.findOne({ userId });

    if (!watchedDoc) {
      watchedDoc = new Watched({ userId, watched: [movie] });
    } else {
      const alreadyWatched = watchedDoc.watched.some(m => m.id === movie.id);
      if (!alreadyWatched) {
        watchedDoc.watched.push(movie);
      } else {
        return res.status(409).json({ message: "Movie already in watched list", watched: watchedDoc.watched });
      }
    }
    await watchedDoc.save();
    return res.status(200).json({ message: "Successfully moved to watched", watched: watchedDoc.watched });
  } catch (error) {
    console.error("Error moving movie:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}