import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const experiences = [
    {
      id: 0,
      tags: "PRODUCT • AUTOMATION • INSURTECH",
      role: "Associate Product Manager",
      company: "Edme Insurance Broker",
      period: "Dec 25 — June 26",
      location: "India",
      bullets: [
        "Led 0→1 development of AI-enabled Claims Management System (CMS) and Policy Administration System (PAS).",
        "Reduced manual effort by 10% by conducting product discovery and prioritizing requirements.",
        "Reduced invoice processing time and manual errors by redesigning reconciliation workflows using fuzzy matching and intelligent automation."
      ]
    },
    {
      id: 1,
      tags: "PRODUCT • DATA • AI",
      role: "Associate Product Manager Trainee",
      company: "5paisa Capital Ltd",
      period: "Nov 24 — Sept 25",
      location: "India",
      bullets: [
        "Launched a curated Basket Investing feature with the research team, boosting investor engagement.",
        "Improved customer support efficiency by launching an LLM-powered AI chatbot automating repetitive queries.",
        "Improved user engagement by 5% by redesigning key prelogin journeys using customer behavior insights."
      ]
    },
    {
      id: 2,
      tags: "PRODUCT • RESEARCH",
      role: "Product Management Intern",
      company: "Liquidmind AI",
      period: "Jun 24 — Aug 24",
      location: "India",
      bullets: [
        "Reduced onboarding time by 30% by identifying friction points through user journey analysis.",
        "Increased payment flexibility by introducing Pay Later, Partial Payment, and Pay Now options."
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative z-10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">CAREER</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Experience
          </h2>
          <p className="text-slate-400 text-lg">
            An interactive timeline of roles where I turned operations into products and automation.
          </p>
        </div>

        <div className="relative border-l-2 border-emerald-500/20 ml-4 pl-8 sm:ml-6 sm:pl-10 space-y-8">
          {experiences.map((exp) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div key={exp.id} className="relative animate-fade-in" style={{ animationDelay: `${exp.id * 0.1}s` }}>
                {/* Timeline Dot */}
                <div className={`absolute -left-[2.5rem] sm:-left-[3rem] top-8 w-4 h-4 rounded-full border-2 bg-[#0a0a0a] transition-colors duration-300 ${isExpanded ? 'border-emerald-500' : 'border-white/20'}`}></div>

                {/* Experience Card */}
                <div 
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-[#111111] hover-lift cursor-pointer ${
                    isExpanded 
                      ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                      : 'border-white/10 hover:border-emerald-500/50 hover:shadow-sm'
                  }`}
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-500 mb-4 block">
                        {exp.tags}
                      </span>
                      <button className="text-slate-500 hover:text-emerald-500 transition-colors">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>

                    <h3 className="text-2xl font-bold font-display text-white mb-1">{exp.role}</h3>
                    <p className="text-lg text-emerald-500 font-medium mb-4">{exp.company}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-400 font-mono">
                      <span className="text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full">{exp.period}</span>
                      <div className="flex items-center gap-1 text-slate-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.location}
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <div className={`transition-all duration-300 ${isExpanded ? 'max-h-[500px] opacity-100 mt-6 pt-6 border-t border-white/5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <ul className="space-y-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
