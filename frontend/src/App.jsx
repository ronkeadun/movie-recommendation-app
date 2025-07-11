import { useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/authStore"

import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Moviedetails from "./pages/Moviedetails"
import Footer from "./components/Footer"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import Favorites from "./pages/Favorites"
import AIRecommendations from "./pages/AIRecommendations";
import { AddMovies } from "./pages/AddMovies";
import { Watched } from "./pages/Watched";
import { Watchlist } from "./pages/Watchlist";
import RatingReviewPage from "./pages/RatingReviewPage";


const App = () => {

    const {fetchUser, fetchingUser, user} = useAuthStore();

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    if(fetchingUser){
        return <p className="text-[#e50914]">Loading...</p>
    }

    const ProtectedRoute = ({user}) => {
        return user? <Outlet /> : <Navigate to="/signin" />
    }

    return (
        <div>
            <Toaster />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/movie/:id" element={<Moviedetails />}/>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route element={<ProtectedRoute user={user} />} >
                    <Route path="/favorites" element={<Favorites />} />
                    <Route exact path="/watchlist" element={<Watchlist />}/>
                    <Route exact path="/rating-review" element={<RatingReviewPage />}/>
                </Route>
                <Route path="/watched" element={<Watched />} />
                <Route path="/addmovies" element={<AddMovies />} />
                <Route path="/ai-recommendations" element={<AIRecommendations />} />
            </Routes>
            <Footer />
        </div>
    )
}

export default App
