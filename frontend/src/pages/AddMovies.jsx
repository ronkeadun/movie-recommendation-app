 import { useState } from "react";
import { SearchResultCard } from "../components/SearchResultCard";

export const AddMovies = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;  
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);

    fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setSearchResults(data.results);
        } else {
          setSearchResults([]);
        }
      });
  };

  return (
    <div className="add-page">
      <div className="container">
        <div className="add-content">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Search for a movie"
              value={query}
              onChange={onChange}
            />
          </div>

          {searchResults.length > 0 && (
            <ul className="results">
              {searchResults.map((movie) => (
                <li key={movie.id}>
                  <SearchResultCard movie={movie} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
