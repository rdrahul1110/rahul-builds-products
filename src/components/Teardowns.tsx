import { ExternalLink, FileText, ArrowRight } from "lucide-react";

interface TeardownItem {
  id: number;
  title: string;
  category: string;
  badge?: string;
  badgeColor?: string;
  description: string;
  metrics: { value: string; label: string; color?: string }[];
  pdfLink: string;
  buttonText: string;
  image: string;
  watermark: string;
  tags: string[];
}

const Teardowns = () => {
  const teardownData: TeardownItem[] = [
    {
      id: 1,
      title: "Improving BookMyShow: High-Surge Ticket Booking & Phantom Lock Resolution",
      category: "SYSTEM DESIGN & PRD",
      badge: "NextLeap Top Fellow",
      badgeColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      description: "Root-cause investigation of why 500k+ concurrent fans caused 82% phantom lock rates and checkout crashes during Coldplay & World Cup sales. Proposed a tokenized FIFO virtual waiting room, edge seat soft-reservations, and bot rate-limiting to protect revenue conversion.",
      metrics: [
        { value: "99.4%", label: "Peak Surge Uptime", color: "text-cyan-400" },
        { value: "-64%", label: "Checkout Bounce", color: "text-emerald-400" },
        { value: "0%", label: "Scalping Bot Leakage", color: "text-amber-400" }
      ],
      pdfLink: "/bookmyshow-case-study.pdf",
      buttonText: "Read Case Study (18-Page PRD)",
      image: "/projects/bookmyshow.png",
      watermark: "BMS",
      tags: ["FIFO Waiting Room", "Phantom Lock Mitigation", "Edge Reservation", "NextLeap Fellow"]
    },
    {
      id: 2,
      title: "Zepto: Boosting Order Value & Grocery Experience via 'Zepto Stock Up'",
      category: "QUICK COMMERCE · PRODUCT TEARDOWN & PRD",
      badge: "Unit Economics",
      badgeColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      description: "A comprehensive product strategy and system design teardown analyzing why users hesitate to place high-value grocery orders. Designed 'Zepto Stock Up' with household inventory tracking, bulk discount ladders, and shelf-life indicators to boost dark store throughput.",
      metrics: [
        { value: "₹400–450", label: "Baseline AOV Target", color: "text-pink-400" },
        { value: "4.5 / 5.0", label: "Prioritization Score (U*I/E)", color: "text-cyan-400" },
        { value: "18 Million", label: "Target GenZ/Millennials", color: "text-emerald-400" }
      ],
      pdfLink: "/zepto-case-study.pdf",
      buttonText: "Read Case Study (9-Page PRD)",
      image: "/projects/zepto-teardown.png",
      watermark: "Z",
      tags: ["Zepto Stock-Up", "Dark Store Economics", "Shelf-Life Tracker", "AOV Growth"]
    }
  ];

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="teardowns" className="py-24 relative z-10 bg-[#08090C] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              02 / PRODUCT TEARDOWNS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display tracking-tight text-white mb-4">
            How I think when <span className="italic font-serif text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">nobody asked.</span>
          </h2>
          <p className="text-slate-400 max-w-3xl text-base sm:text-lg leading-relaxed">
            Self-directed product strategy, unit-economics teardowns, and root-cause analyses across high-growth consumer products.
          </p>
        </div>

        {/* Teardown Cards (Stacked / Bento Grid) */}
        <div className="space-y-8">
          {teardownData.map((item, idx) => (
            <article 
              key={item.id}
              onClick={() => handleCardClick(item.pdfLink)}
              className="group relative rounded-3xl overflow-hidden p-6 sm:p-8 cursor-pointer transition-all duration-500 bg-[#0e131d]/80 hover:bg-[#111724]/90 border border-white/10 hover:border-cyan-500/40 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10"
            >
              {/* Background Watermark */}
              <div className="pointer-events-none absolute right-6 -bottom-6 font-display font-black text-[180px] text-white/[0.02] select-none leading-none">
                {item.watermark}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                
                {/* Left: Presentation Slide Preview */}
                <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#030712] aspect-[16/10]">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <span className="px-4 py-2 rounded-full bg-cyan-400 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Open Case Study PDF</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </span>
                  </div>
                </div>

                {/* Right: Content & Unit Economics Metrics */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase">
                        {item.category}
                      </span>
                      {item.badge && (
                        <>
                          <span className="text-slate-600">·</span>
                          <span className={`text-xs font-mono px-2 py-0.5 rounded border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        </>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Metric Highlights */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                      {item.metrics.map((m, mIdx) => (
                        <div key={mIdx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                          <div className={`text-xl font-bold font-display ${m.color || 'text-cyan-400'}`}>
                            {m.value}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {item.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-medium text-slate-400">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Link Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <a
                      href={item.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {item.buttonText}
                      <ExternalLink className="w-4 h-4 ml-0.5" />
                    </a>
                    <span className="text-xs font-mono text-slate-500">PDF · Verified Teardown</span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Teardowns;
