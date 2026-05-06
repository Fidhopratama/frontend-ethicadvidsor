import { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Table from "../../components/Table";
import { getUsers } from "../../services/adminService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();

      setUsers(
        res.map((u) => ({
          Name: u.name,
          Email: u.email,
          Role: u.role,
        }))
      );
    } catch (err) {
      console.error("Gagal ambil users:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role={user?.role} />

      <div className="flex-1">
        <Navbar />

        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Total Users</h1>

          <div className="bg-white p-5 rounded-xl shadow">
            <Table columns={["Name", "Email", "Role"]} data={users} />
          </div>
        </div>
      </div>
    </div>
  );
}