import { useEffect, useState } from "react";
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

  const totalUsers = data?.total_users ?? 0;
  const totalUploads = data?.total_uploads ?? 0;
  const finance = data?.finance ?? 0;
  const esg = data?.esg ?? 0;

  const activity =
    totalUploads > 20 ? "Aktif" : totalUploads > 10 ? "Stabil" : "Rendah";

  const activityColor =
    totalUploads > 20
      ? "text-green-600 bg-green-50 border-green-200"
      : totalUploads > 10
      ? "text-yellow-600 bg-yellow-50 border-yellow-200"
      : "text-red-600 bg-red-50 border-red-200";

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar role={user?.role} />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 md:p-8 space-y-8">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Dashboard Admin
              </h1>
              <p className="text-gray-500 mt-1">
                Ringkasan performa sistem EthicAdvisor
              </p>
            </div>

            <button
              onClick={fetchData}
              className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
            >
              Refresh Data
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl border border-gray-200 p-6 animate-pulse"
                >
                  <div className="h-4 w-24 bg-gray-200 rounded mb-4" />
                  <div className="h-10 w-20 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : !data ? (
            <div className="bg-red-50 border border-red-200 text-red-600 p-5 rounded-2xl">
              Gagal memuat data dashboard.
            </div>
          ) : (
            <>
              {/* TOP CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h2 className="text-4xl font-bold text-gray-900 mt-2">
                    {totalUsers}
                  </h2>
                  <p className="text-xs text-gray-400 mt-2">
                    Total pengguna terdaftar
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Total Upload</p>
                  <h2 className="text-4xl font-bold text-gray-900 mt-2">
                    {totalUploads}
                  </h2>
                  <p className="text-xs text-gray-400 mt-2">
                    Total dokumen diunggah
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500">Finance</p>
                  <h2 className="text-4xl font-bold text-green-600 mt-2">
                    {finance}%
                  </h2>
                  <p className="text-xs text-gray-400 mt-2">
                    Persentase laporan finance
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500">ESG</p>
                  <h2 className="text-4xl font-bold text-blue-600 mt-2">
                    {esg}%
                  </h2>
                  <p className="text-xs text-gray-400 mt-2">
                    Persentase laporan ESG
                  </p>
                </div>
              </div>

              {/* MIDDLE GRID */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* DISTRIBUTION */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    Document Distribution
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Finance</span>
                        <span className="font-medium text-gray-800">
                          {finance}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-3 rounded-full bg-green-500 transition-all duration-700"
                          style={{ width: `${finance}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">ESG</span>
                        <span className="font-medium text-gray-800">
                          {esg}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-3 rounded-full bg-blue-500 transition-all duration-700"
                          style={{ width: `${esg}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* STATUS */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    System Status
                  </h3>

                  <div
                    className={`px-4 py-3 rounded-xl border text-sm font-medium inline-block ${activityColor}`}
                  >
                    Aktivitas {activity}
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed mt-4">
                    {totalUploads > 20
                      ? "Aktivitas upload tinggi dan sistem berjalan aktif dengan partisipasi user yang baik."
                      : totalUploads > 10
                      ? "Aktivitas sistem stabil dan penggunaan platform cukup konsisten."
                      : "Aktivitas user masih rendah, perlu peningkatan penggunaan platform."}
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">User Growth</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {totalUsers > 0 ? "+" + totalUsers : 0}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    Pertumbuhan pengguna terdaftar
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Upload Activity</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {totalUploads}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    Total aktivitas upload dokumen
                  </p>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <p className="text-sm text-gray-500 mb-2">Platform Health</p>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {activity}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2">
                    Status performa platform saat ini
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