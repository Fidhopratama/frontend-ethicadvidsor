import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ role }) {
  const location = useLocation();

  // =========================
  // 🔥 AMBIL ROLE (PROPS + LOCALSTORAGE)
  // =========================
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const rawRole = role || storedUser.role || "";

  const normalizedRole = rawRole.toString().toLowerCase();

  const isActive = (path) => location.pathname === path;

  const menuClass = (path) =>
    `block px-4 py-3 rounded-xl transition font-medium ${
      isActive(path)
        ? "bg-cyan-500 text-white shadow"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <div className="w-64 bg-gray-950 text-white min-h-screen p-6 border-r border-gray-800">

      {/* =========================
          TITLE
      ========================= */}
      <h2 className="text-3xl font-bold text-cyan-400 mb-10">
        ETHICADVISOR
      </h2>

      {/* =========================
          USER MENU
      ========================= */}
      {normalizedRole === "user" && (
        <ul className="space-y-3">
          <li>
            <Link to="/dashboard" className={menuClass("/dashboard")}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/upload" className={menuClass("/upload")}>
              Upload File
            </Link>
          </li>
        </ul>
      )}

      {/* =========================
          ADMIN MENU
      ========================= */}
      {normalizedRole === "admin" && (
        <ul className="space-y-3">
          <li>
            <Link to="/admin" className={menuClass("/admin")}>
              Dashboard Admin
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={menuClass("/admin/users")}>
              Kelola User
            </Link>
          </li>
          <li>
            <Link to="/admin/uploads" className={menuClass("/admin/uploads")}>
              Kelola Upload
            </Link>
          </li>
        </ul>
      )}

      {/* =========================
          EMPTY ROLE HANDLING (SAFE)
      ========================= */}
      {!normalizedRole && (
        <div className="text-red-400 text-sm mt-4">
          User belum login / role tidak tersedia
        </div>
      )}

    </div>
  );
}