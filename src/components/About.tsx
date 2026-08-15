const About = () => {
  const education = [
    { 
      degree: "Bachelor of Technology(B-Tech)", 
      school: "Birla Institute of Technology and Science (BITS), Pilani", 
      years: "Nov 2020 — Aug 2024" 
    }
  ];

  return (
    <section id="about" className="py-24 relative z-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-4">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase">ABOUT</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-8 leading-tight animate-fade-in">
          Systems Thinker. <br/> Product Builder.
        </h2>
        
        <div className="space-y-6 text-slate-400 text-lg leading-relaxed mb-12 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <p>
            Product & Analytics professional with experience across fintech, insurtech, and early-stage startups. Proven in cross-functional stakeholder management, SQL-driven analytics, and workflow automation — with direct exposure to AI-assisted process design and end-to-end product delivery.
          </p>
          <p>
            I work at the intersection of <strong className="text-white font-semibold">business, product, technology, data, and AI</strong> — connecting operational problems to practical automation. My focus is turning messy, manual workflows into reliable products that teams can trust.
          </p>
        </div>

        {/* Education Blocks */}
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center gap-2 mb-6">
            <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase">EDUCATION</span>
          </div>
          
          <div className="space-y-4">
            {education.map((item, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-sm hover-lift flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                <div>
                  <h4 className="font-bold text-white font-display text-lg mb-1">{item.degree}</h4>
                  <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{item.school}</p>
                </div>
                <div className="text-sm font-mono font-bold text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full whitespace-nowrap self-start sm:self-auto border border-emerald-500/20">
                  {item.years}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;