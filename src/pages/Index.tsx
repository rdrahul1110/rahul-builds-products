import React, { useState, useEffect, useRef } from "react";

interface ModalData {
  eyebrow: string;
  title: string;
  problem: string;
  whatIDid: string;
  whatHappened: string;
}

const Ticket = ({
  target,
  prefix = "",
  suffix = "",
  label,
  className = "",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          if (prefersReducedMotion) {
            setCount(target);
            return;
          }
          const dur = 1200;
          let start: number | null = null;
          const step = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className={`ticket ${className}`}>
      <span className="ticket__num">
        {prefix}
        {hasAnimated ? count : target}
        {suffix}
      </span>
      <span className="ticket__label">{label}</span>
    </div>
  );
};

const CoStat = ({
  target,
  prefix = "",
  suffix = "",
  label,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          if (prefersReducedMotion) {
            setCount(target);
            return;
          }
          const dur = 1200;
          let start: number | null = null;
          const step = (t: number) => {
            if (!start) start = t;
            const p = Math.min((t - start) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="co-stat-card">
      <b>
        {prefix}
        {hasAnimated ? count : target}
        {suffix}
      </b>
      <small>{label}</small>
    </div>
  );
};

// Confetti burst utility using cutting-mat brand palette
const triggerConfetti = (originX: number, originY: number) => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    if (document.body.contains(canvas)) document.body.removeChild(canvas);
    return;
  }

  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);

  // Brand palette: green, pink, yellow, paper, ink
  const colors = ["#236b4b", "#f2679b", "#ffe27a", "#fbf6ea", "#1c1b19"];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    w: number;
    h: number;
    rotation: number;
    rotSpeed: number;
    color: string;
    opacity: number;
  }> = [];

  for (let i = 0; i < 48; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2.5 + Math.random() * 6.5;
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      w: 6 + Math.random() * 7,
      h: 4 + Math.random() * 4,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    });
  }

  let startTime: number | null = null;
  const duration = 1600;

  const frame = (time: number) => {
    if (!startTime) startTime = time;
    const elapsed = time - startTime;
    const progress = elapsed / duration;

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.vx *= 0.98;
      p.rotation += p.rotSpeed;
      p.opacity = Math.max(0, 1 - progress);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(frame);
    } else {
      if (document.body.contains(canvas)) {
        document.body.removeChild(canvas);
      }
    }
  };

  requestAnimationFrame(frame);
};

