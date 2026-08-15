import { useState, useEffect, useRef } from "react";
import { Terminal, ArrowDown } from "lucide-react";

const AIPractice = () => {
  const steps = [
    "Incoming Document",
    "AI Extraction",
    "Structured Data",
    "Validation",
    "Business Rules",
    "Human Exception",
    "Automated Action"
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  const terminalSteps = [
    { text: "ingest --source=inbox --type=order", isCommand: true },
    { text: "→ document received: PO_4821.pdf", isCommand: false, color: "text-slate-500" },
    { text: "ai.extract(fields=[customer, sku, qty, price])", isCommand: true },
    { text: "→ 12 fields parsed • confidence 0.96", isCommand: false, color: "text-slate-500" },
    { text: "validate --rules=pricing,address,sku_map", isCommand: true },
    { text: "✓ validation passed • 1 exception flagged", isCommand: false, color: "text-emerald-500/80" },
    { text: "route --exception=human_in_loop", isCommand: true },
    { text: "→ sales_order SO-90312 created • notified", isCommand: false, color: "text-slate-500" }
  ];

  // Intersection Observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing Effect Logic
  useEffect(() => {
    if (!isVisible) return;
    if (currentStep >= terminalSteps.length) return;

    const step = terminalSteps[currentStep];

    if (step.isCommand) {
      if (currentCharIndex < step.text.length) {
        const timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, 20 + Math.random() * 20); // Fast typing
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 300); // pause before output
        return () => clearTimeout(timeout);
      }
    } else {
      const timeout = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 500); // pause after output
      return () => clearTimeout(timeout);
    }
  }, [isVisible, currentStep, currentCharIndex, terminalSteps.length]);

  // Highlight looping logic
  useEffect(() => {
    if (isHovered || !isVisible) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % steps.length);
    }, 2000); // Cycles every 2 seconds

    return () => clearInterval(interval);
  }, [isHovered, isVisible, steps.length]);

  return (
    <section id="ai-practice" className="py-24 relative z-10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">AI + AUTOMATION</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            I Build Practical AI Systems
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            A product professional who understands how AI can be applied to real business workflows — not an AI researcher, but the person who makes it work in operations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Terminal Block */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] overflow-hidden shadow-sm hover:border-white/20 transition-colors">
            {/* Terminal Header */}
            <div className="bg-[#1a1a1a] border-b border-white/5 px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="mx-auto flex items-center text-xs font-mono text-slate-500">
                <Terminal className="w-3.5 h-3.5 mr-2" />
                intent-to-order • pipeline
              </div>
            </div>
            {/* Terminal Body */}
            <div ref={terminalRef} className="p-6 font-mono text-sm leading-relaxed overflow-x-auto text-slate-300 relative min-h-[300px]">
              {terminalSteps.map((step, index) => {
                if (index > currentStep) return null;
                
                const isCurrentStep = index === currentStep;
                const displayedText = (step.isCommand && isCurrentStep) 
                  ? step.text.slice(0, currentCharIndex) 
                  : step.text;

                return (
                  <div key={index} className={`mb-${step.isCommand ? '1' : '4'} ${step.isCommand ? 'text-emerald-400 flex items-center gap-2' : (step.color + ' ml-2')}`}>
                    {step.isCommand && <span>$</span>}
                    <span>{displayedText}</span>
                    {step.isCommand && isCurrentStep && (
                      <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1"></span>
                    )}
                  </div>
                );
              })}
              {currentStep >= terminalSteps.length && (
                <div className="text-emerald-400 flex items-center gap-2 mt-1">
                  <span>$</span>
                  <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ml-1"></span>
                </div>
              )}
            </div>
          </div>

          {/* Data Flow Block */}
          <div className="rounded-2xl border border-white/10 bg-[#111111] p-6 shadow-sm hover:border-white/20 transition-colors">
            <div className="text-xs font-mono font-bold tracking-widest text-slate-500 uppercase mb-6">DATA_FLOW</div>
            
            <div className="flex flex-col items-center">
              {steps.map((step, i) => {
                const isActive = activeIndex === i;

                return (
                  <div key={i} className="w-full flex flex-col items-center">
                    <div 
                      onMouseEnter={() => { setActiveIndex(i); setIsHovered(true); }}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`w-full rounded-lg py-3 px-4 text-sm font-medium mb-2 relative overflow-hidden transition-all duration-500 flex items-center ${
                        isActive 
                          ? "bg-[#1a1a1a] border border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)] -translate-y-0.5" 
                          : "bg-[#1a1a1a] border border-white/5 text-slate-300 shadow-sm hover:border-amber-500/30"
                      }`}
                    >
                      <span className="relative z-10">{step}</span>
                      <div className={`absolute inset-0 transition-colors duration-500 ${isActive ? "bg-amber-500/10" : "bg-transparent"}`}></div>
                    </div>
                    {i < steps.length - 1 && (
                      <ArrowDown className={`w-4 h-4 mb-2 transition-colors duration-500 ${
                        isActive || activeIndex === i + 1 ? "text-amber-500/80 animate-bounce" : "text-emerald-500/50"
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIPractice;
