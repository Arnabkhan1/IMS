import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Dashboard</h1>
      <div className="space-y-3">
        <Link to="/students" className="text-blue-500 text-lg underline">Manage Students</Link><br/>
        <Link to="/teachers" className="text-green-500 text-lg underline">Manage Teachers</Link><br/>
        <Link to="/courses" className="text-indigo-500 text-lg underline">Manage Courses</Link><br/>
        <Link to="/schedule" className="text-purple-500 text-lg underline">Manage Schedule</Link>
      </div>
    </div>
  );
}
