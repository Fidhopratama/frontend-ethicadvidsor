// src/components/layout/Navbar.jsx
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-gray-900 text-white px-6 py-4 shadow flex justify-between items-center border-b border-gray-800">
      <h1 className="text-lg font-semibold text-cyan-400">
        ETHICADVISOR
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-300">
          {user?.name || "User"}
        </span>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
}