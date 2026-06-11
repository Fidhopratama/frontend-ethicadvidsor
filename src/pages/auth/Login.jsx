import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email,
        password,
        role,
      });

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      if (res.user.role === "superadmin") {
        window.location.href = "/superadmin";
      } else if (res.user.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
      alert("Login gagal");
    }
  };

  return (    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* TOP BAR */}
      <div className="w-full bg-white border-b border-gray-200">
        <div className="w-full px-12 h-16 flex items-center justify-between">

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
                ETHICADVIDSOR
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

      {/* LOGIN CONTENT */}
      <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md">

          <form
            onSubmit={handleLogin}
            className="bg-white p-8 rounded-3xl shadow-lg border border-gray-200"
          >

            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img
                src="/logo_ub.png"
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">
              Portal Login
            </h2>

            <p className="text-sm text-gray-500 text-center mb-6">
              Silakan login sesuai hak akses
            </p>

            {/* ROLE */}
            <div className="grid grid-cols-3 gap-2 mb-5">

              <button
                type="button"
                onClick={() => setRole("admin")}
                className={`rounded-xl py-2 transition ${
                  role === "admin"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 bg-white text-gray-700"
                }`}
              >
                Admin
              </button>

              <button
                type="button"
                onClick={() => setRole("user")}
                className={`rounded-xl py-2 transition ${
                  role === "user"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 bg-white text-gray-700"
                }`}
              >
                User
              </button>

              <button
                type="button"
                onClick={() => setRole("superadmin")}
                className={`rounded-xl py-2 transition ${
                  role === "superadmin"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 bg-white text-gray-700"
                }`}
              >
                Super Admin
              </button>

            </div>

            {/* Username */}
            <input
              type="text"
              placeholder="Username / Email"
              className="border border-gray-300 p-3 w-full mb-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password */}
            <div className="relative mb-5">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="border border-gray-300 p-3 w-full rounded-xl pr-12 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 w-full rounded-xl transition font-semibold"
            >
              Login
            </button>

          </form>

          <div className="mt-4 text-center space-y-2">

            <p className="text-sm text-gray-600">
              Don't have an account yet?{" "}
              <span
                className="text-blue-600 cursor-pointer hover:underline font-medium"
                onClick={() => navigate("/register")}
              >
                Register
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