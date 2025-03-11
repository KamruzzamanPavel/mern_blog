import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="border p-4 rounded mb-2">
            <h3 className="font-semibold">{blog.title}</h3>
            <p>{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Blogs;
