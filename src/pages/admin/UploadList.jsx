import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import {
  getUploads,
  deleteUpload,
} from "../../services/adminService";

export default function UploadList() {
  const [uploads, setUploads] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchUploads();
  }, []);

  // =========================
  // FETCH UPLOADS
  // =========================
  const fetchUploads = async () => {
    try {
      const res = await getUploads();

      const data = res?.data || res || [];

      setUploads(data);
    } catch (err) {
      console.error("Gagal ambil upload:", err);
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus file ini?"
    );

    if (!confirmDelete) return;

    try {
      await deleteUpload(id);

      alert("Upload berhasil dihapus");

      fetchUploads();
    } catch (err) {
      console.error(err);

      alert("Gagal menghapus upload");
    }
  };

  // =========================
  // OPEN FILE
  // =========================
  const handleView = (filePath) => {
    window.open(
      `http://127.0.0.1:8000/storage/${filePath}`,
      "_blank"
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar role={user?.role} />

      <div className="flex-1">
        {/* NAVBAR */}
        <Navbar user={user} />

        <div className="p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Upload Management
              </h1>

              <p className="text-slate-500 mt-1">
                Manage all user uploaded files
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      User
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      File
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                      Type
                    </th>

                    <th className="text-center px-6 py-4 text-sm font-semibold text-slate-700">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {uploads.length > 0 ? (
                    uploads.map((u) => (
                      <tr
                        key={u.id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-800">
                              {u.user?.name || "-"}
                            </p>

                            <p className="text-sm text-slate-500">
                              {u.user?.email || "-"}
                            </p>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <p className="font-medium text-slate-700">
                            {u.file_name || "-"}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-xl text-xs font-semibold ${
                              u.type === "finance"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {u.type}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-3">
                            {/* VIEW */}
                            <button
                              onClick={() =>
                                handleView(u.file_path)
                              }
                              className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium transition"
                            >
                              View
                            </button>

                            {/* DELETE */}
                            <button
                              onClick={() =>
                                handleDelete(u.id)
                              }
                              className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-10 text-slate-500"
                      >
                        There are no uploaded files yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}