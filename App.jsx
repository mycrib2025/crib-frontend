import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import MoodSelector from "./components/MoodSelector";
import { Routes, Route } from "react-router-dom";
import { useMood } from "./context/MoodContext";

export default function App() {
  const { mood } = useMood();

  return (
  <div className={`min-h-screen mood-bg mood-${mood}`}>
    <Navbar />
    <MoodSelector />

    <div className="flex flex-1">
      <Sidebar />

      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>

    <Footer />
  </div>
);