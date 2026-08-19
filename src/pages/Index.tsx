import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Process from "@/components/Process";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Impact from "@/components/Impact";
import AIPractice from "@/components/AIPractice";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden selection:bg-emerald-500/30 selection:text-white bg-[#08090C] text-slate-100">
      {/* Ambient Mouse Tracker Background */}
      <div className="pointer-events-none fixed inset-0 z-30 mouse-glow mix-blend-screen opacity-50"></div>

      {/* Background Grid */}
      <div className="pointer-events-none fixed inset-0 z-[-1] grid-bg grid-fade opacity-30"></div>
      
      {/* Ambient Emerald Orbs (Static Base) */}
      <div className="pointer-events-none fixed top-[-10%] left-[-10%] z-[-2] h-[600px] w-[600px] rounded-full opacity-20 float-soft mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 60%)' }}></div>
      <div className="pointer-events-none fixed top-[20%] right-[-10%] z-[-2] h-[500px] w-[500px] rounded-full opacity-15 float-delayed mix-blend-screen" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 60%)' }}></div>

      <Navigation />
      
      <main>
        <Hero />
        <Process />
        <About />
        <Experience />
        <Projects />
        <AIPractice />
        <Impact />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
