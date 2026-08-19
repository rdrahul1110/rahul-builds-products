const Impact = () => {
  const impacts = [
    {
      problem: "Fragmented insurance workflows & manual invoice processing",
      analysis: "Mapped manual workflows across claims, operations, and policy teams",
      solution: "0→1 development of AI-enabled CMS & PAS with fuzzy matching",
      impact: "Improved operational efficiency by 50%, reduced manual effort by 10%"
    },
    {
      problem: "Repetitive customer queries delaying response times",
      analysis: "Identified high-volume repetitive queries in support logs",
      solution: "Launched LLM-powered AI chatbot for automated support",
      impact: "Significantly reduced response time and improved support efficiency"
    },
    {
      problem: "High friction and drop-offs during user onboarding",
      analysis: "User journey analysis identified key friction points in the flow",
      solution: "Redesigned onboarding flow and introduced flexible payment options",
      impact: "Reduced onboarding time by 30%, achieved 99% payment verification accuracy"
    }
  ];

  return (
    <section id="impact" className="py-24 relative z-10 bg-[#08090C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">RESULTS</span>
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
              className="rounded-3xl border border-white/10 bg-[#0D0F14] p-8 shadow-sm hover-lift hover:border-emerald-500/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="mb-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">PROBLEM</span>
                <p className="text-slate-300 font-medium leading-relaxed">{item.problem}</p>
              </div>
              
              <div className="mb-6 border-t border-white/5 pt-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">ANALYSIS</span>
                <p className="text-slate-400 text-sm leading-relaxed">{item.analysis}</p>
              </div>
              
              <div className="mb-6 border-t border-white/5 pt-6">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-500 uppercase block mb-1">SOLUTION</span>
                <p className="text-slate-400 text-sm leading-relaxed">{item.solution}</p>
              </div>
              
              <div className="mt-auto border-t border-white/5 pt-6">
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
