import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const Experience = () => {
  const [expandedId, setExpandedId] = useState<number | null>(0);

  const experiences = [
    {
      id: 0,
      tags: "INSURTECH • 0→1 PRODUCT • AI & AUTOMATION",
      role: "Associate Product Manager",
      company: "Edme Insurance Broker",
      period: "Dec 25 — June 26",
      location: "India",
      bullets: [
        "Led the 0→1 development and rollout of an AI-enabled Claims Management System (CMS) and Policy Administration System (PAS), consolidating fragmented manual operations and driving a 50% increase in operational throughput.",
        "Conducted end-to-end product discovery across claims, underwriting, and operations teams—translating complex operational pain points into prioritized PRDs, process maps, and sprint backlogs to reduce manual effort by 10%.",
        "Re-engineered the financial reconciliation pipeline by integrating fuzzy matching algorithms and intelligent batch processing, significantly cutting invoice processing turnarounds and eliminating manual reconciliation errors.",
        "Directed backend data migration and schema alignment across legacy workflows, ensuring zero data loss during platform transition and unlocking real-time operational reporting.",
        "Accelerated feature discovery and PRD authoring by leveraging Generative AI workflows (ChatGPT, Cursor, Lovable) to rapidly prototype UI flows and document technical requirements."
      ]
    },
    {
      id: 1,
      tags: "FINTECH • WEALTH-TECH • PRODUCT GROWTH • AI",
      role: "Associate Product Manager",
      company: "5paisa Capital Ltd",
      period: "Nov 24 — Sept 25",
      location: "India",
      bullets: [
        "Spearheaded the conceptualization and launch of curated Basket Investing in partnership with research analysts, simplifying multi-asset portfolio creation for retail investors and boosting platform engagement.",
        "Designed and deployed an LLM-powered AI customer support chatbot, automating high-frequency queries, deflecting repetitive tier-1 tickets, and drastically slashing average resolution time.",
        "Analyzed user drop-off funnels in mutual fund discovery to design and launch interactive MF Compare and Nifty50 benchmarking tools, achieving a 3% lift in user conversion.",
        "Redesigned key pre-login acquisition funnels with one-tap Google Sign-In and behavioral-targeted landing screens, driving a 5% increase in user engagement and faster onboarding.",
        "Streamlined the partner ecosystem onboarding experience and self-service portal, enabling seamless onboarding of 500+ institutional and sub-broker partners.",
        "Conducted structured Root Cause Analysis (RCA) across trade execution and operational touchpoints, proactively resolving platform bottlenecks and ensuring high reliability during market volatility."
      ]
    },
    {
      id: 2,
      tags: "0→1 STARTUP • USER ONBOARDING • FINTECH",
      role: "Product Management Intern",
      company: "Liquidmind AI",
      period: "Jun 24 — Aug 24",
      location: "India",
      bullets: [
        "Uncovered user friction points through detailed journey mapping and funnel analysis, redesigning the onboarding flow to achieve a 30% reduction in customer time-to-value.",
        "Introduced flexible checkout payment structures (Pay Later, Split/Partial Payments, and Instant Pay), improving transaction affordability and conversion rates.",
        "Collaborated closely with engineering to integrate payment verification APIs and automated webhook listeners, achieving 99% accuracy in transaction verification."
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
                      <button 
                        aria-label="Toggle experience details"
                        className="text-slate-500 hover:text-emerald-500 transition-colors p-1"
                      >
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-emerald-400" /> : <ChevronDown className="w-5 h-5" />}
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
                    <div className={`transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[800px] opacity-100 mt-6 pt-6 border-t border-white/5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <ul className="space-y-4">
                        {exp.bullets.map((bullet, i) => (
                          <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
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
