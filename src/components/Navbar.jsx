import React from "react";
import { Link } from "react-router-dom";

export default function Navbar(){
  return (
    <header className="w-full bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-crib-500">CRIB</Link>

        <div className="flex items-center gap-3">
          <input
            className="hidden md:block w-80 border rounded-lg px-3 py-2 bg-gray-50"
            placeholder="Search CRIB"
          />
          <nav className="flex items-center gap-3">
            <Link to="/notifications" className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100">Notifications</Link>
            <Link to="/messages" className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100">Messages</Link>
            <Link to="/profile" className="text-sm px-3 py-2 rounded-lg hover:bg-gray-100">Profile</Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
