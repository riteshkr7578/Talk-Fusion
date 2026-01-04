import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-center">Login</h2>

      <input
        className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        className="w-full p-3 rounded bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
