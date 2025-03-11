import React, { useState } from "react";
import axios from "axios";

const UpdateUser = ({ userId, initialName, initialEmail }) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        `http://localhost:5555/api/users/${userId}`,
        { name, email },
        config
      );

      alert("User updated successfully!");
      console.log("Updated User:", response.data);
    } catch (err) {
      console.error("Error updating user", err);
      alert("Error updating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update User"}
      </button>
    </form>
  );
};

export default UpdateUser;
