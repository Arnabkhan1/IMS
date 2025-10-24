import { useState, useEffect } from "react";
import { API } from "../api";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "" });

  const fetchTeachers = async () => {
    const res = await API.get("/teachers");
    setTeachers(res.data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAdd = async () => {
    await API.post("/teachers", form);
    setForm({ name: "", email: "", phone: "", subject: "" });
    fetchTeachers();
  };

  const handleDelete = async (id) => {
    await API.delete(`/teachers/${id}`);
    fetchTeachers();
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-blue-600 mb-4">Teacher Management</h2>

      <div className="flex gap-2 mb-4">
        <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Phone" value={form.phone} onChange={(e)=>setForm({...form,phone:e.target.value})} className="border p-2 rounded"/>
        <input placeholder="Subject" value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})} className="border p-2 rounded"/>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-blue-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t)=>(
            <tr key={t._id}>
              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.email}</td>
              <td className="border p-2">{t.phone}</td>
              <td className="border p-2">{t.subject}</td>
              <td className="border p-2">
                <button onClick={()=>handleDelete(t._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
