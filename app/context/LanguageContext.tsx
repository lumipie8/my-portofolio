"use client";

import React, { createContext, useContext, useState } from "react";

type Language = "EN" | "ID";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (en: string, id: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("EN");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "ID" : "EN"));
  };

  const t = (en: string, id: string) => (language === "EN" ? en : id);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}