import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const RatingReviewDisplay = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ rating: "", review: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // needs to identify the current user
  const { user } = useAuthStore(); 

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`${API_BASE_URL}/api/rating-reviews/${movieId}`, { withCredentials: true });
        if (Array.isArray(res.data)) {
          setReviews(res.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  const handleDelete = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/rating-reviews/${reviewId}`, { withCredentials: true });
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      toast.success("Review deleted.")
    } catch (err) {
      console.error(err);
      setError("Failed to delete review.");
      toast.error("Failed to delete review.");
    }
  };

  const startEdit = (review) => {
    setEditingId(review._id);
    setEditData({ rating: review.rating, review: review.review });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({ rating: "", review: "" });
  };

  const submitEdit = async (reviewId) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/rating-reviews/${reviewId}`,
        {
          rating: Number(editData.rating),
          review: editData.review,
        },
        { withCredentials: true }
      );
      setReviews((prev) =>
        prev.map((r) => (r._id === reviewId ? res.data : r))
      );
      toast.success("Review Updated!")
      cancelEdit();
    } catch (err) {
      console.error(err);
      setError("Failed to update review.");
      toast.error("Failed to update review.");
    }
  };

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-[#666] shadow-md rounded-lg p-4 mt-10">
      <h2 className="text-xl font-bold mb-4 text-center">User Ratings & Reviews</h2>
      {reviews.length === 0 ? (
        <div className="text-center text-white">No reviews yet.</div>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => {
            const isOwner = review.userId?._id === user?._id;

            return (
              <li key={review._id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-blue-900">
                    {review.userId?.username || "Anonymous"}
                  </span>
                  {!editingId || editingId !== review._id ? (
                    <span className="bg-yellow-400 text-white px-2 py-1 rounded text-sm font-medium">
                      ⭐ {review.rating}/10
                    </span>
                  ) : null}
                </div>

                {editingId === review._id ? (
                  <div className="space-y-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={editData.rating}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, rating: e.target.value }))
                      }
                      className="w-full border px-2 py-1 rounded"
                    />
                    <textarea
                      value={editData.review}
                      onChange={(e) =>
                        setEditData((prev) => ({ ...prev, review: e.target.value }))
                      }
                      className="w-full border px-2 py-1 rounded"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => submitEdit(review._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-black">{review.review}</p>
                )}

                {isOwner && !editingId && (
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => startEdit(review)}
                      className="text-sm text-indigo-700 font-bold cursor-pointer hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="text-sm text-red-700 font-bold cursor-pointer hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RatingReviewDisplay;
