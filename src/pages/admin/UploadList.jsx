import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Table from "../../components/Table";
import { getUploads } from "../../services/uploadService";

export default function UploadList() {
  const [uploads, setUploads] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUploads();
  }, []);

  const fetchUploads = async () => {
    try {
      const res = await getUploads();

      // rapihin data
      const formatted = res.map((item) => ({
        ID: item.id,
        User: item.user?.name || "-",
        File: item.file_name,
        Type: item.type,
      }));

      setUploads(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar user={user} />

        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">
            📁 Upload Management
          </h1>

          <Table
            columns={["ID", "User", "File", "Type"]}
            data={uploads}
          />
        </div>
      </div>
    </div>
  );
}