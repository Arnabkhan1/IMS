import { useState } from "react";
import { API } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      alert("✅ Login successful!");
      window.location = "/dashboard";
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 m-2 w-72 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 m-2 w-72 rounded"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
      >
        Login
      </button>

      <p className="mt-4">
        Don’t have an account?{" "}
        <a href="/signup" className="text-blue-600 underline">
          Sign up here
        </a>
      </p>
    </div>
  );
}