const Index: React.FC = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalData | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [showBackTop, setShowBackTop] = useState<boolean>(false);

  const heroPhotoRef = useRef<HTMLDivElement>(null);
  const stickyNoteRef = useRef<HTMLDivElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Parallax on hero photo/sticky note & Back-to-Top visibility
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY;
          if (y < 750) {
            if (heroPhotoRef.current) {
              heroPhotoRef.current.style.transform = `translateY(${y * 0.12}px)`;
            }
            if (stickyNoteRef.current) {
              stickyNoteRef.current.style.transform = `translateY(${y * -0.07}px) rotate(5deg)`;
            }
          }
          setShowBackTop(y > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy active nav link
  useEffect(() => {
    const sectionIds = ["focus", "experience", "built", "teardowns", "ai", "about"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll-triggered entrance animations (.reveal)
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -40px 0px",
        threshold: 0.08,
      }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleCopyEmail = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      triggerConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    } else {
      triggerConfetti(window.innerWidth / 2, window.innerHeight / 2);
    }

    const email = "rahul4ever2011@gmail.com";
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 1800);
        })
        .catch(() => {
          window.location.href = `mailto:${email}`;
        });
    } else {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="relative min-h-screen text-[#1c1b19]">
      {/* Ruler Decoration */}
      <div className="ruler" aria-hidden="true" />

      {/* SVG Mat Guides */}
      <svg
        className="mat-guides"
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox="0 0 1000 1000"
      >
        <line x1="0" y1="1000" x2="1000" y2="0" />
        <line x1="0" y1="0" x2="1000" y2="1000" />
        <line x1="0" y1="1000" x2="577" y2="0" />
        <circle cx="1000" cy="1000" r="260" />
        <circle cx="1000" cy="1000" r="180" />
      </svg>

      {/* Sticky Header Nav */}
      <header className="nav">
        <a className="nav__logo" href="#top">
          Rahul Das<span>.</span>
        </a>
        <button
          className="nav__toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={navOpen}
          onClick={() => setNavOpen(!navOpen)}
        >
          Menu
        </button>
        <nav className={`nav__links ${navOpen ? "open" : ""}`}>
          <a
            href="#focus"
            className={activeSection === "focus" ? "active" : ""}
            onClick={() => setNavOpen(false)}
          >
            Fintech × AI
          </a>
          <a
            href="#experience"
            className={activeSection === "experience" ? "active" : ""}
            onClick={() => setNavOpen(false)}
          >
            Experience
          </a>
          <a
            href="#built"
            className={activeSection === "built" ? "active" : ""}
            onClick={() => setNavOpen(false)}
          >
            Built
          </a>
          <a
            href="#teardowns"
            className={activeSection === "teardowns" ? "active" : ""}
            onClick={() => setNavOpen(false)}
          >
            Teardowns
          </a>
          <a
            href="#ai"
            className={activeSection === "ai" ? "active" : ""}
            onClick={() => setNavOpen(false)}
          >
            AI
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
            onClick={() => setNavOpen(false)}
          >
            About
          </a>
          <a
            className="nav__cta"
            href="https://docs.google.com/document/d/1B50cdCZgtqYdsdUDB9HLjpUGYYblGIF6j34-nf3gZyM/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume
          </a>
        </nav>
      </header>

      {/* Main Cutting Mat Content */}
      <main id="top" className="main-content">
        {/* ============ HERO ============ */}
        <section className="hero">
          <div className="hero__text">
            <p className="mat-label">Fintech × AI Product Manager · India</p>
            <p className="hero__hi">Hi, I'm Rahul. I spend my time</p>
            <h1 className="hero__title">
              Transforming Complex Problems into Products &amp; AI Solutions.
            </h1>
            <p className="focus" aria-label="Fintech and AI">
              <span>Fintech</span>
              <b>×</b>
              <span className="ai">AI</span>
            </p>
            <p className="hero__lede">
              AI-native product manager turning messy workflows into simple,
              measurable products. Building practical solutions across fintech,
              insurtech, and zero-to-one development.
            </p>
            <p className="status">
              <i></i> Open to AI PM / APM roles
            </p>
            <div className="hero__actions">
              <a className="btn btn--red" href="#experience">
                Explore my work
              </a>
              <a
                className="btn btn--line"
                href="https://docs.google.com/document/d/1B50cdCZgtqYdsdUDB9HLjpUGYYblGIF6j34-nf3gZyM/edit?tab=t.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                View resume
              </a>
            </div>
          </div>

          <div className="hero__photo" ref={heroPhotoRef}>
            <img
              src="/photo.jpeg"
              alt="Rahul Das standing by a lake with hills behind him"
              width={1280}
              height={1143}
            />
            <div className="sticky-note" ref={stickyNoteRef}>
              <strong>Education: BITS Pilani</strong>
              <span>
                B.Tech, Birla Institute of Technology and Science · Nov 2020 –
                Aug 2024
              </span>
            </div>
          </div>
        </section>

        {/* ============ MARQUEE ============ */}
        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            <span>Fintech infrastructure × Applied AI</span>
            <span className="dot">●</span>
            <span>Open to high-impact PM roles</span>
            <span className="dot">●</span>
            <span>Ledger recon</span>
            <span className="dot">●</span>
            <span>Agentic workflows</span>
            <span className="dot">●</span>
            <span>LLM evals</span>
            <span className="dot">●</span>
            <span>0→1 platforms</span>
            <span className="dot">●</span>
            <span>Fintech infrastructure × Applied AI</span>
            <span className="dot">●</span>
            <span>Open to high-impact PM roles</span>
            <span className="dot">●</span>
            <span>Ledger recon</span>
            <span className="dot">●</span>
            <span>Agentic workflows</span>
            <span className="dot">●</span>
            <span>LLM evals</span>
            <span className="dot">●</span>
            <span>0→1 platforms</span>
            <span className="dot">●</span>
          </div>
        </div>

        {/* ============ NUMBERS ============ */}
        <section className="tickets" aria-label="Highlights">
          <Ticket
            target={50}
            prefix="+"
            suffix="%"
            label="operational efficiency from the 0→1 claims & policy platforms at Edme"
          />
          <Ticket
            target={60}
            suffix="%+"
            label="of Tier-1 investor tickets solved by the LLM support bot at 5paisa"
            className="ticket--red"
          />
          <Ticket
            target={500}
            suffix="+"
            label="distribution partners onboarded after the portal overhaul"
            className="ticket--ink"
          />
          <Ticket
            target={99}
            suffix="%"
            label="payment verification accuracy at Liquidmind AI"
          />
        </section>

        {/* ============ FINTECH × AI ============ */}
        <section id="focus" className="section">
          <div className="label-card">
            <p className="eyebrow">Where I work</p>
            <h2>
              Fintech infrastructure, <em>meet applied AI</em>.
            </h2>
            <p>
              Money moving through ledgers, trades and checkouts on one side;
              LLMs, agents and automation on the other. My best work sits where
              they overlap.
            </p>
          </div>
          <div className="venn">
            <article className="paper tilt-l">
              <p className="eyebrow" style={{ color: "var(--ink)" }}>
                Fintech
              </p>
              <h3>Where the money moves</h3>
              <ul>
                <li>Trading: scalper terminal, MTF, basket investing</li>
                <li>Mutual fund benchmarking against Nifty 50</li>
                <li>Checkout: Pay Later, split &amp; instant pay</li>
                <li>Payment verification &amp; webhooks at 99%</li>
                <li>Digital KYC for 500+ partners</li>
              </ul>
            </article>
            <article className="paper both">
              <span
                className="tape"
                style={{ background: "rgba(251,246,234,.55)" }}
              ></span>
              <p className="eyebrow">Fintech × AI</p>
              <h3>The overlap</h3>
              <ul>
                <li>
                  LLM investor copilot wired to trade ledger APIs: 60%+ of Tier-1
                  tickets automated
                </li>
                <li>
                  Self-learning recon engine: -45% turnaround, 90%+ errors gone
                </li>
                <li>Insurance Co-Pilot &amp; Money Wrapped prototypes</li>
              </ul>
              <span className="case__note" style={{ marginTop: "12px" }}>
                where I do my best work
              </span>
            </article>
            <article className="paper tilt-r">
              <p className="eyebrow">AI</p>
              <h3>Where the work gets automated</h3>
              <ul>
                <li>GenAI OCR for claims: +50% ops efficiency</li>
                <li>AI-proposed schema mapping for 180k+ policies</li>
                <li>n8n multi-agent interview coach</li>
                <li>LLM evals, prompt design, MCP workflows</li>
                <li>TripMind &amp; other live AI prototypes, built 0→1</li>
              </ul>
            </article>
          </div>
        </section>

        {/* ============ METHOD ============ */}
        <section id="method" className="section">
          <div className="label-card">
            <p className="eyebrow">00 · Method</p>
            <h2>
              How I turn problems into <em>products</em>.
            </h2>
          </div>
          <div className="tool-grid">
            <article className="tool paper reveal">
              <span className="tool__badge">01</span>
              <h3>Discover</h3>
              <p>Understand users, workflows and pain points.</p>
              <span className="tool__small">
                User interviews, workflow observation, and stakeholder context.
              </span>
            </article>
            <article className="tool paper tilt-r reveal">
              <span className="tool__badge">02</span>
              <h3>Define</h3>
              <p>Translate problems into clear requirements.</p>
              <span className="tool__small">
                Journey maps, problem statements, constraints, and outcomes.
              </span>
            </article>
            <article className="tool paper reveal">
              <span className="tool__badge">03</span>
              <h3>Design</h3>
              <p>Create workflows and product solutions.</p>
              <span className="tool__small">
                Impact, effort, and sequencing around the core user job.
              </span>
            </article>
            <article className="tool paper tilt-l reveal">
              <span className="tool__badge">04</span>
              <h3>Build</h3>
              <p>Work with technology teams to implement.</p>
              <span className="tool__small">
                PRDs, prototypes, AI workflows, and sprint collaboration.
              </span>
            </article>
            <article className="tool paper reveal">
              <span className="tool__badge">05</span>
              <h3>Measure</h3>
              <p>Use data and feedback to improve.</p>
              <span className="tool__small">
                Instrumentation, adoption, and iterative learning.
              </span>
            </article>
          </div>
        </section>

        {/* ============ EXPERIENCE ============ */}
        <section id="experience" className="section">
          <div className="label-card">
            <p className="eyebrow">01 · Experience</p>
            <h2>
              Things I shipped, <em>with the numbers</em>.
            </h2>
            <p>
              From trading terminals and LLM query engines to 0→1 insurance
              platforms and fintech checkout infrastructure.
            </p>
          </div>

          {/* 5paisa */}
          <div className="co reveal">
            <div className="co__badge">5P</div>
            <div>
              <h3>5paisa Capital Ltd</h3>
              <p className="co__meta">
                Associate Product Manager · Nov 2024 – Sept 2025 · Mumbai{" "}
                <span>/</span> Fintech · Wealthtech · Discount brokerage
              </p>
            </div>
          </div>
          <div className="co-stats reveal">
            <CoStat target={15} prefix="+" suffix="%" label="Repeat investor" />
            <CoStat target={30} prefix="<" suffix="s" label="Response time" />
            <CoStat target={60} suffix="%+" label="Bot automated" />
            <CoStat target={500} suffix="+" label="Partners ingested" />
          </div>

          <div className="case-row case-row--2">
            <article className="case paper tilt-l reveal">
              <span className="tape"></span>
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">Product expansion</span>
                <span className="pill">Thematic baskets</span>
              </div>
              <h3>Curated "Basket Investing" &amp; multi-asset discovery</h3>
              <span className="case__note">40+ user interviews</span>
              <p>
                Partnered with quantitative research to launch 1-click
                theme-based Basket Investing — turning single-instrument
                confusion into diversified goal-driven portfolios for retail
                users.
              </p>
              <p className="case__result">
                <strong>+15%</strong> repeat engagement ·{" "}
                <strong>+20%</strong> adoption · 1-click carting cut checkout
                drop-off by <strong>34%</strong>
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Retail investors experienced
                high choice paralysis navigating 2,000+ individual stocks,
                causing heavy drop-off before order completion.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "5paisa Capital · Product expansion",
                    title: "Curated \"Basket Investing\" & goal-based discovery",
                    problem:
                      "Retail investors experienced high choice paralysis when navigating 2,000+ individual stocks and funds, leading to high drop-offs prior to completing first-time portfolio creation.",
                    whatIDid:
                      "Partnered with the internal quantitative research team to structure algorithmic, thematic multi-asset baskets (Momentum, Value, All-Weather Hedged). Designed the 1-click execution journey, order basket carting logic, and rebalancing alert systems.",
                    whatHappened:
                      "Drove a 15% lift in repeat investor engagement within 60 days of release and accelerated new user multi-asset portfolio adoption by 20% across mobile and web.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper tilt-r reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="tag tag--ai">AI</span>
                <span className="pill">GenAI operations</span>
                <span className="pill">AI investor copilot</span>
              </div>
              <h3>LLM support copilot &amp; real-time query bot</h3>
              <span className="case__note">12m → 28s queue drop</span>
              <p>
                Designed and rolled out an LLM-powered support bot, dropping
                first-response time from 12 minutes to under 30 seconds and
                automating 60%+ of Tier-1 investor tickets.
              </p>
              <p className="case__result">
                <strong>70% ↓</strong> first-response time ·{" "}
                <strong>60%+</strong> automated
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Repetitive margin &amp;
                trading queries overwhelmed agents, causing response times to
                balloon to 12 minutes during market hours.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "5paisa Capital · GenAI operations",
                    title: "LLM-powered investor support copilot",
                    problem:
                      "High-volume repetitive queries regarding order status, fund withdrawals, ledger explanations, and margin pledges overwhelmed human support agents, creating 12-minute queues during market hours.",
                    whatIDid:
                      "Architected conversational user journeys using LLM intent parsing, connected the bot directly to transactional trade ledger APIs for verified responses, and engineered guardrails with warm human agent handoffs for complex cases.",
                    whatHappened:
                      "Compressed average first-response latency by 70% (from 12 mins to under 30 secs) and automated 60%+ of Tier-1 queries without agent escalation, dramatically cutting support operating overhead.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>
          </div>

          <div className="case-row">
            <article className="case paper reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">Growth &amp; conversion</span>
              </div>
              <h3>MF compare &amp; decision benchmarking tool</h3>
              <span className="case__note">solved search drop-off</span>
              <p>
                Identified cognitive friction in fund selection and shipped
                side-by-side comparison metrics (Alpha, Beta, Sharpe, Expense
                Ratio) against Nifty50, driving a 3% conversion surge.
              </p>
              <p className="case__result">
                <strong>+3%</strong> user conversion · benchmarked to{" "}
                <strong>Nifty 50</strong>
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> High drop-offs on fund pages
                because investors lacked side-by-side comparison against Nifty50
                and category benchmarks.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "5paisa Capital · Growth & conversion",
                    title:
                      "Mutual fund compare & decision benchmarking tools",
                    problem:
                      "Prelogin funnel analysis revealed severe drops on mutual fund detail pages. Users lacked intuitive benchmarking against indices like Nifty50 or comparable category peers, leading to second thoughts and abandonment.",
                    whatIDid:
                      "Built the product PRD for an integrated MF Comparison Engine. Added side-by-side performance metrics (Alpha, Beta, Sharpe Ratio, Expense Ratio) and index relative performance charts.",
                    whatHappened:
                      "Unlocked an immediate 3% increase in investor conversion from discovery to order placement and increased mutual fund explore engagement time by 18%.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper tilt-r reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">High-frequency trading</span>
              </div>
              <h3>Scalper terminal, MTF &amp; pre-login behaviour</h3>
              <span className="case__note">co-designed with 25+ scalpers</span>
              <p>
                Analyzed drop-off funnels in the trading journey to architect
                specialized Scalper execution, Margin Trading Facility (MTF)
                interfaces, and streamlined prelogin discovery.
              </p>
              <p className="case__result">
                <strong>+5–7%</strong> engagement lift · <strong>+3%</strong>{" "}
                funnel conversion
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> F&amp;O scalpers lost seconds
                in multi-step order windows, while MTF leverage discovery was
                buried deep in desktop submenus.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "5paisa Capital · High-frequency trading",
                    title:
                      "Scalper terminal, margin trading (MTF) & pre-login journeys",
                    problem:
                      "High-volume intraday and F&O traders experienced friction with traditional multi-step order windows, while MTF (Margin Trading Facility) discovery was hidden deep within desktop submenus.",
                    whatIDid:
                      "Led user research and designed the specialized 1-click Scalper Page, enabling instant hotkey execution for index options. Redesigned the dedicated MTF discovery flow with transparent 4x leverage calculators and revamped prelogin landing behavior.",
                    whatHappened:
                      "Boosted overall platform trading engagement by 5–7% and achieved a 3% uplift in new user conversion to active funded traders.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">Distribution network</span>
              </div>
              <h3>Partner ecosystem &amp; self-serve portal overhaul</h3>
              <span className="case__note">7 days → 15 mins TAT</span>
              <p>
                Simplified partner onboarding workflows and redesigned the
                digital portal, eliminating offline paperwork and unlocking rapid
                onboarding of 500+ distribution partners.
              </p>
              <p className="case__result">
                <strong>500+</strong> partners onboarded · replaced a 14-page
                physical courier loop
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Partner onboarding was stuck
                in offline paperwork, taking 5–7 days with zero real-time
                commission reconciliation.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "5paisa Capital · Distribution network",
                    title:
                      "Partner ecosystem & self-service digital KYC portal",
                    problem:
                      "Partner and sub-broker onboarding was hindered by offline paperwork, manual verification delays of 5–7 days, and fragmented tracking for partner commissions and client mapping.",
                    whatIDid:
                      "Led the complete revamp of the partner portal experience. Implemented instant API-based identity checks (PAN/Aadhaar/Digilocker), automated agreement e-signing, and real-time dashboard analytics for sub-broker commission reconciliation.",
                    whatHappened:
                      "Enabled onboarding of 500+ distribution partners with turnaround time reduced from 7 days to under 15 minutes, significantly expanding distribution reach.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>
          </div>

          {/* Edme */}
          <div className="co reveal">
            <div className="co__badge">ED</div>
            <div>
              <h3>Edme Insurance Broker</h3>
              <p className="co__meta">
                Associate Product Manager · Dec 2025 – June 2026 · India{" "}
                <span>/</span> Insurtech · 0→1 platforms · formerly Aditya Birla
                Insurance
              </p>
            </div>
          </div>
          <div className="co-stats reveal">
            <CoStat target={50} prefix="+" suffix="%" label="Ops efficiency" />
            <CoStat target={45} prefix="-" suffix="%" label="Recon turnaround" />
            <CoStat target={90} suffix="%+" label="Errors eliminated" />
            <CoStat target={6} suffix="+" label="On-time releases" />
          </div>

          <div className="case-row">
            <article className="case paper tilt-l reveal">
              <span className="tape"></span>
              <div>
                <span className="tag tag--ai">AI</span>
                <span className="pill">0→1 platforms</span>
                <span className="pill">GenAI OCR</span>
              </div>
              <h3>0→1 AI insurance platforms: CMS &amp; PAS rollout</h3>
              <span className="case__note">saved ops 4.5 hrs/day</span>
              <p>
                Led the 0→1 build of two AI-enabled platforms (Claims Management
                &amp; Policy Administration), utilizing GenAI document
                extraction to unify fragmented operations and cut manual effort
                by 10%.
              </p>
              <p className="case__result">
                <strong>+50%</strong> ops efficiency · <strong>10% ↓</strong>{" "}
                manual effort
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Claims and policy operations
                relied on fragmented spreadsheets, physical discharge documents,
                and slow email handoffs.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "Edme Insurance Broker · 0→1 platforms",
                    title: "0→1 AI insurance platforms: CMS & PAS rollout",
                    problem:
                      "Insurance claims and policy operations relied on fragmented legacy spreadsheets, physical discharge documents, and slow email trails across internal teams and third-party insurers.",
                    whatIDid:
                      "Spearheaded the 0→1 build of two scalable platforms: Claims Management System (CMS) and Policy Administration System (PAS). Integrated GenAI OCR document parsing to automatically ingest, extract, and categorize complex medical and motor insurance discharge summaries.",
                    whatHappened:
                      "Improved overall operational efficiency by 50% and slashed manual data entry effort by 10% across claims, policy issuance, and underwriting operations teams.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper reveal">
              <div>
                <span className="tag tag--ai">AI</span>
                <span className="pill">Cross-functional execution</span>
              </div>
              <h3>
                AI roadmap prioritization &amp; zero-loss data migration
              </h3>
              <span className="case__note">180k+ policies migrated</span>
              <p>
                Delivered 6+ product releases on schedule owning AI sprint
                prioritization, stakeholder UAT, and backend data migration
                using AI-proposed schema and field-mapping.
              </p>
              <p className="case__result">
                <strong>6+</strong> releases on schedule ·{" "}
                <strong>+30%</strong> reporting accuracy
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Migrating 180k+ historical
                policies from legacy databases carried high risk of broken schema
                mappings and reporting discrepancies.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow:
                       "Edme Insurance Broker · Cross-functional execution",
                    title:
                      "AI roadmap prioritization & zero-loss data migration",
                    problem:
                      "Migrating high volumes of historical insurance policies from Aditya Birla legacy data stores carried high risk of reporting discrepancies, broken schema mappings, and sprint deadline slippages.",
                    whatIDid:
                      "Owned end-to-end sprint planning, user acceptance testing (UAT), and stakeholder management. Employed AI-proposed schema and field-mapping transformations to reconcile inconsistent legacy database records into normalized relational entities.",
                    whatHappened:
                      "Delivered 6+ product releases strictly on schedule and improved backend regulatory and management reporting accuracy by 30% throughout the platform transition.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper tilt-r reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="tag tag--ai">AI</span>
                <span className="pill">Financial automation</span>
              </div>
              <h3>0→1 policy administration &amp; self-learning recon</h3>
              <span className="case__note">-45% TAT · 90% errors gone</span>
              <p>
                Automated the complete policy lifecycle (booking to
                cancellation) and architected an AI reconciliation feedback
                loop, slashing TAT by 45% and eliminating 90%+ errors.
              </p>
              <p className="case__result">
                <strong>-45%</strong> turnaround · <strong>90%+</strong> errors
                eliminated
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Insurer payout reconciliation
                against internal registers took weeks, suffering from human data
                entry errors and missed accruals.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "Edme Insurance Broker · Financial automation",
                    title:
                      "0→1 self-learning reconciliation engine & policy lifecycle",
                    problem:
                      "Manual policy reconciliation between multi-insurer payout statements and internal booking registers took weeks, suffering from high human entry error and missing commission accruals.",
                    whatIDid:
                      "Architected the 0→1 Policy Administration System covering policy registration, booking, automated invoice generation, and cancellation. Designed an AI-driven self-learning reconciliation feedback loop that learns from every human-resolved exception.",
                    whatHappened:
                      "Slashed financial reconciliation turnaround time by 45% and eliminated 90%+ of operational processing errors, unlocking real-time financial audit readiness.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>
          </div>

          {/* Liquidmind */}
          <div className="co reveal">
            <div className="co__badge">LM</div>
            <div>
              <h3>Liquidmind AI</h3>
              <p className="co__meta">
                Product Management Intern · Jun 2024 – Aug 2024 · India{" "}
                <span>/</span> 0→1 startup · Fintech · Checkout infrastructure
              </p>
            </div>
          </div>
          <div className="co-stats reveal">
            <CoStat target={30} suffix="% ↓" label="Time-to-value" />
            <CoStat target={99} suffix="%" label="Pay accuracy" />
            <CoStat target={3} suffix=" types" label="Checkout modes" />
            <CoStat target={100} suffix="%" label="Webhook health" />
          </div>

          <div className="case-row">
            <article className="case paper reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">Activation &amp; onboarding</span>
              </div>
              <h3>Onboarding funnel mapping &amp; time-to-value</h3>
              <span className="case__note">4.2d → 2.9d TTV</span>
              <p>
                Uncovered user friction points through detailed journey mapping
                and funnel analysis, redesigning the onboarding flow to achieve a
                30% reduction in customer time-to-value.
              </p>
              <p className="case__result">
                <strong>30% ↓</strong> time-to-value · removed{" "}
                <strong>4</strong> high-friction setup steps
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Enterprise merchants took over
                4.2 days to execute their first payment operation due to
                cognitive overload during workspace setup.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow:
                      "Liquidmind AI · User activation & onboarding",
                    title:
                      "Onboarding funnel mapping & time-to-value optimization",
                    problem:
                      "New enterprise users experienced severe friction during initial onboarding and workspace setup, taking over 4.2 days to execute their first payment operation and causing early funnel abandonment.",
                    whatIDid:
                      "Conducted funnel drop-off analysis and session journey mapping to identify cognitive overload in registration. Redesigned the activation path with progressive KYC step-completion, automated defaults, and guided workspace checklists.",
                    whatHappened:
                      "Cut customer time-to-value by 30% (from 4.2 days to 2.9 days) and significantly accelerated Day-7 user activation across business accounts.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper tilt-l reveal">
              <span className="tape"></span>
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">Fintech checkout</span>
              </div>
              <h3>Flexible checkout &amp; alternative payments</h3>
              <span className="case__note">Pay Later &amp; Split</span>
              <p>
                Introduced flexible checkout payment structures (Pay Later,
                Split/Partial Payments, and Instant Pay), improving transaction
                affordability and conversion rates.
              </p>
              <p className="case__result">
                <strong>3</strong> flexible modes · <strong>+18%</strong>{" "}
                checkout conversion
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Merchants suffered cart
                drop-offs on high-ticket B2B transactions because buyers lacked
                split-instrument or delayed installment options.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "Liquidmind AI · Fintech checkout",
                    title:
                      "Flexible checkout architectures & alternative payment structures",
                    problem:
                      "Merchants faced high cart drop-off rates on high-ticket B2B transactions because buyers lacked flexible payment structures, single full-upfront liquidity, or multi-card payment options.",
                    whatIDid:
                      "Spearheaded the PRD and UX specification for 3 flexible checkout mechanisms: Pay Later (0% split installments), Multi-instrument Split Payments, and Instant 1-Click Pay. Coordinated with gateway APIs to handle split settlement logic.",
                    whatHappened:
                      "Substantially enhanced purchase affordability, lowering cart drop-offs and driving an 18% improvement in transaction completion rates.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>

            <article className="case paper reveal">
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="pill">API infrastructure</span>
              </div>
              <h3>Automated webhooks &amp; 99% payment verification</h3>
              <span className="case__note">99% accuracy rate</span>
              <p>
                Collaborated closely with engineering to integrate payment
                verification APIs and automated webhook listeners, achieving 99%
                accuracy in transaction verification.
              </p>
              <p className="case__result">
                <strong>99%</strong> pay accuracy · <strong>100%</strong>{" "}
                webhook reliability
              </p>
              <p className="case__teaser">
                <strong>Problem preview:</strong> Asynchronous bank callback
                delays and network drops generated ghost payments requiring
                costly manual intervention.
              </p>
              <button
                className="more-btn"
                type="button"
                onClick={() =>
                  setActiveModal({
                    eyebrow: "Liquidmind AI · API infrastructure",
                    title:
                      "Automated webhook listeners & 99% payment verification",
                    problem:
                      "Network drops and asynchronous bank callback delays frequently generated ghost payments and unverified pending orders, requiring manual customer support intervention.",
                    whatIDid:
                      "Partnered closely with backend engineering to architect reliable automated webhook listeners with exponential retry logic, signature verification, and automated status polling fallbacks.",
                    whatHappened:
                      "Achieved 99% accuracy in transaction verification and eliminated ghost payment disputes, delivering automated real-time settlement visibility to merchants.",
                  })
                }
              >
                See the breakdown
              </button>
            </article>
          </div>
        </section>

        {/* ============ BUILT ============ */}
        <section id="built" className="section">
          <div className="label-card">
            <p className="eyebrow">02 · Selected work</p>
            <h2>
              Things I've <em>built</em>.
            </h2>
            <p>
              Interactive prototypes, agentic workflows, and financial
              intelligence tools built from 0→1. All of them are live.
            </p>
          </div>

          <article className="case case--feature paper reveal" tabIndex={0}>
            <span className="tape"></span>
            <div>
              <span className="tag tag--ai">AI</span>
              <span className="pill">GenAI</span>
              <span className="pill">Agentic workflows</span>
              <span className="pill pill--live">Live</span>
            </div>
            <h3>PM Interview Coach Pro — AI mock simulator</h3>
            <p className="case__hook">
              An AI-powered mock interview platform built with n8n workflow
              automation, adaptive LLM agents, and voice interaction.
            </p>
            <p>
              It conducts realistic PM interviews with real-time follow-ups,
              rubric scoring, and structured feedback.
            </p>
            <p className="flow">
              Resume ingestion<b>→</b>n8n agent pipeline<b>→</b>Adaptive voice
              interview<b>→</b>Rubric evaluation
            </p>
            <ul className="stack">
              <li>n8n workflows</li>
              <li>Multi-agent LLMs</li>
              <li>Evaluation engine</li>
              <li>Voice AI</li>
              <li>Lovable</li>
            </ul>
            <div className="project-actions">
              <a
                className="link-arrow"
                href="https://pm-coach-pro.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Try the prototype
              </a>
              <span className="preview-pill-hint">Hover to preview</span>
            </div>

            <div className="project-preview-drawer">
              <div className="project-mockup">
                <div className="mockup-bar">
                  <div className="mockup-dots">
                    <span className="m-dot m-dot--red"></span>
                    <span className="m-dot m-dot--yellow"></span>
                    <span className="m-dot m-dot--green"></span>
                  </div>
                  <span className="mockup-url">pm-coach-pro.lovable.app</span>
                  <span className="mockup-chip">Live</span>
                </div>
                <a
                  href="https://pm-coach-pro.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mockup-link"
                  title="Click to launch live prototype"
                >
                  <img
                    src="/projects/pm-coach-pro.png"
                    alt="PM Interview Coach Pro homepage"
                    className="mockup-img"
                    loading="lazy"
                  />
                  <span className="mockup-hover-hint">Launch prototype ↗</span>
                </a>
              </div>
            </div>
          </article>

          <div className="case-row case-row--2">
            <article className="case paper tilt-l reveal" tabIndex={0}>
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="tag tag--ai">AI</span>
                <span className="pill">Insurtech</span>
                <span className="pill">Advisory copilot</span>
                <span className="pill pill--live">Live</span>
              </div>
              <h3>
                Insurance Co-Pilot — protection gap intelligence for MFDs
              </h3>
              <p>
                An advisory copilot for Mutual Fund Distributors that audits
                client portfolios to detect critical protection gaps, computes
                underwriting limits and tax regime trade-offs, and generates
                commission-blind pre-meeting briefing cards.
              </p>
              <p className="flow">
                Client book audit<b>→</b>Gap severity ranking<b>→</b>
                Underwriting signals<b>→</b>Pre-meeting cards
              </p>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://insurance-copilot-mfd.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the prototype
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">insurance-copilot-mfd.lovable.app</span>
                    <span className="mockup-chip">Live</span>
                  </div>
                  <a
                    href="https://insurance-copilot-mfd.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to launch live prototype"
                  >
                    <img
                      src="/projects/insurance-copilot.png"
                      alt="Insurance Co-Pilot homepage"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Launch prototype ↗</span>
                  </a>
                </div>
              </div>
            </article>

            <article className="case paper tilt-r reveal" tabIndex={0}>
              <div>
                <span className="tag tag--fin">Fintech</span>
                <span className="tag tag--ai">AI</span>
                <span className="pill">Fintech</span>
                <span className="pill">Consumer AI</span>
                <span className="pill pill--live">Live</span>
              </div>
              <h3>Money Wrapped — spend story unpacked</h3>
              <p>
                A personal finance web app that turns raw UPI transaction
                statements into personalised, shareable spending patterns and
                behavioural stories — a 'Spotify Wrapped' for your wallet.
              </p>
              <p className="flow">
                Upload statement<b>→</b>UPI parser<b>→</b>Behavioural
                insights<b>→</b>Shareable stories
              </p>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://spend-story-unpacked.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the prototype
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">spend-story-unpacked.lovable.app</span>
                    <span className="mockup-chip">Live</span>
                  </div>
                  <a
                    href="https://spend-story-unpacked.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to launch live prototype"
                  >
                    <img
                      src="/projects/money-wrapped.png"
                      alt="Money Wrapped homepage"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Launch prototype ↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>

          <div className="case-row">
            <article className="case paper reveal" tabIndex={0}>
              <div>
                <span className="pill">Urban mobility</span>
                <span className="pill pill--live">Live</span>
              </div>
              <h3>Ola FeedPod — electric micro-transit loops</h3>
              <p>
                Electric pods looping between gated societies and metro
                stations every 90 seconds, with dynamic loop dispatch,
                real-time seat tracking, metro timetable sync, and a single
                monthly pass.
              </p>
              <p className="flow">
                Society–metro loop<b>→</b>90s frequency<b>→</b>Metro sync<b>→</b>
                Monthly pass
              </p>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://olapod2035.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the prototype
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">olapod2035.lovable.app</span>
                    <span className="mockup-chip">Live</span>
                  </div>
                  <a
                    href="https://olapod2035.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to launch live prototype"
                  >
                    <img
                      src="/projects/ola-feedpod.png"
                      alt="Ola FeedPod homepage"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Launch prototype ↗</span>
                  </a>
                </div>
              </div>
            </article>

            <article className="case paper tilt-r reveal" tabIndex={0}>
              <div>
                <span className="pill">Marketplace</span>
                <span className="pill pill--live">Live</span>
              </div>
              <h3>Nooka — on-demand workspace marketplace</h3>
              <p>
                Connects remote professionals with boutique cafés, hotel
                lounges, call pods, and quiet studios — with dynamic filters,
                collections, and a unified WorkPass membership.
              </p>
              <p className="flow">
                Vibe &amp; needs filter<b>→</b>Discovery<b>→</b>Instant
                booking<b>→</b>WorkPass
              </p>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://work-inspired-frontend.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the prototype
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">work-inspired-frontend.lovable.app</span>
                    <span className="mockup-chip">Live</span>
                  </div>
                  <a
                    href="https://work-inspired-frontend.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to launch live prototype"
                  >
                    <img
                      src="/projects/nooka.png"
                      alt="Nooka homepage"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Launch prototype ↗</span>
                  </a>
                </div>
              </div>
            </article>

            <article className="case paper reveal" tabIndex={0}>
              <div>
                <span className="tag tag--ai">AI</span>
                <span className="pill">Travel-tech</span>
                <span className="pill pill--live">Live</span>
              </div>
              <h3>TripMind — AI travel copilot for India</h3>
              <p>
                Computes a 0–100 Trip Confidence Score across weather
                seasonality, travel style, and budget — then generates realistic
                day-wise itineraries in under 90 seconds.
              </p>
              <p className="flow">
                Preferences<b>→</b>Seasonality filter<b>→</b>Confidence score
                <b>→</b>Itinerary
              </p>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://go-india-ai.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Try the prototype
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">go-india-ai.lovable.app</span>
                    <span className="mockup-chip">Live</span>
                  </div>
                  <a
                    href="https://go-india-ai.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to launch live prototype"
                  >
                    <img
                      src="/projects/tripmind.png"
                      alt="TripMind homepage"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Launch prototype ↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============ TEARDOWNS ============ */}
        <section id="teardowns" className="section">
          <div className="label-card">
            <p className="eyebrow">03 · Product teardowns</p>
            <h2>
              How I think when <em>nobody asked</em>.
            </h2>
            <p>
              Self-directed product strategy, unit-economics teardowns, and
              root-cause analyses of high-growth consumer products.
            </p>
          </div>

          <div className="case-row case-row--2">
            <article className="case paper tilt-l reveal" tabIndex={0}>
              <span className="tape"></span>
              <div>
                <span className="pill">System design &amp; PRD</span>
                <span className="pill">NextLeap top fellow</span>
              </div>
              <h3>
                Improving BookMyShow: high-surge booking &amp; phantom lock
                resolution
              </h3>
              <p>
                Root-cause investigation of why 500k+ concurrent fans caused 82%
                phantom lock rates and checkout crashes during Coldplay &amp;
                World Cup sales. Proposed a tokenized FIFO virtual waiting room,
                edge seat soft-reservations, and bot rate-limiting to protect
                revenue conversion.
              </p>
              <dl className="stats">
                <div>
                  <dt>Peak surge uptime</dt>
                  <dd>99.4%</dd>
                </div>
                <div>
                  <dt>Checkout bounce</dt>
                  <dd>-64%</dd>
                </div>
                <div>
                  <dt>Scalping bot leakage</dt>
                  <dd>0%</dd>
                </div>
              </dl>
              <ul className="stack">
                <li>FIFO waiting room</li>
                <li>Phantom lock mitigation</li>
                <li>Edge reservation</li>
              </ul>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://drive.google.com/file/d/1JX4YSxJYN_LoULuBqvCOjfBbDsJHAdPO/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the 18-page PRD
                </a>
                <a
                  className="link-arrow"
                  href="https://drive.google.com/drive/folders/14Mgnz3e0ev8qYpaJ23fxRFYM1MJRhkaf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Drive folder
                </a>
                <a
                  className="link-arrow"
                  href="/bookmyshow-case-study.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">bookmyshow.prd-teardown</span>
                    <span className="mockup-chip">Teardown</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1JX4YSxJYN_LoULuBqvCOjfBbDsJHAdPO/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to view BookMyShow PRD teardown"
                  >
                    <img
                      src="/projects/bookmyshow.png"
                      alt="BookMyShow case study preview"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Read 18-page PRD ↗</span>
                  </a>
                </div>
              </div>
            </article>

            <article className="case paper tilt-r reveal" tabIndex={0}>
              <div>
                <span className="pill">Quick commerce</span>
                <span className="pill">Unit economics</span>
              </div>
              <h3>Zepto: boosting order value with 'Zepto Stock Up'</h3>
              <p>
                A product strategy and system design teardown of why users
                hesitate to place high-value grocery orders. Designed 'Zepto
                Stock Up' with household inventory tracking, bulk discount
                ladders, and shelf-life indicators to boost dark store
                throughput.
              </p>
              <dl className="stats">
                <div>
                  <dt>Baseline AOV target</dt>
                  <dd>₹400–450</dd>
                </div>
                <div>
                  <dt>Prioritization score (U×I/E)</dt>
                  <dd>4.5/5</dd>
                </div>
                <div>
                  <dt>Target Gen Z / millennials</dt>
                  <dd>18M</dd>
                </div>
              </dl>
              <ul className="stack">
                <li>Dark store economics</li>
                <li>Shelf-life tracker</li>
                <li>AOV growth</li>
              </ul>
              <div className="project-actions">
                <a
                  className="link-arrow"
                  href="https://drive.google.com/file/d/1jOh0dfjqQNW5q3ENtnDMwvJk3XAKoeWL/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read the 9-page PRD
                </a>
                <a
                  className="link-arrow"
                  href="https://drive.google.com/drive/folders/14Mgnz3e0ev8qYpaJ23fxRFYM1MJRhkaf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Drive folder
                </a>
                <a
                  className="link-arrow"
                  href="/zepto-case-study.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PDF
                </a>
                <span className="preview-pill-hint">Hover to preview</span>
              </div>

              <div className="project-preview-drawer">
                <div className="project-mockup">
                  <div className="mockup-bar">
                    <div className="mockup-dots">
                      <span className="m-dot m-dot--red"></span>
                      <span className="m-dot m-dot--yellow"></span>
                      <span className="m-dot m-dot--green"></span>
                    </div>
                    <span className="mockup-url">zepto.stock-up-teardown</span>
                    <span className="mockup-chip">Teardown</span>
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1jOh0dfjqQNW5q3ENtnDMwvJk3XAKoeWL/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mockup-link"
                    title="Click to view Zepto PRD teardown"
                  >
                    <img
                      src="/projects/zepto-teardown.png"
                      alt="Zepto Stock Up case study preview"
                      className="mockup-img"
                      loading="lazy"
                    />
                    <span className="mockup-hover-hint">Read 9-page PRD ↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* ============ AI PRACTICE ============ */}
        <section id="ai" className="section">
          <div className="label-card">
            <p className="eyebrow">04 · AI practice</p>
            <h2>
              AI, in <em>production terms</em>.
            </h2>
            <p>
              I treat AI as a product material — something shaped around a
              business decision, not a feature bolted on.
            </p>
          </div>
          <div className="ai-grid">
            {/* Card 1: AI Product Management */}
            <article className="paper ai-card reveal">
              <div>
                <div className="ai-card__header">
                  <span className="ai-badge ai-badge--eval">GATE EVAL</span>
                  <span className="ai-chip">Heuristics vs LLM</span>
                </div>
                <h3>AI product management</h3>
                <p className="ai-card__takeaway">
                  Deploying models only where rules fail, backed by deterministic evals and human fallback.
                </p>
                <div className="ai-gate-viz">
                  <div className="ai-gate__input">
                    <span className="ai-stream-dot"></span>
                    <span>Event Stream</span>
                  </div>
                  <div className="ai-gate__split">
                    <div className="ai-gate__branch">
                      <span className="ai-branch__name">Static Rules</span>
                      <span className="ai-branch__meta">82%</span>
                    </div>
                    <div className="ai-gate__branch ai-gate__branch--model is-active">
                      <div className="ai-pulse-bead"></div>
                      <span className="ai-branch__name">LLM Eval</span>
                      <span className="ai-branch__meta">18% (fallback)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ai-card__footer">
                <span>Eval: <b>Deterministic triage</b></span>
                <span>Guard: <b>Human-in-loop</b></span>
              </div>
            </article>

            {/* Card 2: Claude Code & AI Agents */}
            <article className="paper ai-card tilt-r reveal">
              <div>
                <div className="ai-card__header">
                  <span className="ai-badge ai-badge--cli">AGENT CLI</span>
                  <span className="ai-chip">Autonomous Loops</span>
                </div>
                <h3>Claude Code &amp; AI agents</h3>
                <p className="ai-card__takeaway">
                  Directing multi-agent loops that test, iterate, and ship validated prototypes in hours.
                </p>
                <div className="ai-terminal">
                  <div className="ai-term-bar">
                    <div className="ai-term-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <span className="ai-term-title">claude-agent-runner</span>
                  </div>
                  <div className="ai-term-body">
                    <div className="ai-term-line"><span className="c-prompt">$</span> agent execute --goal &quot;ship feature&quot;</div>
                    <div className="ai-term-line"><span className="c-warn">&gt;</span> 4 subagents active · 0 errors</div>
                    <div className="ai-term-line"><span className="c-live">&#9679;</span> verified build <span className="c-cursor">_</span></div>
                  </div>
                </div>
              </div>
              <div className="ai-card__footer">
                <span>Runtime: <b>Autonomous CLI</b></span>
                <span>Cycle: <b>Spec &rarr; PR</b></span>
              </div>
            </article>

            {/* Card 3: LLMs & Prompt Engineering */}
            <article className="paper ai-card reveal">
              <div>
                <div className="ai-card__header">
                  <span className="ai-badge ai-badge--json">STRUCTURED</span>
                  <span className="ai-chip">Domain Grounding</span>
                </div>
                <h3>LLMs &amp; prompt engineering</h3>
                <p className="ai-card__takeaway">
                  Transforming fuzzy conversational input into strict, schema-validated business objects.
                </p>
                <div className="ai-transform-viz">
                  <div className="ai-tf-in">
                    <span className="ai-tf-pill">&quot;Refund 250 for damaged parcel #921&quot;</span>
                  </div>
                  <div className="ai-tf-arrow">Schema Guard validated</div>
                  <div className="ai-tf-out">
                    <code>
                      {`{`}&quot;action&quot;: <span className="c-json-val">&quot;REFUND&quot;</span>, &quot;amt&quot;: <span className="c-json-num">250</span>, &quot;id&quot;: 921{`}`}
                    </code>
                  </div>
                </div>
              </div>
              <div className="ai-card__footer">
                <span>Output: <b>Zod / JSON Schema</b></span>
                <span>Hallucination: <b>0%</b></span>
              </div>
            </article>

            {/* Card 4: MCP & Workflow Automation */}
            <article className="paper ai-card tilt-l reveal">
              <div>
                <div className="ai-card__header">
                  <span className="ai-badge ai-badge--mcp">MCP BRIDGE</span>
                  <span className="ai-chip">Live Tool Calling</span>
                </div>
                <h3>MCP &amp; workflow automation</h3>
                <p className="ai-card__takeaway">
                  Bridging LLMs directly to live databases, internal microservices, and audit logs.
                </p>
                <div className="ai-mcp-hub">
                  <div className="ai-mcp-center">
                    <div className="ai-mcp-ring"></div>
                    <span>MCP</span>
                  </div>
                  <div className="ai-mcp-nodes">
                    <div className="ai-node ai-node--db"><span className="ai-node-dot"></span>Postgres DB (Read/Write)</div>
                    <div className="ai-node ai-node--api"><span className="ai-node-dot"></span>Payment Ledger API</div>
                    <div className="ai-node ai-node--hook"><span className="ai-node-dot"></span>Audit Webhook</div>
                  </div>
                </div>
              </div>
              <div className="ai-card__footer">
                <span>Protocol: <b>Model Context Protocol</b></span>
                <span>Auth: <b>Scoped tokens</b></span>
              </div>
            </article>

            {/* Card 5: Rapid Prototyping */}
            <article className="paper ai-card reveal">
              <div>
                <div className="ai-card__header">
                  <span className="ai-badge ai-badge--speed">SPEED</span>
                  <span className="ai-chip">48h Concept to Live</span>
                </div>
                <h3>Rapid prototyping</h3>
                <p className="ai-card__takeaway">
                  Zero-to-working product in 48 hours to validate PM assumptions before dev lock-in.
                </p>
                <div className="ai-sprint-viz">
                  <div className="ai-sprint-bar">
                    <div className="ai-sprint-progress"></div>
                  </div>
                  <div className="ai-sprint-steps">
                    <div className="ai-step is-complete">
                      <span className="step-dot"></span>
                      <span className="step-label">Spec</span>
                    </div>
                    <div className="ai-step is-complete">
                      <span className="step-dot"></span>
                      <span className="step-label">UX Mock</span>
                    </div>
                    <div className="ai-step is-active">
                      <span className="step-dot"></span>
                      <span className="step-label">AI MVP</span>
                    </div>
                    <div className="ai-step">
                      <span className="step-dot"></span>
                      <span className="step-label">Tested</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ai-card__footer">
                <span>Velocity: <b>10x faster validation</b></span>
                <span>Outcome: <b>Build or Kill</b></span>
              </div>
            </article>

            {/* Card 6: Future Experiments */}
            <article className="paper ai-card tilt-r reveal">
              <span className="tape"></span>
              <div>
                <div className="ai-card__header">
                  <span className="ai-badge ai-badge--future">NEXT GEN</span>
                  <span className="ai-chip">Self-Healing</span>
                </div>
                <h3>
                  Future experiments{" "}
                  <span className="pill" style={{ verticalAlign: "middle" }}>
                    Exploratory
                  </span>
                </h3>
                <p className="ai-card__takeaway">
                  Autonomous exception detection, continuous drift monitors, and self-healing systems.
                </p>
                <div className="ai-radar-viz">
                  <div className="ai-radar-screen">
                    <div className="ai-radar-sweep"></div>
                    <div className="ai-radar-ring ai-ring-1"></div>
                    <div className="ai-radar-ring ai-ring-2"></div>
                    <div className="ai-radar-blip blip-1"></div>
                    <div className="ai-radar-blip blip-2"></div>
                  </div>
                  <div className="ai-radar-event">
                    <span className="event-tag">Anomaly detected</span>
                    <span className="event-action">Auto-healing via agent &nearr;</span>
                  </div>
                </div>
              </div>
              <div className="ai-card__footer">
                <span>Status: <b>Active experimentation</b></span>
                <span>Focus: <b>Agentic auto-ops</b></span>
              </div>
            </article>
          </div>
        </section>

        {/* ============ PROBLEM → IMPACT ============ */}
        <section id="impact" className="section">
          <div className="label-card">
            <p className="eyebrow">05 · Problem → impact</p>
            <h2>
              Real problems, <em>solved</em>.
            </h2>
            <p>Every metric here is from my own work.</p>
          </div>
          <div className="case-row">
            <article className="case paper reveal">
              <p className="eyebrow">Ops · recon</p>
              <h3>Fragmented insurance workflows &amp; manual invoices</h3>
              <dl className="stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <dt>CMS efficiency</dt>
                  <dd>+50%</dd>
                </div>
                <div>
                  <dt>Manual effort</dt>
                  <dd>10% ↓</dd>
                </div>
              </dl>
              <h4>Analysis</h4>
              <p>
                Mapped manual workflows across claims, operations, and policy
                teams.
              </p>
              <h4 style={{ marginTop: "10px" }}>Solution</h4>
              <p>
                0→1 development of AI-enabled CMS &amp; PAS with fuzzy
                matching.
              </p>
            </article>
            <article className="case paper tilt-r reveal">
              <p className="eyebrow">Support · LLM</p>
              <h3>Repetitive customer queries delaying responses</h3>
              <dl className="stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <dt>Response time</dt>
                  <dd>70% ↓</dd>
                </div>
                <div>
                  <dt>Tier-1 deflected</dt>
                  <dd>60%+</dd>
                </div>
              </dl>
              <h4>Analysis</h4>
              <p>Identified high-volume repetitive queries in support logs.</p>
              <h4 style={{ marginTop: "10px" }}>Solution</h4>
              <p>Launched an LLM-powered chatbot for automated support.</p>
            </article>
            <article className="case paper reveal">
              <p className="eyebrow">Onboard · pay</p>
              <h3>High friction and drop-offs during onboarding</h3>
              <dl className="stats" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div>
                  <dt>Onboarding time</dt>
                  <dd>30% ↓</dd>
                </div>
                <div>
                  <dt>Pay verification</dt>
                  <dd>99%</dd>
                </div>
              </dl>
              <h4>Analysis</h4>
              <p>Journey analysis found the key friction points in the flow.</p>
              <h4 style={{ marginTop: "10px" }}>Solution</h4>
              <p>
                Redesigned onboarding and introduced flexible payment options.
              </p>
            </article>
          </div>
        </section>

        {/* ============ ABOUT ============ */}
        <section id="about" className="section">
          <div className="about paper reveal">
            <span className="tape"></span>
            <div>
              <p className="eyebrow">06 · About</p>
              <h2>
                Systems thinker. <em>Product builder.</em>
              </h2>
              <p style={{ marginTop: "16px" }}>
                I've spent the last few years inside the messiest parts of
                fintech and insurtech — where legacy ops meets broken software,
                and someone has to figure out what actually needs to be built.
                That's where I come in.
              </p>
              <p>
                I connect the business context (what stakeholders really need)
                to the product (what gets shipped), bridging technology and data
                to make decisions stick — and lately, using AI &amp; automation
                to cut the manual work that nobody should be doing today.
              </p>
              <div className="lenses">
                <div className="lens">
                  <strong>Business</strong>
                  <span>
                    Understand operations, revenue and stakeholder goals.
                  </span>
                </div>
                <div className="lens">
                  <strong>Product</strong>
                  <span>PRD/BRD, discovery, prioritisation and delivery.</span>
                </div>
                <div className="lens">
                  <strong>Technology</strong>
                  <span>
                    Architecture, system design, API integrations and
                    engineering alignment.
                  </span>
                </div>
                <div className="lens">
                  <strong>Data</strong>
                  <span>
                    SQL, metrics definition, analytics pipelines and data-driven
                    insights.
                  </span>
                </div>
                <div className="lens">
                  <strong>AI &amp; automation</strong>
                  <span>
                    LLM workflows, process automation, prompt design and
                    operational efficiency.
                  </span>
                </div>
              </div>
            </div>
            <ul className="facts">
              <li>
                <b>Education</b>B.Tech, Birla Institute of Technology and
                Science (BITS), Pilani · Nov 2020 – Aug 2024
              </li>
              <li>
                <b>Now</b>Open to AI PM / APM roles
              </li>
              <li>
                <b>Domains</b>Fintech, insurtech, B2B SaaS, e-commerce, supply
                chain, warehouse management, HRMS
              </li>
              <li>
                <b>Based in</b>India
              </li>
              <li>
                <span className="case__note">ask me about ledger recon</span>
              </li>
            </ul>
          </div>

          <div className="chips paper reveal">
            <p className="eyebrow" style={{ marginBottom: "8px" }}>
              Toolkit
            </p>
            <div className="chip-group">
              <strong>Product</strong>
              <ul>
                <li data-tooltip="User interviews, workflow shadowing, and pain point validation">
                  Product discovery
                </li>
                <li data-tooltip="Comprehensive PRDs, user stories, and acceptance criteria">
                  PRD/BRD
                </li>
                <li data-tooltip="RICE scoring, impact-vs-effort matrices, and sprint roadmaps">
                  Feature prioritisation
                </li>
                <li data-tooltip="Translating stakeholder requests into technical specifications">
                  Requirement gathering
                </li>
                <li data-tooltip="Qualitative interviews, surveys, and usability testing">
                  User research
                </li>
                <li data-tooltip="Funnel analysis, cohort tracking, and drop-off diagnosis">
                  Product analytics
                </li>
              </ul>
            </div>
            <div className="chip-group">
              <strong>AI &amp; Gen-AI</strong>
              <ul>
                <li data-tooltip="Integrating LLMs and vision models into product workflows">
                  Generative AI
                </li>
                <li data-tooltip="Structured JSON output, few-shot prompting, and evaluation datasets">
                  Prompt engineering
                </li>
                <li data-tooltip="Multi-agent orchestration, tool routing, and autonomous loops">
                  AI agents
                </li>
                <li data-tooltip="Ideation, fast PRD drafting, and market research synthesis">
                  ChatGPT
                </li>
                <li data-tooltip="Code generation, agentic development, and deep document parsing">
                  Claude
                </li>
                <li data-tooltip="Multimodal analysis, context window testing, and Google ecosystem">
                  Google Gemini
                </li>
                <li data-tooltip="Trigger-based agent pipelines and operational bots">
                  AI workflow automation
                </li>
                <li data-tooltip="Accelerated prototyping and interactive design validation">
                  AI-assisted product design
                </li>
              </ul>
            </div>
            <div className="chip-group">
              <strong>Analytics</strong>
              <ul>
                <li data-tooltip="Complex joins, window functions, and reconciliation queries">
                  SQL
                </li>
                <li data-tooltip="Executive reporting dashboards and cross-table KPI models">
                  Power BI
                </li>
                <li data-tooltip="Interactive visual drill-downs and operational telemetry">
                  Tableau
                </li>
                <li data-tooltip="Tracking North Star, operational TAT, and financial churn">
                  KPI monitoring
                </li>
                <li data-tooltip="Automated data extraction, schema normalization, and ingestion">
                  ETL pipelines
                </li>
                <li data-tooltip="Real-time transaction tracking and ops escalation views">
                  Dashboarding
                </li>
              </ul>
            </div>
            <div className="chip-group">
              <strong>Execution</strong>
              <ul>
                <li data-tooltip="Sprint ceremonies, backlog grooming, and velocity tracking">
                  Agile / Scrum
                </li>
                <li data-tooltip="Aligning engineering, design, legal, compliance, and CX">
                  Stakeholder management
                </li>
                <li data-tooltip="Eliminating manual handoffs with event-driven scripts & bots">
                  Workflow automation
                </li>
                <li data-tooltip="Financial ledger reconciliation, unit economics, and process flows">
                  Business analysis
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============ CONTACT ============ */}
        <section id="contact" className="contact paper reveal">
          <span className="tape"></span>
          <p className="eyebrow">07 · Contact</p>
          <h2>
            Have a difficult workflow, an AI product problem, or an{" "}
            <em>interesting PM role</em>?
          </h2>
          <p>
            Want the full story? My resume has the experience, projects and
            product journey on one page.
          </p>
          <div className="hero__actions">
            <a
              className="btn btn--ink"
              href="https://www.linkedin.com/in/rahul-das-117a56223/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Connect on LinkedIn
            </a>
            <button
              className="btn btn--ghost"
              type="button"
              id="copyEmail"
              onClick={handleCopyEmail}
            >
              {emailCopied ? "Copied!" : "Copy email"}
            </button>
            <a
              className="btn btn--ghost"
              href="https://docs.google.com/document/d/1B50cdCZgtqYdsdUDB9HLjpUGYYblGIF6j34-nf3gZyM/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
            >
              View resume
            </a>
          </div>
          <span className="hand-arrow">
            or just write to rahul4ever2011@gmail.com
          </span>
        </section>
      </main>

      {/* Floating Back to Top Button */}
      {showBackTop && (
        <button
          className="back-top"
          type="button"
          aria-label="Scroll back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="back-top__arrow">↑</span>
          <span className="back-top__text">TOP</span>
        </button>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Rahul Das ·{" "}
          <a
            href="https://www.linkedin.com/in/rahul-das-117a56223/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          · <a href="mailto:rahul4ever2011@gmail.com">Email</a>
        </p>
      </footer>

      {/* Detail Breakdown Modal Popup */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(20,40,30,0.7)] backdrop-blur-[3px] animate-in fade-in duration-200"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="detail__card relative w-full max-w-[640px]"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="tape"></span>
            <button
              className="detail__close"
              type="button"
              aria-label="Close"
              onClick={() => setActiveModal(null)}
            >
              ✕
            </button>
            <p className="eyebrow">{activeModal.eyebrow}</p>
            <h3>{activeModal.title}</h3>
            <h5>The problem</h5>
            <p>{activeModal.problem}</p>
            <h5>What I did</h5>
            <p>{activeModal.whatIDid}</p>
            <h5>What happened</h5>
            <p>{activeModal.whatHappened}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
