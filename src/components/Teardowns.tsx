import { useState } from "react";
import { ExternalLink, FileText, Download, Eye, X, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [selectedTeardown, setSelectedTeardown] = useState<TeardownItem | null>(null);

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

  const handleCardClick = (item: TeardownItem) => {
    setSelectedTeardown(item);
  };

  const getGithubRawUrl = (pdfLink: string) => {
    return `https://raw.githubusercontent.com/rdrahul1110/rahul-builds-products/main/public${pdfLink}`;
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
          {teardownData.map((item) => (
            <article 
              key={item.id}
              onClick={() => handleCardClick(item)}
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
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTeardown(item);
                      }}
                      className="px-4 py-2 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs flex items-center gap-1.5 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Read Case Study</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </button>
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
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTeardown(item);
                        }}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <FileText className="w-4 h-4" />
                        <span>{item.buttonText}</span>
                      </button>
                      <span className="text-slate-700">·</span>
                      <a
                        href={item.pdfLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <span>New Tab</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <span className="text-xs font-mono text-slate-500">PDF · Verified Teardown</span>
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Case Study In-Page Reader Modal */}
      <Dialog open={!!selectedTeardown} onOpenChange={(open) => !open && setSelectedTeardown(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] p-0 bg-[#08090C] border-white/10 text-white flex flex-col overflow-hidden">
          {selectedTeardown && (
            <>
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-[#0c1017]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                      {selectedTeardown.category}
                    </div>
                    <DialogTitle className="text-sm sm:text-base font-bold font-display text-white truncate max-w-xl">
                      {selectedTeardown.title}
                    </DialogTitle>
                  </div>
                </div>

                <div className="flex items-center gap-2 pr-8">
                  <a
                    href={getGithubRawUrl(selectedTeardown.pdfLink)}
                    download
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <a
                    href={selectedTeardown.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-semibold transition-colors"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Full Tab</span>
                  </a>
                </div>
              </div>

              {/* Modal PDF Viewer Body */}
              <div className="flex-1 w-full bg-[#030712] relative overflow-hidden">
                <object
                  data={selectedTeardown.pdfLink}
                  type="application/pdf"
                  className="w-full h-full"
                >
                  <iframe
                    src={selectedTeardown.pdfLink}
                    title={selectedTeardown.title}
                    className="w-full h-full border-0"
                  >
                    <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center h-full">
                      <FileText className="w-12 h-12 text-cyan-400 mb-4" />
                      <p className="text-base font-semibold text-white mb-2">Browser blocked inline preview</p>
                      <p className="text-xs text-slate-400 max-w-md mb-6">
                        Your browser security settings require opening this PDF in a dedicated viewer.
                      </p>
                      <div className="flex gap-3">
                        <a
                          href={getGithubRawUrl(selectedTeardown.pdfLink)}
                          download
                          className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs inline-flex items-center gap-2"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF File
                        </a>
                        <a
                          href={selectedTeardown.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-white/10 text-white font-semibold text-xs inline-flex items-center gap-2"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Open in New Tab
                        </a>
                      </div>
                    </div>
                  </iframe>
                </object>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Teardowns;
