import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateBlog from "./CreateBlog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    setLoading(true);
    axios
      .get("http://localhost:5555/api/posts")
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blogs", err);
        setLoading(false);
      });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5555/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Error deleting blog", err);
      alert("Error deleting blog. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">All Blogs</h2>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-amber-600"
          onClick={() => setEditingBlog(true)}
        >
          Create Blog
        </button>
      </div>
      {editingBlog ? (
        <CreateBlog
          blogToEdit={editingBlog}
          cancelEdit={() => setEditingBlog(null)}
          refreshBlogs={fetchBlogs}
        />
      ) : (
        <>
          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg border">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="py-2 px-4 text-left">Title</th>
                    <th className="py-2 px-4 text-left">Author</th>
                    <th className="py-2 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="border-t">
                      <td className="py-2 px-4">{blog.title}</td>
                      <td className="py-2 px-4">{blog.user?.username}</td>
                      <td className="py-2 px-4 flex justify-center gap-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition"
                          onClick={() => setEditingBlog(blog)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                          onClick={() => handleDelete(blog._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blogs;
