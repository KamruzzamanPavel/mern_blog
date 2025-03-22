import React, { useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import Blogs from "../components/admin/Blogs";

import Users from "../components/admin/Users";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("blogs"); // State to manage active tab

  return (
    <div className="flex justify-between">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1 ">
        {/* Tabs */}

        {/* Render content based on active tab */}
        {activeTab === "blogs" && (
          <>
            <Blogs />
          </>
        )}

        {activeTab === "users" && (
          <>
            <Users />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
