// src/routes/AppRoutes.jsx
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
        element={token ? <DashboardUser /> : <Navigate to="/login" />}
      />
      <Route
        path="/upload"
        element={token ? <Upload /> : <Navigate to="/login" />}
      />
      <Route
        path="/esg"
        element={token ? <ESGScore /> : <Navigate to="/login" />}
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          token && user?.role === "admin"
            ? <DashboardAdmin />
            : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/users"
        element={
          token && user?.role === "admin"
            ? <Users />
            : <Navigate to="/login" />
        }
      />
      <Route
        path="/admin/uploads"
        element={
          token && user?.role === "admin"
            ? <UploadList />
            : <Navigate to="/login" />
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <h1 className="text-center mt-10 text-2xl">
            404 Not Found
          </h1>
        }
      />
    </Routes>
  );
}