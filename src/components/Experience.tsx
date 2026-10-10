import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  TrendingUp, 
  Clock, 
  Bot, 
  Users, 
  FileText, 
  Layers, 
  RefreshCw,
  ArrowRight
} from "lucide-react";

interface ModalData {
  id: string;
  company: string;
  tag: string;
  title: string;
  metrics: { label: string; value: string; color: string }[];
  problem: string;
  execution: string;
  impact: string;
}

const MODAL_DETAILS: Record<string, ModalData> = {
  "paisa-1": {
    id: "paisa-1",
    company: "5PAISA CAPITAL",
    tag: "PRODUCT EXPANSION",
    title: 'Curated "Basket Investing" & Goal-Based Discovery',
    metrics: [
      { label: "Repeat Engagement", value: "+15%", color: "text-emerald-400" },
      { label: "Portfolio Adoption", value: "+20%", color: "text-cyan-400" }
    ],
    problem: "Retail investors experienced high choice paralysis when navigating 2,000+ individual stocks and funds, leading to high drop-offs prior to completing first-time portfolio creation.",
    execution: "Partnered with the internal quantitative research team to structure algorithmic, thematic multi-asset baskets (Momentum, Value, All-Weather Hedged). Designed the 1-click execution journey, order basket carting logic, and rebalancing alert systems.",
    impact: "Drove a 15% lift in repeat investor engagement within 60 days of release and accelerated new user multi-asset portfolio adoption by 20% across mobile and web."
  },
  "paisa-2": {
    id: "paisa-2",
    company: "5PAISA CAPITAL",
    tag: "GENAI OPERATIONS",
    title: "LLM-Powered Investor Support Copilot",
    metrics: [
      { label: "Response Time (12m ➔ <30s)", value: "70% ↓", color: "text-cyan-400" },
      { label: "Tier-1 Queries Automated", value: "60%+", color: "text-emerald-400" }
    ],
    problem: "High-volume repetitive queries regarding order status, fund withdrawals, ledger explanations, and margin pledges overwhelmed human support agents, creating 12-minute queues during market hours.",
    execution: "Architected conversational user journeys using LLM intent parsing, connected the bot directly to transactional trade ledger APIs for verified responses, and engineered guardrails with warm human agent handoffs for complex cases.",
    impact: "Compressed average first-response latency by 70% (from 12 mins to under 30 secs) and automated 60%+ of Tier-1 queries without agent escalation, dramatically cutting support operating overhead."
  },
  "paisa-3": {
    id: "paisa-3",
    company: "5PAISA CAPITAL",
    tag: "GROWTH & CONVERSION",
    title: "Mutual Fund Compare & Decision Benchmarking Tools",
    metrics: [
      { label: "User Conversion Lift", value: "+3%", color: "text-amber-400" },
      { label: "Benchmarking Index", value: "NIFTY 50", color: "text-emerald-400" }
    ],
    problem: "Prelogin funnel analysis revealed severe drops on mutual fund detail pages. Users lacked intuitive benchmarking against indices like Nifty50 or comparable category peers, leading to second thoughts and abandonment.",
    execution: "Built the product PRD for an integrated MF Comparison Engine. Added side-by-side performance metrics (Alpha, Beta, Sharpe Ratio, Expense Ratio) and index relative performance charts.",
    impact: "Unlocked an immediate 3% increase in investor conversion from discovery to order placement and increased mutual fund explore engagement time by 18%."
  },
  "paisa-4": {
    id: "paisa-4",
    company: "5PAISA CAPITAL",
    tag: "HIGH-FREQUENCY TRADING",
    title: "Scalper Terminal, Margin Trading (MTF) & Pre-Login Journeys",
    metrics: [
      { label: "Engagement Lift", value: "+5–7%", color: "text-purple-400" },
      { label: "Funnel Conversion", value: "+3%", color: "text-emerald-400" }
    ],
    problem: "High-volume intraday and F&O traders experienced friction with traditional multi-step order windows, while MTF (Margin Trading Facility) discovery was hidden deep within desktop submenus.",
    execution: "Led user research and designed the specialized 1-click Scalper Page, enabling instant hotkey execution for index options. Redesigned the dedicated MTF discovery flow with transparent 4x leverage calculators and revamped prelogin landing behavior.",
    impact: "Boosted overall platform trading engagement by 5–7% and achieved a 3% uplift in new user conversion to active funded traders."
  },
  "paisa-5": {
    id: "paisa-5",
    company: "5PAISA CAPITAL",
    tag: "DISTRIBUTION NETWORK",
    title: "Partner Ecosystem & Self-Service Digital KYC Portal",
    metrics: [
      { label: "Partners Onboarded", value: "500+", color: "text-emerald-400" },
      { label: "Digital KYC Turnaround", value: "<15 Mins", color: "text-cyan-400" }
    ],
    problem: "Partner and sub-broker onboarding was hindered by offline paperwork, manual verification delays of 5–7 days, and fragmented tracking for partner commissions and client mapping.",
    execution: "Led the complete revamp of the partner portal experience. Implemented instant API-based identity checks (PAN/Aadhaar/Digilocker), automated agreement e-signing, and real-time dashboard analytics for sub-broker commission reconciliation.",
    impact: "Enabled onboarding of 500+ distribution partners with turnaround time reduced from 7 days to under 15 minutes, significantly expanding distribution reach."
  },
  "edme-1": {
    id: "edme-1",
    company: "EDME INSURANCE BROKER",
    tag: "0→1 PLATFORMS",
    title: "0→1 AI Insurance Platforms: CMS & PAS Rollout",
    metrics: [
      { label: "Operational Efficiency", value: "+50%", color: "text-cyan-400" },
      { label: "Manual Effort Slashed", value: "10% ↓", color: "text-emerald-400" }
    ],
    problem: "Insurance claims and policy operations relied on fragmented legacy spreadsheets, physical discharge documents, and slow email trails across internal teams and third-party insurers.",
    execution: "Spearheaded the 0→1 build of two scalable platforms: Claims Management System (CMS) and Policy Administration System (PAS). Integrated GenAI OCR document parsing to automatically ingest, extract, and categorize complex medical and motor insurance discharge summaries.",
    impact: "Improved overall operational efficiency by 50% and slashed manual data entry effort by 10% across claims, policy issuance, and underwriting operations teams."
  },
  "edme-2": {
    id: "edme-2",
    company: "EDME INSURANCE BROKER",
    tag: "CROSS-FUNCTIONAL EXECUTION",
    title: "AI Roadmap Prioritization & Zero-Loss Data Migration",
    metrics: [
      { label: "On-Schedule Releases", value: "6+", color: "text-purple-400" },
      { label: "Reporting Accuracy", value: "+30%", color: "text-cyan-400" }
    ],
    problem: "Migrating high volumes of historical insurance policies from Aditya Birla legacy data stores carried high risk of reporting discrepancies, broken schema mappings, and sprint deadline slippages.",
    execution: "Owned end-to-end sprint planning, user acceptance testing (UAT), and stakeholder management. Employed AI-proposed schema and field-mapping transformations to reconcile inconsistent legacy database records into normalized relational entities.",
    impact: "Delivered 6+ product releases strictly on schedule and improved backend regulatory and management reporting accuracy by 30% throughout the platform transition."
  },
  "edme-3": {
    id: "edme-3",
    company: "EDME INSURANCE BROKER",
    tag: "FINANCIAL AUTOMATION",
    title: "0→1 Self-Learning Reconciliation Engine & Policy Lifecycle",
    metrics: [
      { label: "Reconciliation Turnaround", value: "-45%", color: "text-emerald-400" },
      { label: "Errors Eliminated", value: "90%+", color: "text-cyan-400" }
    ],
    problem: "Manual policy reconciliation between multi-insurer payout statements and internal booking registers took weeks, suffering from high human entry error and missing commission accruals.",
    execution: "Architected the 0→1 Policy Administration System covering policy registration, booking, automated invoice generation, and cancellation. Designed an AI-driven self-learning reconciliation feedback loop that learns from every human-resolved exception.",
    impact: "Slashed financial reconciliation turnaround time by 45% and eliminated 90%+ of operational processing errors, unlocking real-time financial audit readiness."
  }
};

