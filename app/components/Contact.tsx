"use client";

import { useLanguage } from "../context/LanguageContext";
import { SiGithub, SiGmail, SiWhatsapp } from "react-icons/si";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-6 py-24 border-t border-white/10 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
        {t("Let's Work Together", "Mari Bekerja Sama")}
      </h2>
      <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm md:text-base">
        {t(
          "Open for collaboration, opportunities, or discussions regarding frontend projects.",
          "Terbuka untuk kolaborasi, peluang kerja, atau diskusi seputar proyek frontend.",
        )}
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/lumipie8"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 text-white text-sm font-medium transition-colors"
        >
          <SiGithub size={18} /> GitHub
        </a>

        {/* Email */}
        <a
          href="mailto:fayzarahma0811@gmail.com"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600/20 border border-red-500/30 hover:border-red-500 text-red-300 text-sm font-medium transition-colors"
        >
          <SiGmail size={18} /> Email
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/6281388114960"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600/20 border border-green-500/30 hover:border-green-500 text-green-300 text-sm font-medium transition-colors"
        >
          <SiWhatsapp size={18} /> WhatsApp
        </a>
      </div>
    </section>
  );
}
