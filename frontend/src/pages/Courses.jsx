import { useState, useEffect } from "react";
import { API } from "../api";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", code: "", duration: "", teacher: "" });

  const fetchData = async () => {
    const tRes = await API.get("/teachers");
    const cRes = await API.get("/courses");
    setTeachers(tRes.data);
    setCourses(cRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    await API.post("/courses", form);
    setForm({ name: "", code: "", duration: "", teacher: "" });
    fetchData();
  };

  const handleDelete = async (id) => {
    await API.delete(`/courses/${id}`);
    fetchData();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-green-600 mb-4">Course Management</h2>

      <div className="flex flex-wrap gap-2 mb-4">
        <input placeholder="Course Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Code" value={form.code} onChange={(e)=>setForm({...form,code:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Duration" value={form.duration} onChange={(e)=>setForm({...form,duration:e.target.value})} className="border p-2 rounded"/>
        <select value={form.teacher} onChange={(e)=>setForm({...form,teacher:e.target.value})} className="border p-2 rounded">
          <option value="">Select Teacher</option>
          {teachers.map((t)=>(
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>
        <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Add Course</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-green-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Code</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c)=>(
            <tr key={c._id}>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.code}</td>
              <td className="border p-2">{c.duration}</td>
              <td className="border p-2">{c.teacher?.name}</td>
              <td className="border p-2">
                <button onClick={()=>handleDelete(c._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
