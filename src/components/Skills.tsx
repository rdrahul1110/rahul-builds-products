import { useState, useEffect, useRef } from "react";
import { Layers, Bot, LineChart, Target, Building2 } from "lucide-react";

const Skills = () => {
  const categories = [
    {
      title: "Product",
      icon: <Layers className="w-5 h-5" />,
      skills: ["Product Discovery", "PRD/BRD", "Feature Prioritisation", "Requirement Gathering", "User Research", "Product Analytics"]
    },
    {
      title: "AI & Gen-AI",
      icon: <Bot className="w-5 h-5" />,
      skills: ["Generative AI", "Prompt Engineering", "AI Agents", "ChatGPT", "Claude", "Google Gemini", "AI Workflow Automation", "AI-Assisted Product Design"]
    },
    {
      title: "Analytics",
      icon: <LineChart className="w-5 h-5" />,
      skills: ["SQL", "Power BI", "Tableau", "KPI Monitoring", "ETL Pipelines", "Dashboarding"]
    },
    {
      title: "Execution",
      icon: <Target className="w-5 h-5" />,
      skills: ["Agile / Scrum", "Stakeholder Management", "Workflow Automation", "Business Analysis"]
    },
    {
      title: "Domain",
      icon: <Building2 className="w-5 h-5" />,
      skills: ["Fintech", "Insurtech", "B2B SaaS", "E-Commerce", "Supply Chain", "Warehouse Management", "HRMS"]
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
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isHovered, isVisible, categories.length]);

  return (
    <section ref={sectionRef} id="skills" className="py-24 relative z-10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">TOOLKIT</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Skills & Capabilities
          </h2>
          <p className="text-slate-400 text-lg">
            Clusters spanning product, data, AI, execution and domain expertise.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-6 lg:overflow-visible overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          {categories.map((cat, i) => {
            const isActive = activeIndex === i;

            return (
              <div 
                key={i}
                onMouseEnter={() => { setActiveIndex(i); setIsHovered(true); }}
                onMouseLeave={() => setIsHovered(false)}
                className={`min-w-[280px] lg:min-w-0 flex-1 rounded-3xl p-6 border snap-start transition-all duration-500 flex flex-col ${
                  isActive 
                    ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_30px_rgba(16,185,129,0.1)] -translate-y-1" 
                    : "border-white/10 bg-[#111111] hover:border-emerald-500/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-2 rounded-xl border transition-colors duration-500 ${
                    isActive 
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" 
                      : "border-white/10 bg-white/5 text-slate-400"
                  }`}>
                    {cat.icon}
                  </div>
                  <h3 className={`font-bold font-display text-lg transition-colors duration-500 ${
                    isActive ? "text-emerald-500" : "text-white"
                  }`}>
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span 
                      key={j} 
                      className={`px-3 py-1.5 rounded-lg border font-medium text-sm transition-colors duration-500 ${
                        isActive 
                          ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-400" 
                          : "border-white/10 bg-white/5 text-slate-300"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Skills;