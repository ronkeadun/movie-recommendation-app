import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'
import { FavMovieProvider } from './contexts/FavMovieContext';
import { WatchListProvider } from "./contexts/WatchListState";


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <FavMovieProvider>
        <WatchListProvider>
          <App />
        </WatchListProvider>
      </FavMovieProvider>
    </BrowserRouter>
)
