import CribWorld from "./components/CribWorld";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMood } from "./context/MoodContext";

import PulseLines from "./components/PulseLines";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import MoodSelector from "./components/MoodSelector";

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
  const { mood } = useMood();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 800);
    return () => clearTimeout(timer);
  }, [mood]);

  return (
    <CribWorld>
      <div className="min-h-screen">
        <PulseLines />
        <Navbar />
        <MoodSelector />

        <div className="flex flex-1">
          <Sidebar />

          <main className="flex-1 p-6">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/follow-requests" element={<FollowRequests />} />
              <Route path="*" element={<div>Page not found</div>} />
              <Route path="/world/:id" element={<World />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </CribWorld>
  );
}
