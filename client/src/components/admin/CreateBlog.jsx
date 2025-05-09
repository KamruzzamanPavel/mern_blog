import React, { useState, useEffect } from "react";

import api from "../../utils/api";
const CreateBlog = ({ blogToEdit, cancelEdit, refreshBlogs }) => {
  if (typeof blogToEdit === "boolean") blogToEdit = false;

  const [newPost, setNewPost] = useState(
    blogToEdit || {
      title: "",
      content: "",
      image: null,
      isPublished: false,
      isPopular: false,
    }
  );
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(
    blogToEdit?.image
      ? `http://localhost:5555/uploads/${blogToEdit.image}`
      : null
  );

  useEffect(() => {
    if (blogToEdit) {
      setNewPost(blogToEdit);
      setPreviewImage(
        blogToEdit.image
          ? `http://localhost:5555/uploads/${blogToEdit.image}`
          : null
      );
    }
  }, [blogToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewPost({ ...newPost, [name]: checked });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", newPost.title);
      formData.append("content", newPost.content);
      formData.append("isPublished", newPost.isPublished ? "true" : "false");
      formData.append("isPopular", newPost.isPopular ? "true" : "false");
      if (newPost.image instanceof File) {
        formData.append("image", newPost.image);
      }

      if (blogToEdit) {
        await api.put(`/api/posts/${blogToEdit._id}`, formData);
      } else {
        await api.post("/api/posts", formData);
      }

      setNewPost({
        title: "",
        content: "",
        image: null,
        isPublished: false,
        isPopular: false,
      });
      setPreviewImage(null);
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
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Image</label>
        {previewImage && (
          <img src={previewImage} alt="Preview" className="mb-2 max-h-40" />
        )}
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border rounded"
        />
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={newPost.isPublished}
            onChange={handleCheckboxChange}
          />
          <span>Published</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isPopular"
            checked={newPost.isPopular}
            onChange={handleCheckboxChange}
          />
          <span>Popular</span>
        </label>
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
