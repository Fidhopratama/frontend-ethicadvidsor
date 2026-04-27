import { useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import Navbar from "../../components/layout/Navbar";
import { uploadFile } from "../../services/uploadService";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("finance");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  // =========================
  // FORMAT RUPIAH
  // =========================
  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID").format(num || 0);

  // =========================
  // UPLOAD
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Pilih file dulu!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", type);

    try {
      setLoading(true);

      const res = await uploadFile(formData);

      setReport(res.report || null);
      setFileName(file.name);
    } catch (err) {
      console.error(err);
      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // PDF EXPORT
  // =========================
  const downloadPDF = async () => {
    const element = document.getElementById("report");

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);

    pdf.save("report.pdf");
  };

  // =========================
  // CHART DATA SAFE
  // =========================
  const chartData =
    report?.chart?.labels?.length > 0
      ? report.chart.labels.map((label, i) => ({
          name: label,
          value: report.chart.values[i],
        }))
      : [];

  // =========================
  // STATUS COLOR
  // =========================
  const statusColor =
    report?.status === "green"
      ? "bg-green-500"
      : report?.status === "yellow"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 max-w-6xl mx-auto">

          {/* TITLE */}
          <h1 className="text-3xl font-bold mb-6">
            Financial & ESG Analyzer
          </h1>

          {/* =========================
              UPLOAD CARD
          ========================= */}
          <div className="bg-white p-6 rounded-xl shadow mb-8 max-w-md">
            <form onSubmit={handleSubmit} className="space-y-4">

              <select
                className="w-full border p-2 rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="finance">Finance</option>
                <option value="esg">ESG</option>
              </select>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                {loading ? "Processing..." : "Upload & Analyze"}
              </button>
            </form>
          </div>

          {/* =========================
              REPORT SECTION
          ========================= */}
          {fileName && (
            <div className="space-y-6">

              <div
                id="report"
                className="bg-white p-8 rounded-2xl shadow-lg border"
              >

                {/* HEADER */}
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-2xl font-bold">Official Report</h2>
                  <p className="text-sm text-gray-500">
                    File: {fileName}
                  </p>
                </div>

                {/* NO REPORT */}
                {!report && (
                  <p className="text-gray-500">
                    File uploaded (no analysis result)
                  </p>
                )}

                {/* REPORT CONTENT */}
                {report && (
                  <>
                    {/* STATUS */}
                    <div className={`${statusColor} text-white px-4 py-2 rounded mb-6`}>
                      ESG Score: {report.esg_score}
                    </div>

                    {/* SUMMARY */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p>Revenue</p>
                        <h3 className="text-green-600 font-bold">
                          Rp {formatRupiah(report.revenue)}
                        </h3>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p>Profit</p>
                        <h3 className="text-blue-600 font-bold">
                          Rp {formatRupiah(report.profit)}
                        </h3>
                      </div>
                    </div>

                    {/* RATIOS */}
                    <div className="space-y-4 mb-6">

                      <div>
                        <p>Profit Margin</p>
                        <div className="w-full bg-gray-200 h-3 rounded">
                          <div
                            className="bg-green-500 h-3 rounded"
                            style={{ width: `${report.profit_margin}%` }}
                          />
                        </div>
                        <span>{report.profit_margin}%</span>
                      </div>

                      <div>
                        <p>Debt Ratio</p>
                        <div className="w-full bg-gray-200 h-3 rounded">
                          <div
                            className="bg-red-500 h-3 rounded"
                            style={{ width: `${report.debt_ratio}%` }}
                          />
                        </div>
                        <span>{report.debt_ratio}%</span>
                      </div>
                    </div>

                    {/* =========================
                        CHART FIX
                    ========================= */}
                    <div className="w-full h-[300px] mb-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* ESG DETAIL */}
                    <div className="mb-6">
                      <h3 className="font-bold mb-2">ESG Breakdown</h3>
                      <p>Environment: {report.esg_detail.environment}</p>
                      <p>Social: {report.esg_detail.social}</p>
                      <p>Governance: {report.esg_detail.governance}</p>
                    </div>

                    {/* INSIGHT */}
                    <div className="bg-yellow-50 p-4 rounded-xl">
                      📌 {report.insight}
                    </div>
                  </>
                )}
              </div>

              {/* DOWNLOAD */}
              <button
                onClick={downloadPDF}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}