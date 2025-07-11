const Favorite = require('../models/Favorite');

exports.addFavorites = async (req, res) => {
  try{
    const { userId, movie } = req.body;
    let userFav = await Favorite.findOne({ userId });

    if (!userFav) {
      userFav = new Favorite({ userId, favorites: [movie] });
    } else {
      if (!userFav.favorites.some(fav => fav.id === movie.id)) {
        userFav.favorites.push(movie);
      }
    }
    await userFav.save();
    res.status(201).json(userFav);
  }catch (error) {
    res.status(500).json({ message: "Error adding to favorites", error });
  }
}

exports.getFavorites = async (req, res) => {
  try{
    const userFav = await Favorite.findOne({ userId: req.params.userId });
    res.json(userFav ? userFav.favorites : []);
  }catch (error) {
    res.status(500).json({ message: "Error fetching favorites", error });
  }
}

exports.deleteFavorites = async (req, res) => {
  try{
    const { userId, movieId } = req.params;
    const userFav = await Favorite.findOne({ userId });

    if (userFav) {
      userFav.favorites = userFav.favorites.filter(movie => movie.id != movieId);
      await userFav.save();
    }

    res.json(userFav ? userFav.favorites : []);
  }catch (error) {
    res.status(500).json({ message: "Error deleting favorites", error });
  }
}