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
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
      alert("Register gagal");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow space-y-4">
        <h2 className="text-xl">Register</h2>

        <input
          type="text"
          placeholder="Nama"
          className="border p-2 w-full"
          onChange={(e) => setForm({...form, name: e.target.value})}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />

        <button className="bg-blue-500 text-white px-4 py-2 w-full">
          Register
        </button>
      </form>
    </div>
  );
}