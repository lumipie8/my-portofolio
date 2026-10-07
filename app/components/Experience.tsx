"use client";

import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

const experiences = [
  {
    company: "CODEPOLITAN",
    role: "Frontend Web Development Student",
    period: "Jul 2026 - Aug 2026",
    description:
      "Completed intensive courses on Computer Programming Fundamentals, Basic Algorithms, HTML5, CSS4, Terminal/CMD, and Advanced Git & Version Control.",
  },
  {
    company: "SMKN 8 Kota Serang/PT Japfa Comfeed Indonesia Tbk (Assessor)",
    role: "Vocational Competency Assessment",
    period: "Mar 2024",
    description:
      "Certified 'Highly Competent' in Office Administration Assessment. Tested in office software operations, document archiving, correspondence, and basic business communications.",
  },
  {
    company: "BPJS Ketenagakerjaan Serang",
    role: "Service & Administrative Intern",
    period: "Feb 2023 - May 2023",
    description:
      "Supported customer service operations by assisting participants with forms and daily data logging. Managed internal inventory requests using a digital cashier application, sorted retention archives for document disposal, and performed data entry in Microsoft Excel.",
  },
  {
    company: "Inspektorat Kabupaten Serang",
    role: "Administrative Intern",
    period: "Aug 2022 - Nov 2022",
    description:
      "Managed incoming mail administration by recording entries on agenda sheets and disposition forms. Distributed copied documents to target departments and maintained structured document archiving in Bantex folders based on chronological and numerical order.",
  },
];

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative w-full py-24 bg-[#080810] overflow-hidden border-t border-white/5">
      {/* 🌌 Ambient Background Konsisten */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '36px 36px'
          }} 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-900/10 rounded-full blur-[140px]" />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t("Experience", "Pengalaman")}
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            {t(
              "My journey in web development and administrative operational roles.",
              "Perjalanan saya dalam pengembangan web dan peran operasional administratif."
            )}
          </p>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md hover:border-white/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {exp.role}
                </h3>
                <p className="text-sm text-blue-400 font-medium mb-2">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-400 max-w-2xl">
                  {exp.description}
                </p>
              </div>
              <span className="text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full w-fit">
                {exp.period}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}