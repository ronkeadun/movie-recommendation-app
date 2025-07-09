const Favorite = require('../models/Favorite');

exports.addFavorites = async (req, res) => {
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
  res.json(userFav);
}

exports.getFavorites = async (req, res) => {
  const userFav = await Favorite.findOne({ userId: req.params.userId });
  res.json(userFav ? userFav.favorites : []);
}

exports.deleteFavorites = async (req, res) => {
  const { userId, movieId } = req.params;
  const userFav = await Favorite.findOne({ userId });

  if (userFav) {
    userFav.favorites = userFav.favorites.filter(movie => movie.id != movieId);
    await userFav.save();
  }

  res.json(userFav ? userFav.favorites : []);
}