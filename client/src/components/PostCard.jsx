import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/postdetail/${post._id}`);

  return (
    <article
      className="relative group rounded-lg overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-gray-900"
      onClick={handleClick}
      aria-label={`Post titled ${post.title}`}
      role="article"
    >
      {post.image && (
        <div className="w-full h-64 overflow-hidden">
          <img
            src={`http://localhost:5555/uploads/${post.image}`}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      )}

      {/* Text overlay with gradient - less opaque to show more image */}
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4">
        <h2 className="text-white text-xl font-bold mb-1 truncate">
          {post.title}
        </h2>
        <p className="text-gray-300 text-sm line-clamp-2">
          {post.content.length > 100
            ? `${post.content.substring(0, 100)}...`
            : post.content}
        </p>
        <small className="text-gray-400">By: {post.user?.username}</small>
      </div>

      {/* Read More hover effect */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
        <button
          className="text-white font-semibold bg-blue-600 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transform group-hover:scale-110 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          aria-label={`Read more about ${post.title}`}
        >
          Read More
        </button>
      </div>
    </article>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string,
    user: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
};

export default PostCard;
