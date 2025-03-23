import React from "react";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  console.log(post);

  return (
    <div className="border p-4 rounded mb-4 shadow-md bg-white">
      {post.image && (
        <img
          src={`http://localhost:5555/uploads/${post.image}`}
          alt={post.title}
          className="w-full h-48 object-cover rounded-md mb-3"
        />
      )}
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="text-gray-700">
        {post.content.length > 100
          ? `${post.content.substring(0, 100)}...`
          : post.content}
      </p>
      <small className="text-gray-500 block mb-2">
        By: {post.user?.username}
      </small>
      <button
        className="text-blue-500 font-semibold hover:underline"
        onClick={() => navigate(`/postdetail/${post._id}`)}
      >
        Read More
      </button>
    </div>
  );
};

export default PostCard;