const Experience: React.FC = () => {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  // Micro-UI State Simulators
  const [basketState, setBasketState] = useState<"idle" | "loading" | "ordered">("idle");
  const [botPromptState, setBotPromptState] = useState<"default" | "margin" | "withdrawal">("default");
  const [botLoading, setBotLoading] = useState(false);
  const [mfHorizon, setMfHorizon] = useState<"1Y" | "3Y" | "5Y">("3Y");
  const [scalperPrice, setScalperPrice] = useState("₹142.50 (+18.4%)");
  const [scalperFeedback, setScalperFeedback] = useState<string | null>(null);

  // 1. AUTO-CAROUSEL EFFECT (for 5Paisa)
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      if (!carouselRef.current) return;
      const el = carouselRef.current;
      const card = el.querySelector(".carousel-slide-3up") as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : 380;
      const maxScroll = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 3600);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  // 2. LIVE SCALPER TICKER SIMULATOR
  useEffect(() => {
    const prices = [
      "₹142.50 (+18.4%)",
      "₹143.10 (+18.9%)",
      "₹142.85 (+18.7%)",
      "₹143.40 (+19.1%)",
      "₹142.95 (+18.8%)"
    ];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % prices.length;
      setScalperPrice(prices[idx]);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  // 3. KEYBOARD ESCAPE TO CLOSE MODAL
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModalId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleManualScroll = (direction: -1 | 1) => {
    setIsCarouselPaused(true);
    if (carouselRef.current) {
      const card = carouselRef.current.querySelector(".carousel-slide-3up") as HTMLElement | null;
      const step = card ? card.offsetWidth + 24 : 380;
      carouselRef.current.scrollBy({ left: direction * step, behavior: "smooth" });
    }
    setTimeout(() => setIsCarouselPaused(false), 4500);
  };

  const handleBasketClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBasketState("loading");
    setTimeout(() => {
      setBasketState("ordered");
      setTimeout(() => setBasketState("idle"), 3000);
    }, 600);
  };

  const handleBotPrompt = (type: "margin" | "withdrawal", e: React.MouseEvent) => {
    e.stopPropagation();
    setBotPromptState(type);
    setBotLoading(true);
    setTimeout(() => {
      setBotLoading(false);
    }, 550);
  };

  const handleScalperClick = (type: "BUY" | "SELL", e: React.MouseEvent) => {
    e.stopPropagation();
    setScalperFeedback(`${type} Sent (62ms)`);
    setTimeout(() => {
      setScalperFeedback(null);
    }, 1200);
  };

  const activeModal = activeModalId ? MODAL_DETAILS[activeModalId] : null;

  return (
    <section id="experience" className="py-24 relative z-10 bg-[#08090C] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 mb-3.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
              CAREER &amp; PRODUCT IMPACT
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-3">
            Experience
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-normal">
            A tactile showcase of shipped initiatives — from high-velocity trading terminals and LLM query engines to 0→1 insurance lifecycle automation.
          </p>
        </div>


        {/* ======================================================================== */}
        {/* COMPANY 01: 5PAISA CAPITAL LTD (AUTO-CAROUSEL 3-UP) */}
        {/* ======================================================================== */}
        <div 
          className="rounded-3xl p-6 sm:p-9 relative overflow-hidden border border-white/10 shadow-2xl mb-14"
          style={{ background: 'linear-gradient(180deg, rgba(16, 22, 35, 0.88) 0%, rgba(10, 14, 23, 0.96) 100%)' }}
        >
          
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-7 border-b border-white/10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/10">
                <span className="font-display font-black text-2xl text-emerald-400">5P</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    FINTECH · WEALTHTECH
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    DISCOUNT BROKERAGE
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-1">
                    <span>📍 Mumbai, India</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  5paisa Capital Ltd
                </h3>
                <p className="text-emerald-400 font-semibold text-sm sm:text-base mt-0.5">
                  Associate Product Manager <span className="text-slate-500 font-normal">· Nov 2024 — Sept 2025</span>
                </p>
              </div>
            </div>

            {/* Macro Telemetry Deck */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-emerald-400">+15%</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Repeat Investor</div>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-cyan-400">&lt;30s</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Response Time</div>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-amber-400">60%+</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Bot Automated</div>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-purple-400">500+</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Partners Ingested</div>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-5 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Shipped Initiatives (5 Cards)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-[11px] font-mono font-medium">
                <span className={`w-2 h-2 rounded-full ${isCarouselPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping'}`}></span>
                <span>{isCarouselPaused ? "Paused (Reading)" : "Auto-Scrolling Left"}</span>
                <span className="text-[9px] text-slate-500 font-sans hidden sm:inline">(Hover to pause)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleManualScroll(-1)} 
                className="p-2 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-colors" 
                title="Previous Card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleManualScroll(1)} 
                className="p-2 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-slate-400 hover:text-emerald-400 transition-colors" 
                title="Next Card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5Paisa Carousel Track (Exactly 3 cards visible at a time on desktop) */}
          <div 
            ref={carouselRef}
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onTouchStart={() => setIsCarouselPaused(true)}
            onTouchEnd={() => setTimeout(() => setIsCarouselPaused(false), 2000)}
            className="carousel-container flex gap-6 overflow-x-auto pb-5 pt-2 -mx-2 px-2 scroll-smooth"
          >

            {/* CARD 1: BASKET INVESTING */}
            <article 
              onClick={() => setActiveModalId("paisa-1")}
              className="carousel-slide carousel-slide-3up experience-card shrink-0 rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                    <Layers className="w-3 h-3 text-emerald-400" />
                    THEMATIC BASKET
                  </span>
                  <span className="font-hand text-amber-300 text-xs bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ 40+ user interviews
                  </span>
                </div>
                
                <div className="rounded-xl p-3 shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🧺</span>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">Tech Momentum 2025</div>
                        <div className="text-[10px] text-slate-400 font-mono">4 Equities + 1 Gold ETF</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-emerald-400">+24.8%</div>
                      <div className="text-[9px] text-slate-500">3Y CAGR</div>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2.5">
                    <div className="relative h-2 w-full rounded-full bg-white/5 overflow-hidden flex cursor-pointer">
                      <div className="bg-emerald-400 h-full w-[45%] relative" title="Large Cap 45%">
                        <div className="shimmer-layer"></div>
                      </div>
                      <div className="bg-cyan-400 h-full w-[35%] relative" title="Tech 35%">
                        <div className="shimmer-layer"></div>
                      </div>
                      <div className="bg-amber-400 h-full w-[20%] relative" title="Gold Hedge 20%">
                        <div className="shimmer-layer"></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-slate-400">
                      <span className="text-emerald-400">Large Cap 45%</span>
                      <span className="text-cyan-400">Tech 35%</span>
                      <span className="text-amber-400">Gold 20%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-slate-500">Min. ₹5,000</span>
                    <button 
                      onClick={handleBasketClick}
                      className="text-[10px] font-bold bg-emerald-500 text-slate-950 px-2.5 py-1 rounded-md flex items-center gap-1 hover:bg-emerald-400 active:scale-95 transition-all shadow-xs"
                    >
                      <span>
                        {basketState === "loading" ? "Routing..." : basketState === "ordered" ? "✓ Executed (38ms)" : "Invest in 1-Click →"}
                      </span>
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-emerald-300 transition-colors">
                    ↳ 1-click carting cut checkout drop-off by 34%!
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>⚡</span> +15% Repeat Engagement
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span>📈</span> +20% Adoption
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
                    Curated "Basket Investing" &amp; Multi-Asset Discovery
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Partnered with quantitative research to launch 1-click theme-based Basket Investing — turning single-instrument confusion into diversified goal-driven portfolios for retail users.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

            {/* CARD 2: CUTE LLM SUPPORT BOT */}
            <article 
              onClick={() => setActiveModalId("paisa-2")}
              className="carousel-slide carousel-slide-3up experience-card shrink-0 rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-xs bot-bob shadow-xs">
                      <Bot className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold">
                      AI INVESTOR COPILOT
                    </span>
                  </div>
                  <span className="font-hand text-emerald-300 text-xs bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ 12m ➔ 28s queue drop!
                  </span>
                </div>

                <div className="rounded-xl p-3 space-y-2 text-[10px] shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center gap-1 text-[9px] font-mono overflow-x-auto pb-0.5 text-slate-400">
                    <span className="text-slate-500 shrink-0">Try prompt:</span>
                    <button 
                      onClick={(e) => handleBotPrompt("margin", e)} 
                      className={`px-1.5 py-0.5 rounded border shrink-0 transition-colors font-medium ${botPromptState === 'margin' ? 'bg-cyan-800/80 border-cyan-400 text-cyan-200' : 'bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border-cyan-500/30'}`}
                    >
                      MTF Limit?
                    </button>
                    <button 
                      onClick={(e) => handleBotPrompt("withdrawal", e)} 
                      className={`px-1.5 py-0.5 rounded border shrink-0 transition-colors font-medium ${botPromptState === 'withdrawal' ? 'bg-cyan-800/80 border-cyan-400 text-cyan-200' : 'bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border-cyan-500/30'}`}
                    >
                      Instant Payout?
                    </button>
                  </div>

                  <div className="space-y-1.5 min-h-[70px]">
                    <div className="flex items-end justify-end gap-1">
                      <div className="bg-white/10 text-slate-200 rounded-lg rounded-tr-none px-2.5 py-1 text-[10px] max-w-[85%] border border-white/5">
                        {botPromptState === "withdrawal" 
                          ? "Can I get instant fund payout to HDFC?" 
                          : "How do I pledge shares for MTF limit?"}
                      </div>
                    </div>

                    <div className="flex items-start gap-1.5">
                      <div className="w-4 h-4 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">🤖</div>
                      <div className="bg-cyan-950/40 border border-cyan-500/30 rounded-lg rounded-tl-none p-2 text-[10px] text-cyan-100 leading-tight max-w-[88%]">
                        {botLoading ? (
                          <div className="flex items-center gap-1.5 py-1 text-cyan-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                            <span className="text-[9px] font-mono">Querying transactional ledger...</span>
                          </div>
                        ) : botPromptState === "withdrawal" ? (
                          <>
                            <span className="text-emerald-300 font-semibold block mb-0.5">Instant IMPS Available:</span>
                            Withdrawable balance ₹34,500. Credits to HDFC within 3 minutes with zero fees!
                          </>
                        ) : (
                          <>
                            <span className="text-cyan-300 font-semibold block mb-0.5">Instant MTF Pledge:</span>
                            Go to Portfolio &gt; Pledge. Margin unlocked in &lt;10s via CDSL OTP!
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] font-mono text-slate-500 pt-1 border-t border-white/5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Tier-1 Autonomous
                    </span>
                    <span className="text-emerald-400 font-semibold">98.6% Accuracy</span>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                    ↳ 60%+ Tier-1 tickets solved autonomously
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span>⏱️</span> 70% ↓ First-Response
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>🤖</span> 60%+ Automated
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    LLM Support Copilot &amp; Real-Time Query Bot
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Designed and rolled out an LLM-powered support bot, dropping first-response time from 12 minutes to under 30 seconds and automating 60%+ of Tier-1 investor tickets.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

            {/* CARD 3: MF COMPARE & BENCHMARKING */}
            <article 
              onClick={() => setActiveModalId("paisa-3")}
              className="carousel-slide carousel-slide-3up experience-card shrink-0 rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-amber-500/50 hover:shadow-amber-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-amber-400 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3 h-3 text-amber-400" />
                    BENCHMARK ENGINE
                  </span>
                  <span className="font-hand text-cyan-300 text-xs bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ Solved search drop-off
                  </span>
                </div>

                <div className="rounded-xl p-2.5 text-[10px] font-mono shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-slate-400 font-sans text-[11px]">Quant Active vs Nifty</span>
                    <div className="flex items-center gap-1 bg-white/5 p-0.5 rounded-md border border-white/5">
                      {(["1Y", "3Y", "5Y"] as const).map((h) => (
                        <button 
                          key={h}
                          onClick={(e) => { e.stopPropagation(); setMfHorizon(h); }} 
                          className={`px-1.5 py-0.5 rounded text-[9px] transition-colors font-medium ${mfHorizon === h ? 'bg-amber-500/30 text-amber-300 font-bold border border-amber-500/40' : 'text-slate-400 hover:text-white'}`}
                        >
                          {h}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between py-1 border-b border-white/5 hover:bg-white/[0.02] px-1 rounded transition-colors">
                      <span className="text-slate-400 font-sans">Alpha vs Nifty</span>
                      <span className="text-emerald-400 font-bold transition-all">
                        {mfHorizon === "1Y" ? "+4.1% Alpha" : mfHorizon === "3Y" ? "+6.2% Alpha" : "+8.5% Alpha"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-white/5 hover:bg-white/[0.02] px-1 rounded transition-colors">
                      <span className="text-slate-400 font-sans">Expense Ratio</span>
                      <span className="text-cyan-400 font-semibold">0.76% <span className="text-[8px] text-slate-500">(Nifty: 0.20%)</span></span>
                    </div>
                    <div className="flex items-center justify-between py-1 hover:bg-white/[0.02] px-1 rounded transition-colors">
                      <span className="text-slate-400 font-sans">Sharpe Ratio</span>
                      <span className="text-amber-400 font-bold transition-all">
                        {mfHorizon === "1Y" ? "1.28 (Moderate)" : mfHorizon === "3Y" ? "1.42 (High Risk Adj.)" : "1.65 (Outperformer)"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-1 pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px] text-slate-500">
                    <span>Rolling Outperformance:</span>
                    <span className="text-emerald-400 font-semibold font-sans">84% of Quarters ✓</span>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-amber-300 transition-colors">
                    ↳ Empowered retail users with institutional metrics
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                      <span>🎯</span> +3% User Conversion
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>📊</span> Nifty50 Benchmark
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-amber-300 transition-colors leading-snug">
                    MF Compare &amp; Decision Benchmarking Tool
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Identified cognitive friction in fund selection and shipped side-by-side comparison metrics (Alpha, Beta, Sharpe, Expense Ratio) against Nifty50, driving a 3% conversion surge.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-amber-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

            {/* CARD 4: SCALPER & MTF PAGE */}
            <article 
              onClick={() => setActiveModalId("paisa-4")}
              className="carousel-slide carousel-slide-3up experience-card shrink-0 rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-purple-400 flex items-center gap-1 font-semibold">
                    <TrendingUp className="w-3 h-3 text-purple-400" />
                    SCALPER TERMINAL · MTF 4X
                  </span>
                  <span className="font-hand text-purple-300 text-xs bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ &lt;80ms direct socket
                  </span>
                </div>

                <div className="rounded-xl p-3 shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                      <span className="text-xs font-mono font-bold text-white">NIFTY 24,850 CALL</span>
                    </div>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all">
                      {scalperFeedback || scalperPrice}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono mb-2.5">
                    <div className="bg-white/5 rounded p-1 text-slate-300">MTF Leverage: <span className="text-purple-300 font-bold">4.0x</span></div>
                    <div className="bg-white/5 rounded p-1 text-slate-300">Latency: <span className="text-emerald-400 font-bold">&lt;80ms</span></div>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button 
                      onClick={(e) => handleScalperClick("BUY", e)} 
                      className="bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500/40 text-emerald-300 font-mono text-[10px] text-center py-1.5 rounded-md font-bold active:scale-95 transition-all shadow-xs"
                    >
                      BUY (F2)
                    </button>
                    <button 
                      onClick={(e) => handleScalperClick("SELL", e)} 
                      className="bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/40 text-rose-300 font-mono text-[10px] text-center py-1.5 rounded-md font-bold active:scale-95 transition-all shadow-xs"
                    >
                      SELL (F3)
                    </button>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-purple-300 transition-colors">
                    ↳ Co-designed alongside 25+ professional scalpers
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <span>⚡</span> +5–7% Engagement Lift
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>📈</span> +3% Funnel Conv
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-purple-300 transition-colors leading-snug">
                    Scalper Terminal, MTF &amp; Pre-Login Behavior
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Analyzed drop-off funnels in the trading journey to architect specialized Scalper execution, Margin Trading Facility (MTF) interfaces, and streamlined prelogin discovery.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-purple-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

            {/* CARD 5: PARTNER ONBOARDING PORTAL */}
            <article 
              onClick={() => setActiveModalId("paisa-5")}
              className="carousel-slide carousel-slide-3up experience-card shrink-0 rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 font-semibold">
                    <Users className="w-3 h-3 text-emerald-400" />
                    DIGITAL PARTNER PIPELINE
                  </span>
                  <span className="font-hand text-emerald-300 text-xs bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ 7 Days ➔ 15 Mins TAT
                  </span>
                </div>

                <div className="rounded-xl p-3 space-y-2 text-[10px] font-mono relative shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      1. PAN &amp; Aadhaar API
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">Auto-Verified ✓</span>
                  </div>

                  <div className="h-2 flex items-center pl-1">
                    <svg width="100%" height="8">
                      <line x1="0" y1="4" x2="100%" y2="4" stroke="#10b981" strokeWidth="1.5" className="flowing-pipeline" opacity="0.7"/>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      2. Digilocker Agreement
                    </span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/15 px-1.5 py-0.5 rounded border border-emerald-500/30">e-Signed ✓</span>
                  </div>

                  <div className="h-2 flex items-center pl-1">
                    <svg width="100%" height="8">
                      <line x1="0" y1="4" x2="100%" y2="4" stroke="#06b6d4" strokeWidth="1.5" className="flowing-pipeline" opacity="0.7"/>
                    </svg>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      3. Sub-Broker ID Release
                    </span>
                    <span className="text-cyan-300 font-bold bg-cyan-500/15 px-1.5 py-0.5 rounded border border-cyan-500/30">Instant (&lt;5m) ✓</span>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-emerald-300 transition-colors">
                    ↳ Replaced 14-page physical courier loop
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>🤝</span> 500+ Partners Onboarded
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span>📱</span> Self-Serve Portal
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
                    Partner Ecosystem &amp; Self-Serve Portal Overhaul
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Simplified partner onboarding workflows and redesigned the digital portal, eliminating offline paperwork and unlocking rapid onboarding of 500+ distribution partners.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

          </div>
        </div>


        {/* ======================================================================== */}
        {/* COMPANY 02: EDME INSURANCE BROKER (STATIC 3-COLUMN STUDIO GRID) */}
        {/* ======================================================================== */}
        <div 
          className="rounded-3xl p-6 sm:p-9 relative overflow-hidden border border-white/10 shadow-2xl"
          style={{ background: 'linear-gradient(180deg, rgba(16, 22, 35, 0.88) 0%, rgba(10, 14, 23, 0.96) 100%)' }}
        >
          
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-7 border-b border-white/10">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
                <span className="font-display font-black text-2xl text-cyan-400">ED</span>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    INSURTECH · 0→1 PLATFORMS
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md font-mono text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    FORMERLY ADITYA BIRLA INSURANCE
                  </span>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1 ml-1">
                    <span>📍 India</span>
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                  Edme Insurance Broker
                </h3>
                <p className="text-cyan-400 font-semibold text-sm sm:text-base mt-0.5">
                  Associate Product Manager <span className="text-slate-500 font-normal">· Dec 2025 — June 2026</span>
                </p>
              </div>
            </div>

            {/* Macro Telemetry Deck */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-cyan-400">+50%</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Ops Efficiency</div>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-emerald-400">-45%</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Recon Turnaround</div>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-amber-400">90%+</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">Errors Eliminated</div>
              </div>
              <div className="px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                <div className="text-lg sm:text-xl font-bold font-display text-purple-400">6+</div>
                <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">On-Time Releases</div>
              </div>
            </div>
          </div>

          {/* Subheader */}
          <div className="flex items-center justify-between pt-5 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">Shipped Platform Modules (3 Cards Displayed Side-by-Side)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span>
            </div>
            <span className="text-[11px] font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-500/25 px-2.5 py-0.5 rounded-full font-medium hidden sm:inline">
              Static 3-Column Studio Layout
            </span>
          </div>

          {/* 3-Column Responsive Grid (No Carousel needed for Edme) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-1">

            {/* EDME CARD 1: 0->1 DUAL AI PLATFORMS WITH LASER SCANNER */}
            <article 
              onClick={() => setActiveModalId("edme-1")}
              className="experience-card rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-cyan-500/50 hover:shadow-cyan-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 font-semibold">
                    <FileText className="w-3 h-3 text-cyan-400" />
                    GENAI DOCUMENT OCR
                  </span>
                  <span className="font-hand text-cyan-300 text-xs bg-cyan-500/15 border border-cyan-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ Saved ops 4.5 hrs/day!
                  </span>
                </div>

                <div className="relative rounded-xl p-3 space-y-2 text-[10px] font-mono overflow-hidden shadow-inner bg-[#080d16] border border-white/10">
                  <div className="laser-beam"></div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
                    <span className="text-slate-400 flex items-center gap-1">
                      <span className="text-xs">📄</span> Ingest:
                    </span>
                    <span className="text-slate-200 font-semibold truncate max-w-[170px]">Claim_Discharge_904.pdf</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-cyan-950/40 border border-cyan-500/20 p-1.5 rounded">
                      <div className="text-[9px] text-slate-400">Policy Matched:</div>
                      <div className="text-cyan-300 font-bold truncate">POL-88412-G</div>
                    </div>
                    <div className="bg-emerald-950/40 border border-emerald-500/20 p-1.5 rounded">
                      <div className="text-[9px] text-slate-400">Claim Amount:</div>
                      <div className="text-emerald-400 font-bold">₹2,45,000</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[9px]">
                    <span className="text-slate-400">Extraction Confidence:</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      99.4% Verified
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                    ↳ Automated claims triage across 4 hospital networks
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span>🚀</span> +50% Ops Efficiency
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>📉</span> 10% ↓ Manual Effort
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    0→1 AI Insurance Platforms: CMS &amp; PAS Rollout
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Led the 0→1 build of two AI-enabled platforms (Claims Management &amp; Policy Administration), utilizing GenAI document extraction to unify fragmented operations and cut manual effort by 10%.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

            {/* EDME CARD 2: ROADMAP EXECUTION & DATA MIGRATION */}
            <article 
              onClick={() => setActiveModalId("edme-2")}
              className="experience-card rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-purple-500/50 hover:shadow-purple-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-purple-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-purple-400" />
                    AI SPRINT VELOCITY
                  </span>
                  <span className="font-hand text-purple-300 text-xs bg-purple-500/15 border border-purple-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ 180k+ policies migrated!
                  </span>
                </div>

                <div className="rounded-xl p-3 space-y-2 text-[10px] font-mono shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Release Execution:</span>
                    <span className="text-emerald-400 font-bold">6/6 On Schedule (100%)</span>
                  </div>
                  
                  <div className="relative w-full bg-white/5 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 h-full w-[100%] relative">
                      <div className="shimmer-layer"></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-[8px] text-slate-500 pt-0.5">
                    <span>R1: Ingestion</span>
                    <span>R3: UAT</span>
                    <span>R6: Live Migration</span>
                  </div>

                  <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px]">
                    <span className="text-slate-500">Schema Field Mapping:</span>
                    <span className="text-cyan-400 font-bold">+30% Reporting Accuracy</span>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-purple-300 transition-colors">
                    ↳ Zero data loss across multi-tier insurance tables
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <span>🗓️</span> 6+ Releases On Schedule
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span>📊</span> +30% Accuracy
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    AI Roadmap Prioritization &amp; Zero-Loss Data Migration
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Delivered 6+ product releases on schedule owning AI sprint prioritization, stakeholder UAT, and backend data migration using AI-proposed schema and field-mapping.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

            {/* EDME CARD 3: RECONCILIATION ENGINE */}
            <article 
              onClick={() => setActiveModalId("edme-3")}
              className="experience-card rounded-2xl overflow-hidden flex flex-col bg-[#0e131f]/95 border border-white/10 shadow-lg hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all cursor-pointer group"
            >
              <div className="border-b border-white/10 p-4" style={{ background: 'linear-gradient(180deg, #131a29 0%, #0c101a 100%)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-semibold">
                    <RefreshCw className="spin-sync w-3.5 h-3.5 text-emerald-400" />
                    SELF-LEARNING RECON
                  </span>
                  <span className="font-hand text-emerald-300 text-xs bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md font-bold shadow-xs">
                    ✏️ -45% TAT · 90% errors gone
                  </span>
                </div>

                <div className="rounded-xl p-3 space-y-2 text-[10px] font-mono shadow-inner bg-[#080d16] border border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Auto-Matched Ledger:</span>
                    <span className="text-emerald-400 font-bold">₹1.82 Cr (99.8%)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">Exceptions Auto-Cleared:</span>
                    <span className="text-cyan-400 font-bold">142 Cases</span>
                  </div>
                  <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[9px]">
                    <span className="text-slate-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Active Feedback Loop:
                    </span>
                    <span className="text-emerald-400 font-bold">Self-Healing 🔁</span>
                  </div>
                </div>

                <div className="mt-2 text-right">
                  <span className="font-hand text-[13px] text-slate-400 group-hover:text-emerald-300 transition-colors">
                    ↳ AI learns from every manual accountant fix
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>⏱️</span> -45% Turnaround
                    </span>
                    <span className="px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <span>🛡️</span> 90%+ Errors Eliminated
                    </span>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-display text-white mb-2 group-hover:text-cyan-300 transition-colors leading-snug">
                    0→1 Policy Administration (PAS) &amp; AI Self-Learning Recon
                  </h4>

                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Automated the complete policy lifecycle (booking to cancellation) and architected an AI reconciliation feedback loop, slashing TAT by 45% and eliminating 90%+ errors.
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-cyan-400">
                  <span className="flex items-center gap-1">
                    Explore Case Breakdown
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">Expand Details</span>
                </div>
              </div>
            </article>

          </div>
        </div>

      </div>

      {/* ======================================================================== */}
      {/* DEEP-DIVE MODAL DRAWER (SLEEK DARK FINTECH GLASS) */}
      {/* ======================================================================== */}
      {activeModal && (
        <div 
          onClick={() => setActiveModalId(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0e1422] border border-white/10 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto text-white"
          >
            <button 
              onClick={() => setActiveModalId(null)}
              className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                {activeModal.company}
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs font-mono text-slate-400">{activeModal.tag}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-4">
              {activeModal.title}
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {activeModal.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className={`text-xl font-bold font-display ${m.color}`}>{m.value}</div>
                  <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <div>
                <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">THE CORE PROBLEM</h5>
                <p className="text-slate-400">{activeModal.problem}</p>
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">MY ROLE &amp; PM EXECUTION</h5>
                <p className="text-slate-400">{activeModal.execution}</p>
              </div>
              <div>
                <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">QUANTIFIABLE BUSINESS IMPACT</h5>
                <p className="text-slate-400">{activeModal.impact}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default Experience;
