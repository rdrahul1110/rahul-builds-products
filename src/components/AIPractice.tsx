import { Compass, Bot, Braces, Network, Zap, FlaskConical } from "lucide-react";

const AIPractice = () => {
  const practices = [
    {
      icon: Compass,
      title: "AI Product Management",
      description: "Identifying where models genuinely outperform rules, defining evaluation criteria, and designing for trust, validation, fallback and human override."
    },
    {
      icon: Bot,
      title: "Claude Code & AI Agents",
      description: "Building and orchestrating agentic workflows and using AI-assisted development to rapidly turn validated ideas into working prototypes."
    },
    {
      icon: Braces,
      title: "LLMs & Prompt Engineering",
      description: "Structured prompting, tool use, context engineering, and grounding model outputs in domain data for reliable business workflows."
    },
    {
      icon: Network,
      title: "MCP & Workflow Automation",
      description: "Connecting AI models with real systems, tools and workflows — moving from demos to reliable automation."
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description: "Using AI-assisted development to prototype concepts quickly, validate assumptions and reduce unnecessary engineering cycles."
    },
    {
      icon: FlaskConical,
      title: "Future AI Experiments",
      tag: "EXPLORATORY",
      description: "Exploring AI-assisted planning, intelligent monitoring, exception detection, natural-language constraints and autonomous workflow agents."
    }
  ];

  return (
    <section id="ai-practice" className="py-24 relative z-10 bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-3 block">
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

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {practices.map((practice, index) => {
            const Icon = practice.icon;
            return (
              <div 
                key={index}
                className="group bg-[#111111] rounded-2xl border border-white/10 p-6 sm:p-8 hover-lift relative overflow-hidden shadow-sm transition-all duration-300 hover:border-emerald-500/30"
              >
                {/* Header Row: Icon + Title (+ optional tag) */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                    {practice.title}
                  </h3>
                  {practice.tag && (
                    <span className="ml-auto text-[10px] font-mono font-bold tracking-widest px-2.5 py-1 rounded-full border border-white/10 bg-white/5 text-slate-400 uppercase">
                      {practice.tag}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {practice.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default AIPractice;
