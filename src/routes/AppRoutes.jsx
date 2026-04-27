import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// USER
import DashboardUser from "../pages/user/DashboardUser";
import Upload from "../pages/user/Upload";
import ESGScore from "../pages/user/ESGScore";

// ADMIN
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import Users from "../pages/admin/Users";
import UploadList from "../pages/admin/UploadList";

export default function AppRoutes() {
  return (
    <Routes>
      {/* AUTH */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route path="/dashboard" element={<DashboardUser />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/esg" element={<ESGScore />} />

      {/* ADMIN */}
      <Route path="/admin" element={<DashboardAdmin />} />
      <Route path="/admin/users" element={<Users />} />
      <Route path="/admin/uploads" element={<UploadList />} />

      {/* 404 */}
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}