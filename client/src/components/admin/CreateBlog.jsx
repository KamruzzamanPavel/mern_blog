import React, { useState } from "react";
import axios from "axios";

const CreateBlog = ({ blogToEdit, cancelEdit, refreshBlogs }) => {
  const [newPost, setNewPost] = useState(
    blogToEdit || { title: "", content: "" }
  );
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      if (blogToEdit) {
        await axios.put(
          `http://localhost:5555/api/posts/${blogToEdit._id}`,
          newPost,
          config
        );
      } else {
        await axios.post("http://localhost:5555/api/posts", newPost, config);
      }
      setNewPost({ title: "", content: "" });
      refreshBlogs();
      cancelEdit();
    } catch (err) {
      console.error("Error saving blog", err);
      alert("Error saving blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          required
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          required
          rows="4"
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 mr-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : blogToEdit ? "Update Blog" : "Create Blog"}
      </button>
      <button
        type="button"
        className="bg-gray-500 text-white px-4 py-2 rounded"
        onClick={cancelEdit}
      >
        Cancel
      </button>
    </form>
  );
};

export default CreateBlog;
