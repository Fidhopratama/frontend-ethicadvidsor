import { Routes, Route, Navigate } from "react-router-dom";

// LANDING
import Landing from "../pages/Landing";

// AUTH
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
import EditAdmin from "../pages/admin/edit_admin";

export default function AppRoutes() {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Routes>
      {/* LANDING */}
      <Route path="/" element={<Landing />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* USER */}
      <Route
        path="/dashboard"
        element={
          token ? (
            <DashboardUser />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/upload"
        element={
          token ? (
            <Upload />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      <Route
        path="/esg"
        element={
          token ? (
            <ESGScore />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ADMIN DASHBOARD */}
      <Route
        path="/admin"
        element={
          token && user?.role === "admin" ? (
            <DashboardAdmin />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ADMIN USERS */}
      <Route
        path="/admin/users"
        element={
          token && user?.role === "admin" ? (
            <Users />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* EDIT USER */}
      <Route
        path="/admin/users/edit/:id"
        element={
          token && user?.role === "admin" ? (
            <EditAdmin />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* ADMIN UPLOADS */}
      <Route
        path="/admin/uploads"
        element={
          token && user?.role === "admin" ? (
            <UploadList />
          ) : (
            <Navigate to="/login" />
          )
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-slate-100">
            <div className="bg-white p-10 rounded-3xl shadow border border-slate-200 text-center">
              <h1 className="text-5xl font-bold text-red-500 mb-3">
                404
              </h1>

              <p className="text-slate-600">
                Halaman tidak ditemukan
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}