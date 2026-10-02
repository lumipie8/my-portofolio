"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-10 text-center">
        {t("Skills & Experience", "Keahlian & Pengalaman")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Currently Learning */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-blue-400 mb-4">
            {t("Currently Learning", "Sedang Dipelajari")}
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• HTML5 & CSS (Intermediate)</li>
            <li>• JavaScript Fundamentals</li>
            <li>• React & Next.js (Basics)</li>
          </ul>
        </div>

        {/* Tools & Workflow */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">
            {t("Tools & Workflow", "Alat & Alur Kerja")}
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• Git & GitHub</li>
            <li>• AI-Assisted Coding (Vibe Coding)</li>
            <li>• VS Code</li>
            <li>• Netlify / Vercel</li>
          </ul>
        </div>

        {/* Soft Skills */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold text-indigo-400 mb-4">
            {t("Skills & Ops", "Keahlian & Operasional")}
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>• {t("Digital Operations", "Operasional Digital")}</li>
            <li>• {t("Data Administration", "Administrasi Data")}</li>
            <li>• {t("Team Collaboration", "Kolaborasi Tim")}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}