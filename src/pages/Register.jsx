import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", form);
      alert("Profile created! 🌍");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 409) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed");
      }
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Your Crib</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-black text-white py-2 rounded">
            Enter Crib
          </button>
        </form>
      </div>
    </div>
  );
}
