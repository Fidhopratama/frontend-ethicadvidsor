import api from "./api";

// =========================
// 🔥 UPLOAD FILE
// =========================
export const uploadFile = async (file, type) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login ulang.");
  }

  if (!file) {
    throw new Error("File tidak ditemukan.");
  }

  if (!type) {
    throw new Error("Type belum dipilih.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type); // ✅ FIX: type harus dari parameter

  const res = await api.post("/upload", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      // ❌ JANGAN set Content-Type manual
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
      Accept: "application/json",
    },
  });

  return res.data;
};