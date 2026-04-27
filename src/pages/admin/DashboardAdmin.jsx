import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import Card from "../../components/ui/Card";

export default function DashboardAdmin() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar role="admin" />

      <div className="flex-1">
        <Navbar user={user} />

        <div className="p-6">
          <h1 className="text-xl font-bold mb-6">
            Admin Panel ⚡
          </h1>

          <div className="grid grid-cols-3 gap-6">
            <Card title="Total Users" value="10" color="bg-yellow-500" />
            <Card title="Total Upload" value="25" color="bg-red-500" />
            <Card title="ESG Average" value="76" color="bg-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
}