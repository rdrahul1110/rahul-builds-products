import { useState } from "react";
import { Edit, ArrowRight, Download, MapPin, Linkedin, Mail } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { EditHeroDialog } from "./EditDialogs";

const Hero = () => {
  const { isAdminMode } = useAdmin();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const processSteps = [
    { id: 1, name: "DISCOVER", desc: "User interviews, workflow observation, and stakeholder context." },
    { id: 2, name: "FRAME", desc: "Journey maps, problem statements, constraints, and outcomes." },
    { id: 3, name: "PRIORITIZE", desc: "Impact, effort, and sequencing around the core user job." },
    { id: 4, name: "BUILD", desc: "PRDs, prototypes, AI workflows, and sprint collaboration." },
    { id: 5, name: "MEASURE", desc: "Instrumentation, adoption, and iterative learning." }
  ];

  return (
    <div className="pt-32 pb-10 sm:pt-40 sm:pb-14 overflow-hidden relative">
      {isAdminMode && (
        <>
          <button
            onClick={() => setEditDialogOpen(true)}
            className="absolute top-32 right-8 z-50 p-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg hover-lift flex items-center gap-2"
          >
            <Edit className="h-5 w-5" />
            Edit Hero
          </button>
          <EditHeroDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />
        </>
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="max-w-2xl">
            {/* Live telemetry ticker */}
            <div className="max-w-xl overflow-hidden rounded-full glass-panel px-4 py-1.5 mb-8 animate-fade-in ticker-mask">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 pulse-dot flex-shrink-0"></span>
                <div className="overflow-hidden">
                  <div className="ticker-track font-mono text-[11px] font-bold uppercase tracking-[0.18em]">
                    {[0, 1].map((k) => (
                      <span key={k} className="pr-10 text-emerald-400">
                        FINTECH INFRASTRUCTURE <span className="text-slate-500">×</span> <span className="text-cyan-300">APPLIED AI</span>
                        <span className="text-slate-600"> • </span>
                        <span className="text-slate-400">OPEN TO HIGH-IMPACT PM ROLES</span>
                        <span className="text-slate-600"> • </span>
                        <span className="text-cyan-300">LEDGER RECON</span>
                        <span className="text-slate-600"> • </span>
                        <span className="text-emerald-400">AGENTIC WORKFLOWS</span>
                        <span className="text-slate-600"> • </span>
                        <span className="text-slate-400">LLM EVALS</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <h1 className="hero-headline font-extrabold tracking-tight text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transforming Complex Problems Into
              <span className="text-gradient-ai block mt-2">Products & AI Solutions.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 animate-fade-in max-w-xl" style={{ animationDelay: '0.2s' }}>
              AI-native product manager turning messy workflows into simple, measurable products. Building practical solutions across fintech, insurtech, and zero-to-one development.
            </p>

            {/* Role & Status Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-white text-sm">Rahul Das — AI Product Manager</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#0D0F14]">
                <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                <span className="text-sm font-medium text-slate-400">Open to AI PM / APM roles</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button 
                onClick={scrollToProjects}
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-white px-6 py-3 text-sm font-semibold transition-all duration-300 hover:bg-emerald-600 accent-glow hover:-translate-y-1"
              >
                Explore My Work
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="https://docs.google.com/document/d/1B50cdCZgtqYdsdUDB9HLjpUGYYblGIF6j34-nf3gZyM/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                View Resume
                <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </a>
            </div>

            {/* Social Links & Location */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <a 
                href="https://www.linkedin.com/in/rahul-das-117a56223/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-lg border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all text-slate-400"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:rahul4ever2011@gmail.com" 
                aria-label="Send Email"
                className="p-2.5 rounded-lg border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all text-slate-400"
              >
                <Mail className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-300 font-medium px-3 py-2 rounded-lg border border-white/10 bg-white/5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>India</span>
              </div>
            </div>

            {/* Education Block (Top Fold - Directly Below Location Box) */}
            <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2 mb-3">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                <span className="text-[11px] font-mono font-bold tracking-widest text-emerald-400 uppercase">EDUCATION</span>
              </div>

              <div className="rounded-2xl glass-panel edge-glow p-4 sm:p-5 shadow-sm hover-lift flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-white/10 bg-[#0e131d]/90 hover:border-emerald-500/30 transition-all duration-300">
                <div>
                  <h4 className="font-bold text-white font-display text-base sm:text-lg mb-1">
                    Bachelor of Technology(B-Tech)
                  </h4>
                  <div className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                    <span>Birla Institute of Technology and Science (BITS), Pilani</span>
                    <img 
                      src="/bits-pilani-logo.png" 
                      alt="BITS Pilani Logo" 
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain inline-block shrink-0 drop-shadow-[0_0_6px_rgba(255,255,255,0.15)]" 
                    />
                  </div>
                </div>
                <div className="text-xs sm:text-sm font-mono font-bold text-emerald-400 bg-emerald-500/10 px-3.5 py-1.5 rounded-full whitespace-nowrap self-start sm:self-auto border border-emerald-500/20">
                  Nov 2020 — Aug 2024
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Photo & Process Block */}
          <div className="lg:pl-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            
            {/* Photo Card */}
            <div className="rounded-3xl glass-panel edge-glow p-2 shadow-sm hover-lift relative overflow-hidden group">
              <div className="aspect-[3/4] sm:aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#12161F] relative">
                <img 
                  src="/profile.jpg" 
                  alt="Rahul Das - AI Product Manager" 
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Radar / grid overlay */}
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-25 mix-blend-overlay"></div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>

                {/* Corner brackets */}
                <div className="pointer-events-none absolute top-3 left-3 w-6 h-6 border-l border-t border-emerald-400/50 rounded-tl-md"></div>
                <div className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-r border-b border-cyan-400/50 rounded-br-md"></div>

                {/* Corner system tag */}
                <div className="absolute top-3 right-3 data-chip chip-cyan backdrop-blur-sm">
                  [SYS: APM • BITS PILANI]
                </div>

                {/* Live signal footer */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 pulse-dot"></span>
                  SIGNAL: LIVE
                </div>
              </div>
            </div>

            {/* Product Thinking System Block */}
            <div className="rounded-3xl glass-panel edge-glow p-6 shadow-sm hover-lift">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono font-bold tracking-widest text-slate-500">PRODUCT_THINKING.SYSTEM</span>
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                </div>
              </div>

              <div className="space-y-3 relative">
                {/* Connecting line */}
                <div className="absolute left-4 top-4 bottom-4 w-px bg-white/10 z-0"></div>

                {processSteps.map((step) => (
                  <div key={step.id} className="relative z-10">
                    <button 
                      onMouseEnter={() => setActiveStep(step.id)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`w-full text-left flex items-center gap-4 p-3 rounded-xl border transition-all duration-300 ${
                        activeStep === step.id 
                          ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                          : 'border-white/10 bg-[#0D0F14] hover:border-white/20 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                        activeStep === step.id ? 'bg-emerald-500/20 text-emerald-500' : 'bg-white/5 text-slate-400'
                      }`}>
                        {step.id}
                      </div>
                      <span className={`font-bold font-display tracking-wide ${
                        activeStep === step.id ? 'text-emerald-500' : 'text-slate-300'
                      }`}>
                        {step.name}
                      </span>
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    </button>

                    {/* Step Description Dropdown */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      activeStep === step.id ? 'max-h-24 opacity-100 mt-2 mb-2' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="pl-[3.25rem] pr-4 text-sm text-slate-400 leading-relaxed border-l-2 border-emerald-500 ml-4">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-6 text-center">Hover a stage to see how I move a problem from insight to measurable impact.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;