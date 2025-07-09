const Watchlist = require('../models/Watchlist');


// POST /api/watchlist
exports.addWatchList = async (req, res) => {
  const { userId, movie } = req.body;
  try {
    let userList = await Watchlist.findOne({ userId });
    // Create doc if non exists
    if (!userList) {
      userList = new Watchlist({ userId, watchlist: [movie] }); 
    }else{
      //Prevent Duplicate
      const alreadyExists = userList.watchlist.some(item => item.id === movie.id)
      if (alreadyExists) {
        return res.status(409).json({ message: "Movie already in watchlist" });
      }
      userList.watchlist.push(movie)
    }
    await userList.save();
    res.status(201).json(userList);
  } catch (error) {
    res.status(500).json({ message: "Error adding to watchlist", error });
  }
};

/*exports.addWatchList =  async (req, res) => {
  const { userId, movie } = req.body;
  const update = { $addToSet : {watchlist : movie}}
  try{
    let userList = await Watchlist.findOneAndUpdate({ userId }, update, {upsert: true, new: true});
    res.status(201).json(userList);
  }catch (error) {
    res.status(500).json({ message: "Error adding to watchlist", error });
  }
}*/

exports.getWatchList =  async (req, res) => {
  try{
    const userList = await Watchlist.findOne({ userId: req.params.userId });
    res.json(userList ? userList : {});
  }catch (error) {
    res.status(500).json({ message: "Error fetching watchlist", error });
  }
}

exports.deleteWatchList =  async (req, res) => {
  const { userId, movieId } = req.params;
  try{
    const userList = await Watchlist.findOne({ userId });
    if (userList) {
      userList.watchlist = userList.watchlist.filter(movie => movie.id != movieId);
      await userList.save();
    }
    res.json(userList ? userList.watchlist : []);
  }catch (error) {
    res.status(500).json({ message: "Error removing from watchlist", error });
  }
}