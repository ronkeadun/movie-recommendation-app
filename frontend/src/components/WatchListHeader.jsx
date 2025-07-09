import { Link } from "react-router-dom";

export const WatchListHeader = () => {
  return (
    <header className="watchlist-header">
      <div className="container">
        <div className="inner-content">
          <div className="brand">
            <Link to="/watchlist">WatchList</Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/watchlist">WatchList</Link>
            </li>

            <li>
              <Link to="/watched">Watched</Link>
            </li>

            <li>
              <Link to="/addmovies" className="btn btn-main">
                + AddMovies
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
