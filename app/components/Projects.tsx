"use client";

import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Sistem Pakar Diagnosa Penyakit Tomat",
    description:
      "Aplikasi web berbasis sistem pakar untuk mendiagnosa penyakit pada tanaman tomat menggunakan metode Forward Chaining berdasarkan gejala tanaman.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveUrl: "https://sistem-pakar-tomat.vercel.app/",
    githubUrl:
      "https://github.com/lumipie8/SISTEM-PAKAR-DIAGNOSA-PENYAKIT-TOMAT-MENGGUNAKAN-FORWARD-CHAINING",
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section
      id="projects"
      className="relative w-full py-24 bg-[#080810] overflow-hidden border-t border-white/5"
    >
      {/* 🌌 Ambient Background Konsisten */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Konten Utama Projects */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("Featured Projects", "Proyek Unggulan")}
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            {t(
              "Some of the interactive web applications I have crafted recently.",
              "Beberapa aplikasi web interaktif yang telah saya buat baru-baru ini.",
            )}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-blue-500/30 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Stack List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(proj.techStack || []).map((tItem, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tItem}
                    </span>
                  ))}
                </div>

                {/* Action Links (Live Demo & GitHub) */}
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                      <span>Live Demo</span>
                      <span className="text-xs">↗</span>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white font-medium transition-colors"
                    >
                      <span>GitHub</span>
                      <span className="text-xs">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
