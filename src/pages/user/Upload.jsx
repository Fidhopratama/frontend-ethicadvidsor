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
  CartesianGrid,
} from "recharts";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [type, setType] = useState("finance");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID").format(num || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return alert("Pilih file dulu!");
    if (!type) return alert("Pilih type dulu!");

    try {
      setLoading(true);

      const res = await uploadFile(file, type);

      setReport(res.report || null);
      setFileName(file.name);
    } catch (err) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      alert("Upload gagal");
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    const element = document.getElementById("report");
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = 190;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth, imgHeight);
    pdf.save("report.pdf");
  };

  const chartData =
    report?.chart?.labels?.length > 0
      ? report.chart.labels.map((label, i) => ({
          name: label,
          value: report.chart.values[i],
        }))
      : [];

  const statusConfig =
    report?.status === "green"
      ? {
          bg: "bg-green-100",
          text: "text-green-700",
          badge: "Excellent",
        }
      : report?.status === "yellow"
      ? {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          badge: "Moderate",
        }
      : {
          bg: "bg-red-100",
          text: "text-red-700",
          badge: "Risk",
        };

  return (
    <div className="flex min-h-screen bg-[#f8fafc]">
      <Sidebar role="user" />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto space-y-8">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Financial & ESG Analyzer
            </h1>
            <p className="text-gray-500 mt-1">
              Upload laporan finance atau ESG untuk analisis otomatis dan export
              report siap audit.
            </p>
          </div>

          {/* TOP GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* UPLOAD CARD */}
            <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-1">Upload Document</h2>
              <p className="text-sm text-gray-500 mb-5">
                Pilih file dan tipe analisis
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Report Type
                  </label>
                  <select
                    className="w-full border border-gray-300 p-3 rounded-xl bg-white"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="finance">Finance</option>
                    <option value="esg">ESG</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Upload File
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border border-dashed border-gray-300 p-3 rounded-xl bg-gray-50"
                  />
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  {loading ? "Processing..." : "Upload & Analyze"}
                </button>
              </form>
            </div>

            {/* INFO CARD */}
            <div className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
              <h2 className="text-2xl font-bold mb-2">
                Report Analysis
              </h2>
              <p className="text-blue-100 max-w-2xl mb-6">
                Analisis otomatis laporan keuangan dan ESG untuk mengetahui
                performa bisnis, compliance, serta sustainability score secara
                cepat dan terstruktur.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  ["Auto Scan", "Instant"],
                  ["ESG Rating", "Smart"],
                  ["Audit Ready", "PDF"],
                  ["Charts", "Visual"],
                ].map((item, i) => (
                  <div
                    key={i}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
                  >
                    <p className="text-sm text-blue-100">{item[0]}</p>
                    <h3 className="text-xl font-bold">{item[1]}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* REPORT */}
          {fileName && (
            <div className="space-y-6">
              <div
                id="report"
                className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden"
              >
                {/* REPORT HEADER */}
                <div className="px-8 py-6 border-b bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Official Report
                      </h2>
                      <p className="text-sm text-gray-500">File: {fileName}</p>
                    </div>

                    {report && (
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium ${statusConfig.bg} ${statusConfig.text}`}
                      >
                        {statusConfig.badge}
                      </span>
                    )}
                  </div>
                </div>

                {!report && (
                  <div className="p-8 text-gray-500">
                    File uploaded successfully (no analysis result)
                  </div>
                )}

                {report && (
                  <div className="p-8 space-y-8">
                    {/* SCORE CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-50 p-5 rounded-2xl">
                        <p className="text-sm text-gray-500">ESG Score</p>
                        <h3 className="text-3xl font-bold text-green-600">
                          {report.esg_score}
                        </h3>
                      </div>

                      <div className="bg-gray-50 p-5 rounded-2xl">
                        <p className="text-sm text-gray-500">Revenue</p>
                        <h3 className="text-2xl font-bold text-blue-600">
                          Rp {formatRupiah(report.revenue)}
                        </h3>
                      </div>

                      <div className="bg-gray-50 p-5 rounded-2xl">
                        <p className="text-sm text-gray-500">Profit</p>
                        <h3 className="text-2xl font-bold text-emerald-600">
                          Rp {formatRupiah(report.profit)}
                        </h3>
                      </div>
                    </div>

                    {/* RATIOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Profit Margin</span>
                          <span>{report.profit_margin}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full">
                          <div
                            className="bg-green-500 h-3 rounded-full"
                            style={{ width: `${report.profit_margin}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2 text-sm">
                          <span>Debt Ratio</span>
                          <span>{report.debt_ratio}%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full">
                          <div
                            className="bg-red-500 h-3 rounded-full"
                            style={{ width: `${report.debt_ratio}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* CHART */}
                    <div className="bg-gray-50 rounded-2xl p-5">
                      <h3 className="font-semibold mb-4">Performance Chart</h3>
                      <div className="w-full h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* ESG BREAKDOWN */}
                    <div className="bg-gray-50 rounded-2xl p-5">
                      <h3 className="font-semibold mb-4">ESG Breakdown</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white rounded-xl border">
                          <p className="text-sm text-gray-500">Environment</p>
                          <h4 className="text-xl font-bold text-green-600">
                            {report.esg_detail.environment}
                          </h4>
                        </div>

                        <div className="p-4 bg-white rounded-xl border">
                          <p className="text-sm text-gray-500">Social</p>
                          <h4 className="text-xl font-bold text-blue-600">
                            {report.esg_detail.social}
                          </h4>
                        </div>

                        <div className="p-4 bg-white rounded-xl border">
                          <p className="text-sm text-gray-500">Governance</p>
                          <h4 className="text-xl font-bold text-purple-600">
                            {report.esg_detail.governance}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* INSIGHT */}
                    <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl">
                      <h3 className="font-semibold mb-2 text-yellow-800">
                       Insight
                      </h3>
                      <p className="text-yellow-700">{report.insight}</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={downloadPDF}
                className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-medium"
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