import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h2 className="text-xl font-bold mb-8">
        ETHICADVISOR
      </h2>

      <ul className="space-y-4">
        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className="hover:text-gray-300 cursor-pointer">
          <Link to="/upload">Upload</Link>
        </li>

        {role === "admin" && (
          <li className="hover:text-gray-300 cursor-pointer">
            <Link to="/users">Users</Link>
          </li>
        )}
      </ul>
    </div>
  );
}