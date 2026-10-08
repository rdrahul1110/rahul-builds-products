import DomainsCard from "./DomainsCard";

const About = () => {
  return (
    <section id="about" className="py-24 relative z-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Top 2-Column Grid: Bio on Left, Domains Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase block mb-3">ABOUT</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight animate-fade-in">
                Systems Thinker. <br/> Product Builder.
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-400 text-base sm:text-lg leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <p>
                I've spent the last few years inside the messiest parts of fintech and insurtech — where legacy ops meets broken software, and someone has to figure out what actually needs to be built. That's where I come in.
              </p>
              <p>
                I connect the <strong className="text-white font-semibold">business</strong> context (what stakeholders really need) to the <strong className="text-white font-semibold">product</strong> (what gets shipped), bridging <strong className="text-white font-semibold">technology</strong> and <strong className="text-white font-semibold">data</strong> to make decisions stick — and lately, using <strong className="text-white font-semibold">AI & automation</strong> to cut the manual work that nobody should be doing today.
              </p>
            </div>
          </div>

          {/* Right Column (7 Cols) */}
          <div className="lg:col-span-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <DomainsCard />
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;