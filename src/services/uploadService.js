import api from "./api";

// =========================
// 🔥 UPLOAD FILE
// =========================
export const uploadFile = async (data) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login ulang.");
  }

  const res = await api.post("/upload", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// =========================
// 🔥 GET UPLOADS
// =========================
export const getUploads = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login ulang.");
  }

  const res = await api.get("/uploads", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};