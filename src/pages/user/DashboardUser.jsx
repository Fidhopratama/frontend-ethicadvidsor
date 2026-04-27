import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Table from "../../components/Table";
import { getUploads } from "../../services/uploadService";

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

      setUploads(
        res.map((item) => ({
          File: item.file_name,
          Type: item.type,
        }))
      );

    } catch (err) {
      console.log(err);
      setUploads([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar user={user} />

        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard 👋
          </h1>

          {loading ? (
            <div className="text-gray-500">Loading data...</div>
          ) : (
            <>
              {/* CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Total Upload</p>
                  <h2 className="text-3xl font-bold">
                    {uploads.length}
                  </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">Finance</p>
                  <h2 className="text-3xl font-bold text-green-500">
                    {uploads.filter(u => u.Type === "finance").length}
                  </h2>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-gray-500 text-sm">ESG</p>
                  <h2 className="text-3xl font-bold text-blue-500">
                    {uploads.filter(u => u.Type === "esg").length}
                  </h2>
                </div>

              </div>

              {/* TABLE */}
              <div className="bg-white rounded-xl shadow p-5">
                <h2 className="font-semibold text-lg mb-4">
                  My Uploads
                </h2>

                <Table columns={["File", "Type"]} data={uploads} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}