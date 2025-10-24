import { useState } from "react";
import { API } from "../api";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", form);
      alert("✅ Signup successful! You can now login.");
      window.location = "/";
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-green-700 mb-6">Sign Up</h2>

      <input
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="border p-2 m-2 w-72 rounded"
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="border p-2 m-2 w-72 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="border p-2 m-2 w-72 rounded"
      />

      <select
        onChange={(e) => setForm({ ...form, role: e.target.value })}
        className="border p-2 m-2 w-72 rounded"
      >
        <option>student</option>
        <option>teacher</option>
        <option>admin</option>
      </select>

      <button
        onClick={handleSignup}
        className="bg-green-500 text-white px-4 py-2 rounded mt-3"
      >
        Sign Up
      </button>

      <p className="mt-4">
        Already have an account?{" "}
        <a href="/" className="text-green-600 underline">
          Login here
        </a>
      </p>
    </div>
  );
}
