import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  getUsers,
  deleteUser,
} from "../../services/adminService";

export default function Users() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();

      setUsers(res);
    } catch (err) {
      console.error("Gagal ambil users:", err);
    }
  };

  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Yakin ingin menghapus user ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUser(id);

      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Gagal hapus user");
    }
  };

  // =========================
  // EDIT USER
  // =========================

  const handleEdit = (id) => {
    navigate(`/admin/users/edit/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar role={user?.role} />

      {/* CONTENT */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6 md:p-8">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800">
              Manage User
            </h1>

            <p className="text-slate-500 mt-1">
              List of all EthicAdvisor users
            </p>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Name
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-600">
                      Role
                    </th>

                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-600">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >
                      <td className="px-6 py-5 font-medium text-slate-800">
                        {u.name}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {u.email}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            u.role === "admin"
                              ? "bg-cyan-100 text-cyan-700"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center justify-center gap-3">
                          {/* EDIT */}
                          <button
                            onClick={() => handleEdit(u.id)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl transition"
                          >
                            Edit
                          </button>

                          {/* DELETE */}
                          <button
                            onClick={() => handleDelete(u.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users.length === 0 && (
                <div className="p-10 text-center text-slate-500">
                  There are no users yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}