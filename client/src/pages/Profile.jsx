import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";
const Profile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        console.log(accessToken);

        // const config = { headers: { Authorization: `Bearer ${accessToken}` } };

        const response = await api.get("/api/profile");
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = { headers: { Authorization: `Bearer ${accessToken}` } };

      const response = await axios.put(
        "http://localhost:5555/api/profile",
        formData,
        config
      );
      setUser(response.data.user);
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      {!isEditing ? (
        <>
          <div className="mb-4">
            <p className="text-lg">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {user.email}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Profile
          </button>
        </>
      ) : (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Updating..." : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Profile;
