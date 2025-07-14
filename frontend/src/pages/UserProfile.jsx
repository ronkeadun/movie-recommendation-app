import  { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuthStore } from '../store/authStore';

const API_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState("");
    
  const {fetchUser, user} = useAuthStore();

  useEffect(() => {
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        withCredentials: true
      });
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  useEffect (() => {
    if (user){
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: ""
      });
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(`${API_BASE_URL}/api/users/profile`, formData, {
        withCredentials: true
      });
      toast.success("Profile updated!")
      setMessage("Profile updated successfully.");
      await fetchUser(); // Refresh the store user
    } catch (err) {
      toast.error("Failed to update profile");
      setMessage("Update failed.");
      console.error(err);
    }finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="min-h-screen max-w-md mx-auto mt-30 p-6 bg-black rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>

      <div className="mb-6 p-4 border border-gray-200 rounded bg-[#333]">
        <h3 className="text-lg font-semibold mb-2">Current Info</h3>
        <p className="text-sm">
          <span className="font-medium">Username:</span> {formData.username || 'N/A'}
        </p>
        <p className="text-sm">
          <span className="font-medium">Email:</span> {formData.email || 'N/A'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 mb-5">
        <Link
          to="/favorites"
          className="bg-blue-500 rounded-xl p-4 text-center hover:bg-blue-700 transition"
        >
          <div className="text-xl font-bold">
            {profile?.stats?.favorites || 0}
          </div>
          <div className="text-sm">Favorites</div>
        </Link>

        <Link
          to="/watchlist"
          className="bg-green-500 rounded-xl p-4 text-center hover:bg-green-700 transition"
        >
          <div className="text-xl font-bold">
            {profile?.stats?.watchlist || 0}
          </div>
          <div className="text-sm">Watchlist</div>
        </Link>
        <Link
          to="/watched"
          className="bg-yellow-500 rounded-xl p-4 text-center hover:bg-yellow-700 transition"
        >
          <div className="text-xl font-bold">
            {profile?.stats?.watched || 0}
          </div>
          <div className="text-sm">Watched</div>
        </Link>
        <Link
          to="/my-reviews"
          className="bg-purple-500 rounded-xl p-4 text-center hover:bg-purple-700 transition"
        >
          <div className="text-xl font-bold">
            {profile?.stats?.reviews || 0}
          </div>
          <div className="text-sm">Reviews</div>
        </Link>
      </div>
      
      {/* Editable Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          disabled={updating}
          className="bg-[#e50914] text-white px-4 py-2 rounded hover:bg-red-700"
        >
          {updating ? "Updating..." : "Save Changes"}
        </button>

        {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default UserProfile;