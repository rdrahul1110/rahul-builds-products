import { useState, useEffect, useRef } from "react";
import { Sparkles } from "lucide-react";

interface DomainItem {
  id: string;
  name: string;
  desc: string;
}

const domains: DomainItem[] = [
  {
    id: "business",
    name: "Business",
    desc: "Understand operations, revenue and stakeholder goals."
  },
  {
    id: "product",
    name: "Product",
    desc: "PRD/BRD, discovery, prioritisation and delivery."
  },
  {
    id: "technology",
    name: "Technology",
    desc: "Architecture, system design, API integrations and engineering alignment."
  },
  {
    id: "data",
    name: "Data",
    desc: "SQL, metrics definition, analytics pipelines and data-driven insights."
  },
  {
    id: "ai",
    name: "AI & Automation",
    desc: "LLM workflows, process automation, prompt design and operational efficiency."
  }
];

export const DomainsCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered || !isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % domains.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [isHovered, isVisible]);

  const activeDomain = domains[activeIndex];

  return (
    <div 
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-3xl glass-panel edge-glow p-6 sm:p-8 shadow-sm transition-all duration-300 hover-lift w-full"
    >
      {/* Pills / Buttons: Row 1 (Business, Product, Technology), Row 2 (Data, AI & Automation) */}
      <div className="space-y-3 sm:space-y-3.5 mb-6">
        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {domains.slice(0, 3).map((domain, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm md:text-base transition-all duration-300 text-center flex items-center justify-center ${
                  isActive
                    ? "bg-[#0D0F14] border-2 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] -translate-y-0.5"
                    : "bg-[#12161F] border border-white/10 text-white hover:border-white/20 hover:text-emerald-400"
                }`}
              >
                {domain.name}
              </button>
            );
          })}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
          {domains.slice(3, 5).map((domain, sliceIndex) => {
            const index = sliceIndex + 3;
            const isActive = index === activeIndex;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`py-3 px-2 sm:py-3.5 sm:px-4 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm md:text-base transition-all duration-300 text-center flex items-center justify-center ${
                  isActive
                    ? "bg-[#0D0F14] border-2 border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)] -translate-y-0.5"
                    : "bg-[#12161F] border border-white/10 text-white hover:border-white/20 hover:text-emerald-400"
                }`}
              >
                {domain.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Description Banner */}
      <div className="rounded-2xl border border-white/10 bg-[#161616] px-5 py-4 sm:px-6 sm:py-4 flex items-center gap-3 transition-all duration-300 min-h-[64px]">
        <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 animate-pulse" />
        <p className="text-sm sm:text-base leading-relaxed text-slate-300 transition-opacity duration-300">
          <strong className="text-white font-bold">{activeDomain.name}:</strong>{" "}
          <span>{activeDomain.desc}</span>
        </p>
      </div>
    </div>
  );
};

export default DomainsCard;
