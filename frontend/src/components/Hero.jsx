import { Bookmark, Play } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { WatchListContext } from "../contexts/WatchListState";

const Hero = () => {
  const [movie, setMovie] = useState(null);

  const { watchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(WatchListContext);

  const isWatchList = (movieId) => {
    return watchlist?.some(movie => movie.id === movieId)
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`
    },
  };

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.results && res.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * res.results.length);
          setMovie(res.results[randomIndex]);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const iswatchlist = isWatchList(movie.id)

  function onWatchListClick(movie) {
    if (iswatchlist) removeMovieFromWatchlist(movie.id)
    else addMovieToWatchlist(movie)
  }

  return (
    <div className="text-white relative mt-20">
      <div className="absolute top-70 left-10">
        <h1 className="text-4xl font-bold mb-2 text-[#ffe400]">Welcome To MovieFlix</h1>
        <p className="max-w-3xl font-bold text-gray-200">This is a place you can get personalized movie recommendations</p>
      </div>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="bg-img"
        className="w-full rounded-2xl h-[480px] object-center object-cover"
      />

      <div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium">
        <button className="flex justify-center items-center bg-white  hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base"
        onClick={() => onWatchListClick(movie)}
        >
          <Bookmark className={`mr-2 w-4 h-5 md:w-5 md:h-5 watchlist ${iswatchlist ? "active" : ""}`}/> Save for Later
        </button>
        <Link to={`/movie/${movie.id}`}>
          <button className="flex justify-center items-center bg-[#e50914]  text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
            <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Trailer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
