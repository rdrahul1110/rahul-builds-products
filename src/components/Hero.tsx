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
    <div className="pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden relative">
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#111111]/50 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-emerald-500 mb-8 animate-fade-in shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 pulse-dot"></span>
              <span className="tracking-widest uppercase">PRODUCT • AI • AUTOMATION • ANALYTICS</span>
            </div>

            <h1 className="hero-headline font-extrabold tracking-tight text-white mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Transforming Complex Problems Into
              <span className="text-emerald-500 block mt-2">Products & AI Solutions.</span>
            </h1>

            <p className="text-lg text-slate-400 leading-relaxed mb-8 animate-fade-in max-w-xl" style={{ animationDelay: '0.2s' }}>
              AI-native product manager turning messy workflows into simple, measurable products. Building practical solutions across fintech, insurtech, and zero-to-one development.
            </p>

            {/* Role & Status Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-white text-sm">Rahul Das — AI Product Manager</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-[#111111]">
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
              <button 
                onClick={() => {
                  const downloadUrl = `https://lggoryptfxfuqtlkojsd.supabase.co/storage/v1/object/public/portfolio-files/rahul-das-resume.pdf`;
                  const link = document.createElement('a');
                  link.href = downloadUrl;
                  link.download = 'Rahul-Das-Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-transparent hover:bg-white/5 text-white px-6 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                Download Resume
                <Download className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <a href="#" className="p-2.5 rounded-lg border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all text-slate-400">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2.5 rounded-lg border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all text-slate-400">
                <Mail className="w-5 h-5" />
              </a>
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium px-2">
                <MapPin className="w-4 h-4" />
                India
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Photo & Process Block */}
          <div className="lg:pl-8 space-y-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            
            {/* Photo Placeholder Card */}
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-2 shadow-sm hover-lift relative overflow-hidden group">
              <div className="aspect-[4/3] sm:aspect-video lg:aspect-[4/3] w-full rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 relative overflow-hidden">
                <div className="text-slate-500 font-medium flex flex-col items-center gap-2">
                  <svg className="w-8 h-8 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Add Portrait Here
                </div>
                {/* Optional overlay gradient on photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>

            {/* Product Thinking System Block */}
            <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-sm hover-lift">
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
                          : 'border-white/10 bg-[#111111] hover:border-white/20 hover:bg-white/5'
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