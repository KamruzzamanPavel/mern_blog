import React from "react";

const Sidebar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-gray-800 text-white h-screen w-64 p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
      <ul>
        <li
          className={`p-3 hover:bg-gray-700 cursor-pointer ${
            activeTab === "blogs" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab("blogs")}
        >
          Blogs
        </li>
        <li
          className={`p-3 hover:bg-gray-700 cursor-pointer ${
            activeTab === "users" ? "bg-gray-700" : ""
          }`}
          onClick={() => setActiveTab("users")}
        >
          Users
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
