import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token tidak ditemukan");
  return token;
};

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    Accept: "application/json",
  },
});

export const getAdminDashboard = async () => {
  const res = await axios.get(`${API_URL}/admin/dashboard`, authHeader());
  return res.data;
};

export const getUsers = async () => {
  const res = await axios.get(`${API_URL}/admin/users`, authHeader());
  return res.data;
};

export const getUploads = async () => {
  const res = await axios.get(`${API_URL}/admin/uploads`, authHeader());
  return res.data;
};