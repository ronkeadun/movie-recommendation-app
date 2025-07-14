// frontend/src/pages/MyReviews.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

function MyReviews() {
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/users/reviews`, {
        withCredentials: true
      });
      setReviews(res.data);
    };
    load();
  }, [user]);

  if (!reviews) return <div className="p-4">Loading…</div>;
  if (reviews.length === 0) return <div className="p-4">No reviews yet.</div>;

  return (
    <div className="min-h-screen max-w-3xl mx-auto mt-20 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>
      {reviews.map((rv) => (
        <div
          key={rv._id}
          className="bg-[#333] rounded-xl shadow p-4 space-y-2"
        >
          <Link
            to={`/movie/${rv.movieId}`}
            className="text-lg font-semibold underline"
          >
            Movie #{rv.movieId}
          </Link>
          <p className="text-yellow-500">Rating: {rv.rating}/10</p>
          <p>{rv.review}</p>
          <p className="text-xs text-gray-500">
            {new Date(rv.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyReviews;
