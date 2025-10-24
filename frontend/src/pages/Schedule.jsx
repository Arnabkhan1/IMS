import { useEffect, useState } from "react";
import { API } from "../api";

export default function Schedule() {
  const [form, setForm] = useState({
    course: "",
    teacher: "",
    date: "",
    startTime: "",
    endTime: "",
    room: "",
  });

  const [schedules, setSchedules] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const fetchAll = async () => {
    const resT = await API.get("/teachers");
    const resC = await API.get("/courses");
    const resS = await API.get("/schedules");
    setTeachers(resT.data);
    setCourses(resC.data);
    setSchedules(resS.data);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleAdd = async () => {
    try {
      await API.post("/schedules", form);
      setForm({ course: "", teacher: "", date: "", startTime: "", endTime: "", room: "" });
      fetchAll();
      alert("✅ Schedule Added");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add schedule");
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/schedules/${id}`);
    fetchAll();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Class Scheduling</h1>

      <div className="flex flex-wrap gap-2 mb-4 bg-gray-50 p-4 rounded">
        <select
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Course</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </select>

        <select
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="">Select Teacher</option>
          {teachers.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="time"
          value={form.startTime}
          onChange={(e) => setForm({ ...form, startTime: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          type="time"
          value={form.endTime}
          onChange={(e) => setForm({ ...form, endTime: e.target.value })}
          className="border p-2 rounded"
        />

        <input
          placeholder="Room"
          value={form.room}
          onChange={(e) => setForm({ ...form, room: e.target.value })}
          className="border p-2 rounded"
        />

        <button onClick={handleAdd} className="bg-purple-500 text-white px-4 py-2 rounded">
          Add Schedule
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-purple-100">
            <th className="border p-2">Course</th>
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Room</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr key={s._id}>
              <td className="border p-2">{s.course?.name}</td>
              <td className="border p-2">{s.teacher?.name}</td>
              <td className="border p-2">{s.date}</td>
              <td className="border p-2">
                {s.startTime} - {s.endTime}
              </td>
              <td className="border p-2">{s.room}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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
