import { useEffect, useState } from "react";
import { API } from "../api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "" });

  // Load all students
  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add new student
  const handleAdd = async () => {
    try {
      await API.post("/students", form);
      setForm({ name: "", email: "", phone: "", course: "" });
      fetchStudents();
      alert("✅ Student Added!");
    } catch (err) {
      alert(err.response?.data?.error || "Add failed");
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    await API.delete(`/students/${id}`);
    fetchStudents();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Student Management</h1>

      <div className="bg-gray-100 p-4 rounded mb-6 flex flex-wrap gap-2">
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="border p-2 rounded"
        />
        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Student
        </button>
      </div>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.name}</td>
              <td className="border p-2">{s.email}</td>
              <td className="border p-2">{s.phone}</td>
              <td className="border p-2">{s.course}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
