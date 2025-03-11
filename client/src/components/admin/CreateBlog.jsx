import React, { useState } from "react";
import axios from "axios";

const CreateBlog = ({ onBlogCreated }) => {
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5555/api/posts",
        newPost,
        config
      );

      // Notify parent component (AdminDashboard) that a new blog was created
      onBlogCreated(response.data);

      // Reset form fields
      setNewPost({ title: "", content: "" });
      alert("Blog created successfully!");
    } catch (err) {
      console.error("Error creating blog", err);
      alert("Error creating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleCreatePost} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          value={newPost.title}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700"
        >
          Content
        </label>
        <textarea
          name="content"
          id="content"
          value={newPost.content}
          onChange={handleInputChange}
          required
          rows="4"
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Blog"}
      </button>
    </form>
  );
};

export default CreateBlog;
