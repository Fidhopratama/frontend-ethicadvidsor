import api from "./api";

// 🔐 LOGIN
export const login = async (data) => {
  const res = await api.post("/login", data);
  return res.data;
};

// 🆕 REGISTER
export const register = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};