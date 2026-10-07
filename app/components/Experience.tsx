"use client";

import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function Experience() {
  const { t } = useLanguage();

  // Array experiences ditaruh di dalam fungsi agar bisa baca t()
  const experiences = [
    {
      company: "CODEPOLITAN",
      role: t(
        "Frontend Web Development Student",
        "Siswa Pengembangan Web Frontend",
      ),
      period: "Jul 2026 - Aug 2026",
      description: t(
        "Completed intensive courses on Computer Programming Fundamentals, Basic Algorithms, HTML5, CSS3, JavaScript, and React.",
        "Selesai mengikuti kursus intensif Dasar Pemrograman Komputer, Algoritma Dasar, HTML5, CSS3, JavaScript, dan React.",
      ),
    },
    {
      company: "SMKN 8 Kota Serang / PT Japfa Comfeed Indonesia Tbk",
      role: t("Vocational Competency Assessment", "Uji Kompetensi Keahlian"),
      period: "Mar 2024",
      description: t(
        "Certified 'Highly Competent' in Office Administration Assessment. Tested in office software operations, document archiving, correspondence, and basic business communications.",
        "Sertifikasi 'Sangat Kompeten' dalam Penilaian Administrasi Perkantoran. Diuji dalam pengoperasian perangkat lunak kantor, pengarsipan dokumen, korespondensi, dan komunikasi bisnis dasar.",
      ),
    },
    {
      company: "BPJS Ketenagakerjaan Serang",
      role: t(
        "Service & Administrative Intern",
        "Magang Layanan & Administrasi",
      ),
      period: "Feb 2023 – May 2023",
      description: t(
        "Supported customer service operations by assisting participants with forms and daily data logging. Managed internal inventory requests using a digital cashier application, sorted retention archives for document disposal, and performed data entry in Microsoft Excel.",
        "Mendukung operasional layanan pelanggan dengan membantu peserta mengisi formulir dan pencatatan data harian. Mengelola permintaan inventaris internal menggunakan aplikasi kasir digital, memilah arsip retensi untuk pemusnahan dokumen, serta melakukan entri data di Microsoft Excel.",
      ),
    },
    {
      company: "Inspektorat Kabupaten Serang",
      role: t("Administrative Intern", "Magang Administrasi"),
      period: "Aug 2022 – Nov 2022",
      description: t(
        "Managed incoming mail administration by recording entries on agenda sheets and disposition forms. Distributed copied documents to target departments and maintained structured document archiving in Bantex folders based on chronological and numerical order.",
        "Mengelola administrasi surat masuk dengan mencatat entri pada lembar agenda dan formulir disposisi. Mendistribusikan salinan dokumen ke dinas tujuan serta mengelola pengarsipan dokumen secara terstruktur di map Bantex berdasarkan urutan kronologis dan nomor.",
      ),
    },
  ];

  return (
    <section
      id="experience"
      className="max-w-6xl mx-auto px-6 py-20 border-t border-white/10"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          {t("Work Experience", "Pengalaman Kerja")}
        </h2>
      </motion.div>

      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col md:flex-row justify-between gap-4"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">{exp.role}</h3>
              <p className="text-sm text-blue-400 mb-3">{exp.company}</p>
              <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
                {exp.description}
              </p>
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap bg-white/5 px-3 py-1.5 rounded-full border border-white/10 h-fit w-fit">
              {exp.period}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
