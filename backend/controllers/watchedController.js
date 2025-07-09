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

/*exports.addWatched =  async (req, res) => {
  const { userId, movie } = req.body;
  const update = { $addToSet : {watched : movie}}
  try{
    let userList = await Watched.findOneAndUpdate({ userId }, update, {upsert: true, new: true});
    res.json(userList);
  }catch (error) {
    res.status(500).json({ message: "Error adding to watched", error });
  }
}*/

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

/*exports.moveWatched =  async (req, res) => {
  const { userId, movie } = req.body;
  try{
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
  }catch (error) {
    res.status(500).json({ message: "Error moving to watched", error });
  }
}*/

exports.moveWatched = async (req, res) => {
  const { userId, movie } = req.body;

  try {
    // 1. Remove from watched
    let watchedDoc = await Watched.findOne({ userId });
    if (!watchedDoc) {
      return res.status(404).json({ message: "Watched list not found" });
    }

    const isInWatched = watchedDoc.watched.some(m => m.id === movie.id);
    if (!isInWatched) {
      return res.status(404).json({ message: "Movie not found in watched list" });
    }

    // Remove the movie
    watchedDoc.watched = watchedDoc.watched.filter(m => m.id !== movie.id);
    await watchedDoc.save();

    // 2. Add to watchlist only if not present
    let watchlistDoc = await Watchlist.findOne({ userId });

    if (!watchlistDoc) {
      watchlistDoc = new Watchlist({ userId, watchlist: [movie] });
    } else {
      const alreadyInWatchlist = watchlistDoc.watchlist.some(m => m.id === movie.id);
      if (!alreadyInWatchlist) {
        watchlistDoc.watchlist.push(movie);
      } else {
        return res.status(409).json({ message: "Moved to watchlist (already existed)", watchlist: watchlistDoc.watchlist });
      }
    }

    await watchlistDoc.save();

    return res.status(200).json({ message: "Successfully moved to watchlist", watchlist: watchlistDoc.watchlist });

  } catch (error) {
    console.error("Error moving movie:", error);
    return res.status(500).json({ message: "Server error", error });
  }
}