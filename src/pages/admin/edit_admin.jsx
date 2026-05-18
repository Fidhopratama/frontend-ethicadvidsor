import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  getUsers,
  updateUser,
} from "../../services/adminService";

export default function EditUser() {
  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const users = await getUsers();

      const user = users.find((u) => u.id == id);

      if (!user) {
        alert("User tidak ditemukan");
        return navigate("/admin/users");
      }

      setForm({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } catch (err) {
      console.error(err);
      alert("Gagal mengambil data user");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, form);

      alert("User berhasil diupdate");

      navigate("/admin/users");
    } catch (err) {
      console.error(err);

      alert("Gagal update user");
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar role={currentUser?.role} />

      {/* CONTENT */}
      <div className="flex-1">
        <Navbar />

        <div className="p-8">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Edit User
            </h1>

            <p className="text-slate-500 mb-8">
              Update data user EthicAdvisor
            </p>

            {loading ? (
              <div className="text-center py-10 text-slate-500">
                Loading...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* NAME */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Name
                  </label>

                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>

                {/* ROLE */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700">
                    Role
                  </label>

                  <select
                    value={form.role}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role: e.target.value,
                      })
                    }
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="admin">Admin</option>

                    <option value="user">User</option>
                  </select>
                </div>

                {/* BUTTON */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl font-medium transition"
                  >
                    Update User
                  </button>

                  <button
                    type="button"
                    onClick={() => navigate("/admin/users")}
                    className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}