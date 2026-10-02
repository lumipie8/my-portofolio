"use client";

import { useLanguage } from "../context/LanguageContext";
import Lanyard3D from "./Lanyard3D";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#080810]">
      {/* 🌌 LATAR BELAKANG FULL-WIDTH */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[350px] md:w-[600px] h-[350px] md:h-[600px] bg-purple-600/20 rounded-full blur-[140px]" />
        
        <div 
          className="absolute inset-0 opacity-40" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }} 
        />
      </div>

      {/* 📐 CONTENT CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 md:pt-32 pb-16 md:pb-20 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Kolom Kiri: Teks & Info (5/12) */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 hover:border-blue-500/40 transition-all duration-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-gray-300">
              {t("Open for collaboration & opportunities", "Terbuka untuk kolaborasi & peluang")}
            </span>
          </div>

          <p className="text-blue-400 font-medium text-sm md:text-base mb-3 tracking-wide">
            {t("Computer Science student · Frontend developer", "Mahasiswa Ilmu Komputer · Frontend Developer")}
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            {t("Hi, I'm", "Halo, Saya")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-500">
              Fayza Siti Rahmawati.
            </span>
          </h1>

          <p className="text-gray-400 text-base md:text-lg max-w-xl mb-8 leading-relaxed">
            {t(
              "I'm a Computer Science student who loves building interactive web interfaces and exploring modern tech. Currently learning frontend development step-by-step with HTML, CSS, JavaScript, and React while leveraging AI tools to accelerate my learning.",
              "Saya adalah mahasiswa Ilmu Komputer yang suka membangun antarmuka web interaktif dan mengeksplorasi teknologi modern. Saat ini sedang mempelajari pengembangan frontend langkah demi langkah dengan HTML, CSS, JavaScript, dan React sambil memanfaatkan alat AI untuk mempercepat proses belajar."
            )}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            <a
              href="#projects"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:scale-105"
            >
              {t("View projects", "Lihat Proyek")}
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto text-center px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-sm backdrop-blur-md transition-all duration-300 hover:scale-105"
            >
              {t("Get in touch", "Hubungi Saya")}
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full max-w-xl">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-blue-500/30 transition-all duration-300 group">
              <p className="text-xs text-gray-400 group-hover:text-blue-400 transition-colors">{t("Education", "Pendidikan")}</p>
              <p className="text-sm font-semibold text-white mt-1">Computer Science</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-purple-500/30 transition-all duration-300 group">
              <p className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors">{t("Focus Area", "Fokus Utama")}</p>
              <p className="text-sm font-semibold text-white mt-1">Frontend & UI/UX</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.07] hover:border-indigo-500/30 transition-all duration-300 group col-span-2 md:col-span-1">
              <p className="text-xs text-gray-400 group-hover:text-indigo-400 transition-colors">{t("Tech Stack", "Teknologi")}</p>
              <p className="text-sm font-semibold text-white mt-1">Next.js & React</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Card 3D Lanyard yang Lebih Besar (6/12) */}
        <div className="lg:col-span-6 h-[550px] sm:h-[650px] lg:h-[750px] w-full relative z-20 flex justify-center items-center">
          <Lanyard3D />
        </div>

      </div>
    </section>
  );
}