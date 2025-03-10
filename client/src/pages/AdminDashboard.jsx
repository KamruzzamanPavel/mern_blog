import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  // Fetch posts when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:5555/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Error fetching posts", err));
  }, []);

  // Handle input changes for new post
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Handle form submission to create a new post
  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // POST request to create a new post
      const response = await axios.post(
        "http://localhost:5555/api/posts",
        newPost,
        config
      );

      // On successful post creation, update the posts list
      setPosts([...posts, response.data]);
      setNewPost({ title: "", content: "" }); // Reset the form fields
      alert("Post created successfully!");
    } catch (err) {
      console.error("Error creating post", err);
      alert("Error creating post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Form to create a new post */}
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
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {/* Display the list of posts */}
      {posts.map((post) => (
        <div key={post._id} className="border p-4 rounded mb-2">
          <h2 className="font-semibold">{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
