import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-purple-600">
          CRIB
        </Link>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* Search (only when logged in) */}
          {user && (
            <input
              className="hidden md:block w-80 border rounded-lg px-3 py-2 bg-gray-50"
              placeholder="Search CRIB"
            />
          )}

          {/* Navigation */}
          {user && (
            <nav className="flex items-center gap-2">
              <Link
                to="/notifications"
                className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Notifications
              </Link>
              <Link
                to="/messages"
                className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Messages
              </Link>
            </nav>
          )}

          {/* AUTH ACTIONS */}
          {!user ? (
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* Profile */}
              <Link
                to={`/profile/${user.id}`}
                className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white"
              >
                👤
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold transition"
              >
                Logout
              </button>
            </div>
          )}

        </div>
      </div>
    </header>
  );
}
