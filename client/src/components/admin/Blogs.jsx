import React, { useEffect, useState } from "react";
import CreateBlog from "./CreateBlog";
import ReactPaginate from "react-paginate";
import api from "../../utils/api";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchBlogs(page, filter);
    }, 300); // Debounce for 300ms

    return () => clearTimeout(timeout);
  }, [page, filter]);

  const fetchBlogs = (currentPage, selectedFilter = filter) => {
    setLoading(true);
    api
      .get(
        `/api/posts/admin?page=${currentPage}&&limit=5&filter=${selectedFilter}`
      )
      .then((res) => {
        // console.log(res.data.posts);

        setBlogs(res.data.posts);
        setTotalPages(res.data.totalPages);
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
      await api.delete(`/api/posts/${id}`);
      fetchBlogs(page); // Refresh current page
    } catch (err) {
      console.error("Error deleting blog", err);
      alert("Error deleting blog. Please try again.");
    }
  };

  const handlePageChange = ({ selected }) => {
    setPage(selected + 1); // react-paginate starts from 0, our API starts from 1
  };
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when changing filters
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">All Blogs</h2>
        <div>
          <select
            className="border px-3 py-2 rounded-lg mr-4"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value="">Show All</option>
            <option value="publishedPopular">Published & Popular</option>
            <option value="publishedUnpopular">Published & Unpopular</option>
            <option value="unpublishedPopular">Unpublished & Popular</option>
            <option value="unpublishedUnpopular">
              Unpublished & Unpopular
            </option>
          </select>
          <button
            className="text-gray-200 bg-blue-700 px-4 py-2 rounded-lg text-lg font-semibold hover:bg-blue-600"
            onClick={() => setEditingBlog(true)}
          >
            + Create Blog
          </button>
        </div>
      </div>

      {editingBlog ? (
        <CreateBlog
          blogToEdit={editingBlog}
          cancelEdit={() => setEditingBlog(null)}
          refreshBlogs={() => fetchBlogs(page)}
        />
      ) : (
        <>
          {loading ? (
            <p className="text-center text-lg">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              {blogs.length > 0 ? (
                <table className="min-w-full bg-white shadow-md rounded-lg border">
                  <thead>
                    <tr className="bg-gray-200 text-gray-700">
                      <th className="py-2 px-4 text-left">SN</th>
                      <th className="py-2 px-4 text-left">Title</th>
                      <th className="py-2 px-4 text-left">Author</th>
                      <th className="py-2 px-4 text-left">Image</th>
                      <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog, index) => (
                      <tr
                        key={blog._id}
                        className="border-t hover:bg-gray-100 transition-colors"
                      >
                        <td className="py-2 px-4">
                          {index + 1 + (page - 1) * 5}
                        </td>
                        <td className="py-2 px-4">
                          {blog.title.length > 25
                            ? blog.title.slice(0, 25) + "..."
                            : blog.title}
                        </td>
                        <td className="py-2 px-4">
                          {blog.user?.username || "N/A"}
                        </td>
                        <td className="py-2 px-4">
                          {blog.image ? (
                            <img
                              src={`http://localhost:5555/uploads/${blog.image}`}
                              alt={blog.title}
                              className="w-10 h-7 object-cover"
                            />
                          ) : (
                            "No Image"
                          )}
                        </td>
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
              ) : (
                <p className="text-center text-lg">No blogs found.</p>
              )}
            </div>
          )}

          {/* Pagination Component */}
          <div className="flex justify-center mt-6">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"flex gap-2"}
              pageClassName={"px-3 py-1 border rounded-lg bg-gray-100"}
              activeClassName={"bg-blue-500 text-white"}
              previousClassName={"px-3 py-1 border rounded-lg"}
              nextClassName={"px-3 py-1 border rounded-lg"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Blogs;
