import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import HeroSection from "../components/HeroSection";
import ReactPaginate from "react-paginate";
import Footer from "../components/Footer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0); // Changed to 0 to match ReactPaginate's zero-based index
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const limit = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `http://localhost:5555/api/posts?page=${page + 1}&limit=${limit}` // Adjusted for zero-based index
        );
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setError(null);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
        setPosts([]); // Clear posts on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [page, limit]);

  const handlePageChange = ({ selected }) => {
    setPage(selected); // Now directly using selected since we're zero-based
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-800 container mx-auto px-4 py-4  min-h-screen">
      <HeroSection />

      {/* Posts Section */}
      <section className="my-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(limit)].map((_, i) => (
              <div
                key={i}
                className="h-64 bg-gray-100 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : error ? (
          <div className="col-span-full text-center p-8 rounded-lg bg-red-50">
            <p className="text-red-500">{error}</p>
            <button
              onClick={() => setPage(0)} // Reset to first page
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Retry
            </button>
          </div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center p-8 rounded-lg bg-gray-50">
            <p className="text-gray-500 mb-2">No posts found</p>
            <button
              onClick={() => setPage(0)} // Reset to first page
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Refresh
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination - Only show if there are multiple pages */}
      {totalPages > 1 && !isLoading && !error && posts.length > 0 && (
        <div className="flex justify-center mt-12">
          <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            onPageChange={handlePageChange}
            forcePage={page} // Reflect current page
            containerClassName="flex items-center space-x-1"
            pageClassName="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
            activeClassName="bg-blue-500 text-white font-medium"
            previousClassName="p-2 rounded-full hover:bg-gray-100 transition"
            nextClassName="p-2 rounded-full hover:bg-gray-100 transition"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakClassName="px-2 text-gray-500"
            previousLabel={<FiChevronLeft className="w-5 h-5" />}
            nextLabel={<FiChevronRight className="w-5 h-5" />}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
