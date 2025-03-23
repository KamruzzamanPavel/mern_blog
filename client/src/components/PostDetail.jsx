import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5555/api/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching post details", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!post) {
    return <p className="text-center text-lg text-red-500">Post not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      {post.image && (
        <img
          src={`http://localhost:5555/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <small className="text-gray-500 block mb-4">
        By: {post.user?.username} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </small>
      <p className="text-lg text-gray-800">{post.content}</p>
      <button
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default PostDetail;
