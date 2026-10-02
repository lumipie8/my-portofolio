import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import TechStack from "./components/TechStack";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <LanguageProvider>
      <main className="relative min-h-screen bg-[#0a0a0c] text-white overflow-hidden">
        <Navbar />
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <TechStack />
        <Contact />
        <Footer />
      </main>
    </LanguageProvider>
  );
}