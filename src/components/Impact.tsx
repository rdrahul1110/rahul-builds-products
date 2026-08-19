const Impact = () => {
  const impacts = [
    {
      code: "OPS-RECON",
      problem: "Fragmented insurance workflows & manual invoice processing",
      analysis: "Mapped manual workflows across claims, operations, and policy teams",
      solution: "0→1 development of AI-enabled CMS & PAS with fuzzy matching",
      impact: "Improved operational efficiency by 50%, reduced manual effort by 10%",
      metrics: [
        { label: "CMS EFFICIENCY", value: "+50%", tone: "emerald" },
        { label: "MANUAL EFFORT", value: "10% ↓", tone: "cyan" }
      ]
    },
    {
      code: "SUPPORT-LLM",
      problem: "Repetitive customer queries delaying response times",
      analysis: "Identified high-volume repetitive queries in support logs",
      solution: "Launched LLM-powered AI chatbot for automated support",
      impact: "Significantly reduced response time and improved support efficiency",
      metrics: [
        { label: "RESPONSE TIME", value: "↓ FASTER", tone: "emerald" },
        { label: "TIER-1 TICKETS", value: "DEFLECTED", tone: "cyan" }
      ]
    },
    {
      code: "ONBOARD-PAY",
      problem: "High friction and drop-offs during user onboarding",
      analysis: "User journey analysis identified key friction points in the flow",
      solution: "Redesigned onboarding flow and introduced flexible payment options",
      impact: "Reduced onboarding time by 30%, achieved 99% payment verification accuracy",
      metrics: [
        { label: "ONBOARDING TIME", value: "30% ↓", tone: "emerald" },
        { label: "PAY VERIFICATION", value: "99% ACC", tone: "cyan" }
      ]
    }
  ];

  return (
    <section id="impact" className="py-24 relative z-10 bg-[#08090C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">RESULTS · TELEMETRY</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            From Problem → Impact
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Real operational problems, analysed and solved. Every metric is from my own work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {impacts.map((item, i) => (
            <div 
              key={i} 
              className="group rounded-3xl glass-panel edge-glow p-8 shadow-sm hover-lift transition-all duration-300 flex flex-col h-full relative overflow-hidden"
            >
              <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]"></div>

              {/* Telemetry metric chips */}
              <div className="relative flex flex-wrap gap-2 mb-6">
                {item.metrics.map((m, k) => (
                  <span
                    key={k}
                    className={`data-chip ${m.tone === "emerald" ? "chip-emerald metric-pulse" : "chip-cyan"}`}
                  >
                    <span className="text-white">{m.value}</span>
                    <span className="opacity-70">{m.label}</span>
                  </span>
                ))}
              </div>

              <div className="relative mb-6 border-t border-white/5 pt-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">PROBLEM · {item.code}</span>
                <p className="text-slate-300 font-medium leading-relaxed">{item.problem}</p>
              </div>
              
              <div className="relative mb-6 border-t border-white/5 pt-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">ANALYSIS</span>
                <p className="text-slate-400 text-sm leading-relaxed">{item.analysis}</p>
              </div>
              
              <div className="relative mb-6 border-t border-white/5 pt-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">SOLUTION</span>
                <p className="text-slate-400 text-sm leading-relaxed">{item.solution}</p>
              </div>
              
              <div className="relative mt-auto border-t border-white/5 pt-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-500 uppercase block mb-1">IMPACT</span>
                <p className="text-white font-bold leading-relaxed">{item.impact}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Impact;
