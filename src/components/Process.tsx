import { useState, useEffect, useRef } from "react";

const Process = () => {
  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Understand users, workflows and pain points."
    },
    {
      num: "02",
      title: "Define",
      desc: "Translate problems into clear requirements."
    },
    {
      num: "03",
      title: "Design",
      desc: "Create workflows and product solutions."
    },
    {
      num: "04",
      title: "Build",
      desc: "Work with technology teams to implement."
    },
    {
      num: "05",
      title: "Measure",
      desc: "Use data and feedback to improve."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered || !isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 2500); // Cycles every 2.5 seconds

    return () => clearInterval(interval);
  }, [isHovered, isVisible, steps.length]);

  return (
    <section ref={sectionRef} className="pt-8 pb-20 sm:pt-10 sm:pb-24 relative z-10 bg-[#0a0a0a] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">METHOD</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            How I Turn Problems Into <br/> Products
          </h2>
        </div>

        {/* Horizontal scroll container for smaller screens */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar lg:overflow-visible">
          <div className="flex gap-4 lg:gap-6 min-w-max lg:min-w-0 w-full relative">
            
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-8 right-8 h-[1px] bg-white/10 z-0"></div>
            <div className="hidden lg:block absolute top-10 left-8 right-8 h-[1px] bg-emerald-500/20 z-0 dashed-line"></div>

            {steps.map((step, i) => {
              const isActive = activeIndex === i;
              
              return (
                <div 
                  key={i} 
                  onMouseEnter={() => { setActiveIndex(i); setIsHovered(true); }}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`w-[260px] lg:w-full flex-1 snap-start relative z-10 rounded-2xl border p-6 sm:p-8 transition-all duration-500 shadow-sm flex flex-col ${
                    isActive 
                      ? "bg-emerald-500/5 border-emerald-500/50 -translate-y-1 shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
                      : "bg-[#111111] border-white/10 hover:border-emerald-500/30"
                  }`}
                >
                  <div className={`text-sm font-mono font-bold mb-6 w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-500 ${
                    isActive 
                      ? "text-emerald-400 bg-emerald-500/20 border-emerald-500/50" 
                      : "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                  }`}>
                    {step.num}
                  </div>
                  <h3 className={`text-xl font-bold font-display mb-3 transition-colors duration-500 ${isActive ? "text-emerald-400" : "text-white"}`}>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .dashed-line {
          background-image: linear-gradient(to right, rgba(16,185,129,0.3) 50%, transparent 50%);
          background-size: 12px 100%;
          background-repeat: repeat-x;
        }
      `}} />
    </section>
  );
};

export default Process;
