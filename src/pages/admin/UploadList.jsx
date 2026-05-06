import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Table from "../../components/Table";
import { getUploads } from "../../services/adminService";

export default function UploadList() {
  const [uploads, setUploads] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchUploads();
  }, []);

  // =========================
  // 🔥 FETCH UPLOADS FIXED
  // =========================
  const fetchUploads = async () => {
    try {
      const res = await getUploads();

      // 🔥 HANDLE BERBAGAI SHAPE RESPONSE
      const data = res?.data || res || [];

      setUploads(
        data.map((u) => ({
          User: u.user?.name || "-",
          File: u.file_name || "-",
          Type: u.type || "-",
        }))
      );
    } catch (err) {
      console.error("Gagal ambil upload:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar role={user?.role} />

      <div className="flex-1">

        {/* NAVBAR */}
        <Navbar user={user} />

        <div className="p-6">

          <h1 className="text-2xl font-bold mb-6">
            Total Uploads 
          </h1>

          <div className="bg-white p-5 rounded-xl shadow">

            {/* TABLE */}
            <Table
              columns={["User", "File", "Type"]}
              data={uploads}
            />

          </div>

        </div>
      </div>
    </div>
  );
}