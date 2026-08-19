import { Compass, Bot, Braces, Network, Zap, FlaskConical } from "lucide-react";

const AIPractice = () => {
  const practices = [
    {
      icon: Compass,
      title: "AI Product Management",
      description: "Identifying where models genuinely outperform rules, defining evaluation criteria, and designing for trust, validation, fallback and human override.",
      pipeline: ["SIGNAL", "MODEL VS RULES", "EVAL CRITERIA", "HUMAN OVERRIDE"]
    },
    {
      icon: Bot,
      title: "Claude Code & AI Agents",
      description: "Building and orchestrating agentic workflows and using AI-assisted development to rapidly turn validated ideas into working prototypes.",
      pipeline: ["TASK SPEC", "AGENT LOOP", "TOOL CALLS", "SHIPPED BUILD"]
    },
    {
      icon: Braces,
      title: "LLMs & Prompt Engineering",
      description: "Structured prompting, tool use, context engineering, and grounding model outputs in domain data for reliable business workflows.",
      pipeline: ["DOMAIN DATA", "CONTEXT PACK", "STRUCTURED OUT", "GUARDRAILS"]
    },
    {
      icon: Network,
      title: "MCP & Workflow Automation",
      description: "Connecting AI models with real systems, tools and workflows — moving from demos to reliable automation.",
      pipeline: ["CORE APIS", "MCP BRIDGE", "RULES ENGINE", "AUDIT TRAIL"]
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Using AI-assisted development to prototype concepts quickly, validate assumptions and reduce unnecessary engineering cycles.",
      pipeline: ["HYPOTHESIS", "PROTOTYPE", "USER TEST", "BUILD / KILL"]
    },
    {
      icon: FlaskConical,
      title: "Future AI Experiments",
      tag: "EXPLORATORY",
      description: "Exploring AI-assisted planning, intelligent monitoring, exception detection, natural-language constraints and autonomous workflow agents.",
      pipeline: ["MONITORING", "EXCEPTION DETECT", "NL CONSTRAINTS", "AUTONOMOUS AGENT"]
    }
  ];

  return (
    <section id="ai-practice" className="py-24 relative z-10 bg-[#08090C]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase mb-3 block">
            AI PRACTICE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-3">
            AI, in production terms
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-medium mb-4">
            How I apply AI to real products, workflows and business problems.
          </p>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-3xl">
            I treat AI as a product material — something shaped around a business decision, not a feature bolted on.
          </p>
        </div>

        {/* Pipeline Node Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {practices.map((practice, index) => {
            const Icon = practice.icon;
            return (
              <div 
                key={index}
                className="group glass-panel edge-glow rounded-2xl p-6 sm:p-8 hover-lift relative overflow-hidden shadow-sm transition-all duration-300"
              >
                <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]"></div>

                {/* Header Row: Icon + Title (+ optional tag) */}
                <div className="relative flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-cyan-300 group-hover:border-cyan-400/30 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {practice.title}
                  </h3>
                  {practice.tag && (
                    <span className="ml-auto data-chip chip-neutral">
                      {practice.tag}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="relative text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                  {practice.description}
                </p>

                {/* Node pipeline */}
                <div className="relative flex flex-wrap items-center gap-x-2 gap-y-2 pt-5 border-t border-white/5">
                  {practice.pipeline.map((node, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-300 transition-colors group-hover:border-cyan-400/25">
                        <span className={`h-1.5 w-1.5 rounded-full ${i === practice.pipeline.length - 1 ? 'bg-emerald-400' : 'bg-cyan-400/70'}`}></span>
                        {node}
                      </span>
                      {i < practice.pipeline.length - 1 && (
                        <span className="font-mono text-xs text-slate-600 group-hover:text-cyan-400/60 transition-colors">→</span>
                      )}
                    </div>
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

export default AIPractice;
