import { useEffect, useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function SearchResults() {
  const [params] = useSearchParams();

  const [movies, setMovies] = useState(null);
  const [error, setError]   = useState("");

  const [minRating, setMinRating] = useState(0);
  const [minYear,   setMinYear]   = useState(0);
  const [minPop,    setMinPop]    = useState(0);

  const [sortBy, setSortBy] = useState("relevance");

  useEffect(() => {
    const fetchData = async () => {
      setMovies(null);
      setError("");
      try {
        const q = params.toString();
        if (!q) {
          setError("Please enter a search query.");
          setMovies([]);
          return;
        }
        const { data } = await axios.get(`${API_BASE_URL}/api/movies/search?${q}`);
        setMovies(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Search failed. Try again.");
        setMovies([]);
      }
    };
    fetchData();
  }, [params]);

  const filteredSortedList = useMemo(() => {
    if (!movies) return null;
    let list = movies.filter((m) => {
      const ratingOK = (m.vote_average ?? 0) >= minRating;
      const yearOK   = minYear === 0
        ? true
        : Number((m.release_date || "").slice(0,4)) >= minYear;
      const popOK    = (m.popularity ?? 0) >= minPop;
      return ratingOK && yearOK && popOK;
    });

    switch (sortBy) {
      case "rating":
        list = [...list].sort((a,b) => (b.vote_average ?? 0) - (a.vote_average ?? 0));
        break;
      case "date":
        list = [...list].sort((a,b) => new Date(b.release_date||0) - new Date(a.release_date||0));
        break;
      case "popularity":
        list = [...list].sort((a,b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      default:
        break;
    }
    return list;
  }, [movies, minRating, minYear, minPop, sortBy]);

  if (movies === null) return <div className="p-4 mt-30">Loading…</div>;
  if (error)            return <div className="p-4 mt-30 text-red-600">{error}</div>;
  if (filteredSortedList.length === 0)
    return <div className="p-4 mt-30">No movies matched your search / filters.</div>;

  return (
    <div className="max-w-6xl mx-auto mt-20 p-4">
      <div className="mb-4 flex flex-wrap gap-4 items-end bg-[#333] p-4 rounded-xl">
        <div>
          <label className="block text-sm text-gray-300 mb-1">Min rating</label>
          <select
            value={minRating}
            onChange={(e)=>setMinRating(Number(e.target.value))}
            className="rounded-md border-gray-300 text-sm px-2 py-1"
          >
            {[0,9,8,7,6].map(v=>(
              <option key={v} value={v} className="bg-black">
                {v===0?"All":`⭐ ${v}+`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Released after</label>
          <select
            value={minYear}
            onChange={(e)=>setMinYear(Number(e.target.value))}
            className="rounded-md border-gray-300 text-sm px-2 py-1"
          >
            {[0,2020,2015,2010,2000].map(y=>(
              <option key={y} value={y} className="bg-black">
                {y===0?"All years":`${y}+`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1">Min popularity</label>
          <select
            value={minPop}
            onChange={(e)=>setMinPop(Number(e.target.value))}
            className="rounded-md border-gray-300 text-sm px-2 py-1"
          >
            {[0,1000,500,100].map(p=>(
              <option key={p} value={p} className="bg-black">
                {p===0?"All":`🔥 ${p}+`}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-sm text-gray-300">Sort&nbsp;by:</label>
          <select
            value={sortBy}
            onChange={(e)=>setSortBy(e.target.value)}
            className="rounded-md border-gray-300 bg-black text-sm px-2 py-1"
          >
            <option value="relevance">Relevance</option>
            <option value="rating">Rating ⭐</option>
            <option value="date">Newest 📅</option>
            <option value="popularity">Popularity 🔥</option>
          </select>
        </div>
        {(minRating||minYear||minPop) && (
          <button
            onClick={()=>{setMinRating(0);setMinYear(0);setMinPop(0);}}
            className="text-sm underline"
          >
            Clear filters
          </button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5 mt-20">
        {filteredSortedList.map(m=>(
          <Link
            key={m.id}
            to={`/movie/${m.id}`}
            className="bg-black rounded-2xl shadow hover:shadow-md transform hover:scale-105 transition duration-300 overflow-hidden"
          >
            <img
              src={m.poster_path?`https://image.tmdb.org/t/p/w342${m.poster_path}`:"/no-poster.jpg"}
              alt={m.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4 space-y-1">
              <h3 className="font-semibold text-lg">{m.title}</h3>
              <p className="text-xs text-gray-500">
                {m.release_date?.slice(0,4)||"—"} • ⭐ {m.vote_average??"—"} • 🔥 {Math.round(m.popularity)??"—"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults