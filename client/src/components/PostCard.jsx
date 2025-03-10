import React from "react";

const PostCard = ({ post }) => {
  return (
    <div className="border p-4 rounded mb-4 shadow-md">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p>{post.content}</p>
      <small className="text-gray-500">By: {post.user?.username}</small>
    </div>
  );
};

export default PostCard;
