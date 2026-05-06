import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Landing() {
  const navigate = useNavigate();

  const [score, setScore] = useState(87);
  const [openFaq, setOpenFaq] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(84 + Math.floor(Math.random() * 8));
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenu(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Features", id: "features" },
    { label: "Metrics", id: "metrics" },
    { label: "FAQ", id: "faq" },
  ];

  const faqItems = [
    {
      q: "Apa fungsi utama EthicAdvisor?",
      a: "EthicAdvisor membantu monitoring ESG, analisis laporan keuangan, compliance OJK/BI, dan generate report otomatis dalam satu dashboard.",
    },
    {
      q: "Apakah sistem ini mendukung ESG reporting?",
      a: "Ya. Sistem mendukung monitoring ESG score, compliance status, dan sustainability metrics secara real-time.",
    },
    {
      q: "Apakah laporan bisa digunakan untuk audit?",
      a: "Bisa. Output sistem dirancang agar siap audit, mudah ditinjau, dan membantu proses pelaporan compliance.",
    },
    {
      q: "Siapa yang cocok menggunakan sistem ini?",
      a: "Cocok untuk FinTech, startup digital, analis keuangan, auditor internal, dan tim compliance.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fc] text-[#111827] overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-20">
            <div
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src="/logo_ub.png"
                alt="Logo UB"
                className="w-11 h-11 object-contain"
              />
              <div>
                <h1 className="text-lg md:text-xl font-bold tracking-tight">
                  EthicAdvisor
                </h1>
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
                  ESG & Financial System
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm font-medium text-gray-500 hover:text-black transition"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-100 transition"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-5 py-2.5 rounded-full bg-[#111827] text-white text-sm font-medium hover:opacity-90 transition"
              >
                Get Started
              </button>
            </div>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden text-2xl"
            >
              {mobileMenu ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden px-4 pb-4 bg-white border-t border-gray-200 space-y-3">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-3 text-sm font-medium text-gray-700"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="min-h-screen flex items-center pt-28 md:pt-32 px-4 md:px-8"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-medium text-gray-600 mb-6">
              ESG • Compliance • Financial System
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6">
              Smart ESG &
              <br />
              Financial System
            </h1>

            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mb-8">
              Platform modern untuk monitoring ESG, compliance OJK/BI, analisis
              laporan keuangan, dan audit-ready reporting dalam satu dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/register")}
                className="px-6 py-3 rounded-full bg-[#111827] text-white font-medium hover:opacity-90 transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 rounded-full border border-gray-300 font-medium hover:bg-white transition"
              >
                Login
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-[40px] bg-gradient-to-br from-white to-[#eef2ff] p-4 md:p-5 shadow-2xl border border-gray-200">
              <video
                src="/building2_long (1) (2).mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[520px] object-cover rounded-[30px]"
              />

              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

              <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md shadow-xl rounded-3xl px-5 py-4 border border-gray-200">
                <p className="text-xs text-gray-500">Compliance</p>
                <h3 className="text-xl font-bold">96%</h3>
              </div>

              <div className="absolute bottom-10 left-10 bg-white/95 backdrop-blur-md shadow-xl rounded-3xl px-5 py-4 border border-gray-200">
                <p className="text-xs text-gray-500">ESG Score</p>
                <h3 className="text-xl font-bold">{score}</h3>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">About EthicAdvisor</h2>
          <p className="max-w-3xl mx-auto text-gray-500 text-lg leading-relaxed">
            EthicAdvisor adalah platform ESG dan financial system modern
            untuk membantu perusahaan memantau sustainability performance,
            compliance, dan reporting secara real-time dalam satu sistem.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              [
                "ESG Dashboard",
                "Monitoring ESG real-time dan sustainability score.",
              ],
              [
                "Analysis",
                "Analisis laporan keuangan otomatis dan cepat.",
              ],
              [
                "Compliance Report",
                "Generate laporan audit-ready OJK & BI.",
              ],
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm hover:shadow-xl transition"
              >
                <h3 className="text-xl font-semibold mb-3">{item[0]}</h3>
                <p className="text-gray-500">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section id="metrics" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">Live Metrics</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              ["87", "ESG Score"],
              ["96%", "Compliance"],
              ["1240+", "Reports"],
              ["2 Goals", "SDGs"],
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 text-center border border-gray-200 shadow-sm"
              >
                <h3 className="text-3xl font-bold mb-2">{item[0]}</h3>
                <p className="text-gray-500 text-sm">{item[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-14">FAQ</h2>

          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <span className="font-semibold">{item.q}</span>
                  <span>{openFaq === i ? "−" : "+"}</span>
                </button>

                {openFaq === i && (
                  <div className="px-6 pb-5 text-gray-500">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-center bg-white rounded-[40px] border border-gray-200 shadow-sm p-10 md:p-16">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Build ESG Compliance?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Bangun sistem ESG modern dengan dashboard interaktif, transparan,
            dan siap audit.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-3 rounded-full bg-[#111827] text-white font-medium"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-sm text-gray-500">
        © 2026 EthicAdvisor — Universitas Brawijaya
      </footer>
    </div>
  );
}