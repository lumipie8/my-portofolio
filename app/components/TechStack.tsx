"use client";

import { motion } from "framer-motion";
import { 
  SiHtml5, 
  SiCss,
  SiJavascript, 
  SiReact, 
  SiNextdotjs, 
  SiFigma, 
  SiGit, 
  SiGithub, 
  SiVercel, 
  SiNetlify,
  SiGoogle
} from "react-icons/si";

const tools = [
  { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS3", icon: SiCss, color: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
  { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
  { name: "Netlify", icon: SiNetlify, color: "#00C7B7" },
  { name: "Gemini AI", icon: SiGoogle, color: "#8E75FF" },
];

export default function TechStack() {
  const duplicatedTools = [...tools, ...tools];

  return (
    <section className="py-12 border-t border-b border-white/10 bg-black/30 overflow-hidden select-none">
      <p className="text-center text-xs tracking-widest text-gray-400 uppercase mb-6 font-semibold">
        Tools & Technologies I Use
      </p>
      
      <div className="relative flex w-full overflow-hidden">
        <motion.div
          className="flex gap-8 items-center whitespace-nowrap min-w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
          }}
        >
          {duplicatedTools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all cursor-pointer group"
              >
                <Icon size={24} style={{ color: tool.color }} className="group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gray-300 group-hover:text-white">
                  {tool.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}