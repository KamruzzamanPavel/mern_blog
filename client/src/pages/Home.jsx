import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios
      .get(`http://localhost:5555/api/posts?page=${page}&limit=${limit}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => console.error("Error fetching posts:", err));
  }, [page, limit]); // ✅ Added limit as dependency

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Recent Blog Posts
      </h1>

      {/* Render Posts */}
      <div className="space-y-6 flex flex-col">
        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            containerClassName="flex space-x-2 bg-white shadow-lg rounded-xl p-2"
            previousClassName="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            nextClassName="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300"
            pageClassName="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
            activeClassName="bg-sky-500 text-white font-bold shadow-md"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="px-4 py-2 text-gray-500"
            previousLabel="← Prev"
            nextLabel="Next →"
          />
        </div>
      )}
    </div>
  );
};

export default Home;
