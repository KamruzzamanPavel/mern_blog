import React, { useState } from "react";
import axios from "axios";

const UpdateBlog = ({ blogId, initialTitle, initialContent }) => {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
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
        `http://localhost:5555/api/posts/${blogId}`,
        { title, content },
        config
      );

      alert("Blog updated successfully!");
      console.log("Updated Blog:", response.data);
    } catch (err) {
      console.error("Error updating blog", err);
      alert("Error updating blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
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
        {loading ? "Updating..." : "Update Blog"}
      </button>
    </form>
  );
};

export default UpdateBlog;
