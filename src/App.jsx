import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import CribWorld from "./components/CribWorld";
import PulseLines from "./components/PulseLines";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import MoodSelector from "./components/MoodSelector";
import ProtectedRoute from "./components/ProtectedRoute";

import { useMood } from "./context/MoodContext";

import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import FollowRequests from "./pages/FollowRequests";
import World from "./pages/World";

export default function App() {
  const location = useLocation();
  const { mood } = useMood();

  const [pulse, setPulse] = useState(false);
  const [user, setUser] = useState(null);

  // 🔐 Hide UI on auth pages
  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register";

  // 🔐 Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🌈 Mood pulse
  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 800);
    return () => clearTimeout(timer);
  }, [mood]);

  return (
    <CribWorld>
      <div className={`min-h-screen mood-bg mood-${mood}`}>
        <PulseLines pulse={pulse} />

        {/* Navbar always visible */}
        <Navbar user={user} setUser={setUser} />

        {/* Hide MoodSelector on login/register */}
        {!isAuthPage && <MoodSelector />}

        <div className="flex flex-1">
          {/* Hide Sidebar on login/register */}
          {!isAuthPage && <Sidebar />}

          <main className="flex-1 p-6">
            <Routes>
              {/* PUBLIC */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* PROTECTED */}
              <Route
                path="/"
                element={
                  <ProtectedRoute user={user}>
                    <Feed />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile/:id"
                element={
                  <ProtectedRoute user={user}>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute user={user}>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/messages"
                element={
                  <ProtectedRoute user={user}>
                    <Messages />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/notifications"
                element={
                  <ProtectedRoute user={user}>
                    <Notifications />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/follow-requests"
                element={
                  <ProtectedRoute user={user}>
                    <FollowRequests />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/world/:id"
                element={
                  <ProtectedRoute user={user}>
                    <World />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </CribWorld>
  );
}
