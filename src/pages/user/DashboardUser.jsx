import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Table from "../../components/Table";
import { getUploads } from "../../services/uploadService";
import {
  FileText,
  Leaf,
  Wallet,
  RefreshCw,
  UploadCloud,
  BarChart3,
  FileSearch,
} from "lucide-react";

export default function DashboardUser() {
  const [uploads, setUploads] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      setLoading(true);

      const res = await getUploads();

      const data = Array.isArray(res) ? res : res?.data || [];

      const mapped = data.map((item) => ({
        File: item.file_name || "-",
        Type: item.type || "-",
        Date: item.created_at
          ? new Date(item.created_at).toLocaleDateString("id-ID")
          : "-",
      }));

      setUploads(mapped);
    } catch (err) {
      console.log("Fetch error:", err);
      setUploads([]);
    } finally {
      setLoading(false);
    }
  };

  const total = uploads.length;
  const finance = uploads.filter((u) => u.Type === "finance").length;
  const esg = uploads.filter((u) => u.Type === "esg").length;
  const latestUploads = uploads.slice(0, 4);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar user={user} />

        <div className="p-6 space-y-6">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Dashboard User
            </h1>
            <p className="text-sm text-gray-500">
              Monitor upload file, analisis ESG, dan laporan anda.
            </p>
          </div>

          {loading ? (
            <div className="text-gray-500">Loading data...</div>
          ) : (
            <>
              {/* WELCOME BANNER */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <h2 className="text-2xl font-bold mb-1">
                  Welcome back, {user?.name || "User"} 
                </h2>
                <p className="text-sm text-green-50">
                  Kelola laporan ESG dan Financial anda dengan lebih cepat,
                  terstruktur, dan siap audit.
                </p>
              </div>

              {/* STAT CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Total Upload</p>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {total}
                      </h2>
                    </div>
                    <div className="p-3 rounded-xl bg-gray-100">
                      <FileText className="w-6 h-6 text-gray-700" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Finance</p>
                      <h2 className="text-3xl font-bold text-green-600">
                        {finance}
                      </h2>
                    </div>
                    <div className="p-3 rounded-xl bg-green-100">
                      <Wallet className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">ESG</p>
                      <h2 className="text-3xl font-bold text-blue-600">
                        {esg}
                      </h2>
                    </div>
                    <div className="p-3 rounded-xl bg-blue-100">
                      <Leaf className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* QUICK ACTION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <button className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition text-left">
                  <UploadCloud className="w-8 h-8 text-green-600 mb-3" />
                  <h3 className="font-semibold text-gray-800">Upload Report</h3>
                  <p className="text-sm text-gray-500">
                    Add a new file for analysis
                  </p>
                </button>

                <button className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition text-left">
                  <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
                  <h3 className="font-semibold text-gray-800">View Analytics</h3>
                  <p className="text-sm text-gray-500">
                    View ESG & financial metrics
                  </p>
                </button>

                <button className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition text-left">
                  <FileSearch className="w-8 h-8 text-purple-600 mb-3" />
                  <h3 className="font-semibold text-gray-800">Generate Report</h3>
                  <p className="text-sm text-gray-500">
                    Export report ready for audit
                  </p>
                </button>
              </div>

              {/* EMPTY STATE */}
              {total === 0 && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-xl">
                   There is no uploaded data yet. Please upload a report first.
                </div>
              )}

              {/* RECENT ACTIVITY */}
              {total > 0 && (
                <div className="bg-white rounded-2xl shadow p-5">
                  <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {latestUploads.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b pb-3 last:border-none"
                      >
                        <div>
                          <p className="font-medium text-gray-800">{item.File}</p>
                          <p className="text-sm text-gray-500">
                            {item.Type.toUpperCase()} • {item.Date}
                          </p>
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                          Uploaded
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TABLE */}
              {total > 0 && (
                <div className="bg-white rounded-2xl shadow p-5">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">My Uploads</h2>

                    <button
                      onClick={fetchUploads}
                      className="flex items-center gap-2 text-sm bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refresh
                    </button>
                  </div>

                  <Table columns={["File", "Type", "Date"]} data={uploads} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}