import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password });

      // simpan data
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      // 🔥 FIX REDIRECT
      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard"); // ✅ SUDAH SESUAI ROUTE
      }

    } catch (err) {
      console.error(err);
      alert("Login gagal");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-80">
        <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow">
          <h2 className="text-xl mb-4 font-bold text-center">Login</h2>

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full mb-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full mb-4 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 w-full rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-3">
          Belum punya akun?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}