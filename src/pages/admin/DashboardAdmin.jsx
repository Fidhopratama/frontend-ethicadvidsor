import { useEffect, useState } from "react";
import {
  Users,
  Upload,
  Activity,
  ShieldCheck,
  RefreshCcw,
} from "lucide-react";

import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";

import { getAdminDashboard } from "../../services/adminService";

export default function DashboardAdmin() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getAdminDashboard();

      setData(res);
    } catch (err) {
      console.error("Gagal ambil data:", err);

      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DATA
  // =========================

  const totalUsers = data?.total_users ?? 0;
  const totalUploads = data?.total_uploads ?? 0;
  const finance = data?.finance ?? 0;
  const esg = data?.esg ?? 0;

  // =========================
  // STATUS
  // =========================

  const activity =
    totalUploads > 20
      ? "Aktif"
      : totalUploads > 10
      ? "Stabil"
      : "Rendah";

  const activityColor =
    totalUploads > 20
      ? "text-green-600 bg-green-50 border-green-200"
      : totalUploads > 10
      ? "text-yellow-600 bg-yellow-50 border-yellow-200"
      : "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* SIDEBAR */}
      <Sidebar role={user?.role} />

      {/* CONTENT */}
      <div className="flex-1">
        <Navbar />

        <div className="p-6 md:p-8 space-y-8">
          {/* HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">
                Dashboard Admin
              </h1>

              <p className="text-slate-500 mt-1">
                Monitoring performa sistem EthicAdvisor
              </p>
            </div>

            <button
              onClick={fetchData}
              className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 transition text-white px-5 py-3 rounded-2xl shadow-sm"
            >
              <RefreshCcw size={18} />
              Refresh Data
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 border border-slate-200 animate-pulse"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-200 mb-5" />

                  <div className="h-4 bg-slate-200 rounded w-24 mb-4" />

                  <div className="h-8 bg-slate-200 rounded w-20" />
                </div>
              ))}
            </div>
          ) : !data ? (
            <div className="bg-red-50 border border-red-200 text-red-600 p-5 rounded-2xl">
              Gagal memuat dashboard admin.
            </div>
          ) : (
            <>
              {/* STATS */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* USERS */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 flex items-center justify-center mb-5">
                    <Users className="text-cyan-600" size={28} />
                  </div>

                  <p className="text-slate-500 text-sm">Total Users</p>

                  <h2 className="text-4xl font-bold text-slate-800 mt-2">
                    {totalUsers}
                  </h2>

                  <p className="text-xs text-slate-400 mt-3">
                    Pengguna terdaftar dalam sistem
                  </p>
                </div>

                {/* UPLOAD */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-5">
                    <Upload className="text-violet-600" size={28} />
                  </div>

                  <p className="text-slate-500 text-sm">Total Upload</p>

                  <h2 className="text-4xl font-bold text-slate-800 mt-2">
                    {totalUploads}
                  </h2>

                  <p className="text-xs text-slate-400 mt-3">
                    Dokumen berhasil diupload
                  </p>
                </div>

                {/* FINANCE */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-5">
                    <Activity className="text-green-600" size={28} />
                  </div>

                  <p className="text-slate-500 text-sm">Finance</p>

                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                    {finance}%
                  </h2>

                  <p className="text-xs text-slate-400 mt-3">
                    Distribusi laporan finance
                  </p>
                </div>

                {/* ESG */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-5">
                    <ShieldCheck className="text-blue-600" size={28} />
                  </div>

                  <p className="text-slate-500 text-sm">ESG</p>

                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                    {esg}%
                  </h2>

                  <p className="text-xs text-slate-400 mt-3">
                    Distribusi laporan ESG
                  </p>
                </div>
              </div>

              {/* MIDDLE */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* DISTRIBUTION */}
                <div className="xl:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">
                        Document Distribution
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Statistik distribusi dokumen
                      </p>
                    </div>
                  </div>

                  {/* FINANCE */}
                  <div className="mb-8">
                    <div className="flex justify-between mb-3">
                      <span className="text-slate-600 font-medium">
                        Finance
                      </span>

                      <span className="font-bold text-slate-800">
                        {finance}%
                      </span>
                    </div>

                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-4 rounded-full bg-green-500 transition-all duration-700"
                        style={{ width: `${finance}%` }}
                      />
                    </div>
                  </div>

                  {/* ESG */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-slate-600 font-medium">ESG</span>

                      <span className="font-bold text-slate-800">
                        {esg}%
                      </span>
                    </div>

                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-4 rounded-full bg-blue-500 transition-all duration-700"
                        style={{ width: `${esg}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* STATUS */}
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
                  <h3 className="text-xl font-bold text-slate-800 mb-6">
                    System Status
                  </h3>

                  <div
                    className={`inline-flex px-5 py-3 rounded-2xl border text-sm font-semibold ${activityColor}`}
                  >
                    Aktivitas {activity}
                  </div>

                  <p className="text-slate-500 text-sm leading-relaxed mt-6">
                    {totalUploads > 20
                      ? "Aktivitas upload sangat tinggi dan sistem berjalan optimal."
                      : totalUploads > 10
                      ? "Penggunaan sistem cukup stabil dan aktif."
                      : "Aktivitas platform masih rendah dan perlu peningkatan."}
                  </p>

                  <div className="mt-8 border-t border-slate-100 pt-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-slate-500 text-sm">
                        Server Status
                      </span>

                      <span className="text-green-600 font-semibold text-sm">
                        Online
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500 text-sm">
                        API Response
                      </span>

                      <span className="text-cyan-600 font-semibold text-sm">
                        Stable
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <p className="text-slate-500 text-sm mb-3">
                    User Growth
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800">
                    +{totalUsers}
                  </h3>

                  <p className="text-xs text-slate-400 mt-3">
                    Pertumbuhan pengguna platform
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <p className="text-slate-500 text-sm mb-3">
                    Upload Activity
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800">
                    {totalUploads}
                  </h3>

                  <p className="text-xs text-slate-400 mt-3">
                    Aktivitas upload dokumen
                  </p>
                </div>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
                  <p className="text-slate-500 text-sm mb-3">
                    Platform Health
                  </p>

                  <h3 className="text-3xl font-bold text-slate-800">
                    {activity}
                  </h3>

                  <p className="text-xs text-slate-400 mt-3">
                    Kondisi performa platform
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}