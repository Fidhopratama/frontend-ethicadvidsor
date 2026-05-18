import api from "./api";

// =========================
// 📊 DASHBOARD
// =========================
export const getAdminDashboard = async () => {
  const res = await api.get("/admin/dashboard");
  return res.data;
};

// =========================
// 👥 USERS
// =========================

// GET USERS
export const getUsers = async () => {
  const res = await api.get("/admin/users");
  return res.data;
};

// GET SINGLE USER
export const getUserById = async (id) => {
  const res = await api.get(`/admin/users/${id}`);
  return res.data;
};

// UPDATE USER
export const updateUser = async (id, data) => {
  const res = await api.put(`/admin/users/${id}`, data);
  return res.data;
};

// DELETE USER
export const deleteUser = async (id) => {
  const res = await api.delete(`/admin/users/${id}`);
  return res.data;
};

// =========================
// 📂 UPLOADS
// =========================

// GET ALL UPLOADS
export const getUploads = async () => {
  const res = await api.get("/admin/uploads");
  return res.data;
};

// GET SINGLE UPLOAD
export const getUploadById = async (id) => {
  const res = await api.get(`/admin/uploads/${id}`);
  return res.data;
};

// DELETE UPLOAD
export const deleteUpload = async (id) => {
  const res = await api.delete(`/admin/uploads/${id}`);
  return res.data;
};

// UPDATE UPLOAD
export const updateUpload = async (id, data) => {
  const res = await api.put(`/admin/uploads/${id}`, data);
  return res.data;
};

// =========================
// 📄 READ FILE
// =========================

// OPEN FILE URL
export const getFileUrl = (path) => {
  return `http://127.0.0.1:8000/storage/${path}`;
};