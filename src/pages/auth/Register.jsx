import { useState } from "react";
import { register } from "../../services/authService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(form);
      alert("Register berhasil 🔥");
      navigate("/login");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Register gagal");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* TOP BAR */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/logo_ub.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />
            <div>
              <h1 className="text-base font-bold text-gray-800">
                EthicAdvisor
              </h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                ESG Intelligence Platform
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleRegister}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200"
          >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              Sign up to start using the system
            </p>

            <input
              type="text"
              placeholder="Nama lengkap"
              className="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />

            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 p-3 w-full mb-5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
            />

            <button className="bg-slate-900 text-white px-4 py-3 w-full rounded-xl hover:bg-slate-800 transition font-medium">
              Register
            </button>
          </form>

          {/* FOOTER */}
          <div className="mt-4 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline font-medium"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>

            <p
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
            >
              ← Back to Home
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}