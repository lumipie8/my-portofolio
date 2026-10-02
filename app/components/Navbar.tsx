"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 flex justify-center px-3 md:px-4">
      <nav className="w-full max-w-3xl px-4 md:px-6 py-2.5 md:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between gap-2 md:gap-4 transition-all duration-300 hover:border-white/20">
        
        {/* Logo / Brand Name */}
        <a href="#" className="text-base md:text-lg font-bold text-white tracking-wider hover:text-blue-400 transition-colors shrink-0">
          Fayza<span className="text-blue-500">.</span>
        </a>

        {/* Navigation Links (Scrollable halus di Mobile, normal di Desktop) */}
        <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm font-medium text-gray-300 overflow-x-auto no-scrollbar py-1 px-1">
          <a href="#experience" className="hover:text-white transition-colors whitespace-nowrap">
            Experience
          </a>
          <a href="#projects" className="hover:text-white transition-colors whitespace-nowrap">
            Projects
          </a>
          <a href="#skills" className="hover:text-white transition-colors whitespace-nowrap">
            Skills
          </a>
          <a href="#contact" className="hover:text-white transition-colors whitespace-nowrap">
            Contact
          </a>
        </div>

        {/* Language Switcher */}
        <button
          onClick={toggleLanguage}
          className="text-xs font-semibold px-2.5 md:px-3 py-1 md:py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all duration-300 active:scale-95 shrink-0"
        >
          {language === "EN" ? "ID" : "EN"}
        </button>
      </nav>
    </header>
  );
}