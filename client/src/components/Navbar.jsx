import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/auth";

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="text-lg font-bold">
        Tech Blog
      </Link>
      <div>
        {user ? (
          <>
            {user?.role === "admin" && (
              <Link to="/admin" className="mr-4">
                Admin
              </Link>
            )}
            <Link to="/profile" className="mr-4">
              Your Profile
            </Link>
            <button
              onClick={() => {
                logout();
                setUser(null);
              }}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/register" className="bg-green-500 px-3 py-1 rounded">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
