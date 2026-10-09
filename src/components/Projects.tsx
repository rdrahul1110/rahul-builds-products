import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit, ArrowRight, ExternalLink, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";

interface ProjectCardProps {
  id: number;
  title: string;
  category: string;
  featured?: boolean;
  description: string;
  flow?: string[];
  tags: string[];
  link?: string;
  pdfLink?: string;
  buttonText?: string;
  statusText?: string;
  image?: string;
  urlDisplay?: string;
}

const ProjectCard = ({ 
  title, 
  category, 
  featured, 
  description, 
  flow, 
  tags, 
  link, 
  pdfLink, 
  buttonText, 
  statusText, 
  image, 
  urlDisplay 
}: ProjectCardProps) => {
  const targetUrl = link || pdfLink;

  const handleCardClick = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const actionText = buttonText || (pdfLink ? "View Case Study" : link ? "View Prototype" : "Read case study");
  const displayUrl = urlDisplay || (link ? link.replace(/^https?:\/\//, '') : 'prototype.app');

  return (
    <div 
      onClick={handleCardClick}
      className="group glass-panel rounded-3xl overflow-hidden hover-lift relative shadow-sm h-full flex flex-col cursor-pointer transition-all duration-500 border border-white/10 hover:border-emerald-500/40"
    >
      {/* ZONE 1: BROWSER VIEWPORT CHAMBER (Visual Stage) */}
      <div className="bg-gradient-to-b from-[#131825] to-[#0b0f17] p-3.5 sm:p-4 pb-0 flex flex-col border-b border-white/[0.07]">
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
          </div>
          {/* Clean URL Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/40 border border-white/5 font-mono text-[11px] text-slate-400 max-w-[240px] sm:max-w-[280px] truncate">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate text-slate-300">{displayUrl}</span>
          </div>
          <div className="text-[10px] font-mono font-medium text-emerald-400/90 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            <span>LIVE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
        </div>

        {/* Screenshot Viewport Frame */}
        <div className="relative rounded-t-xl overflow-hidden aspect-[16/10] bg-[#030712] border-t border-x border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          {image ? (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 ease-out"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
              Interactive Preview
            </div>
          )}
          {/* Hover Overlay with CTA */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
            <div className="px-4 py-2 rounded-full bg-emerald-500 text-slate-950 font-semibold text-xs flex items-center gap-2 shadow-2xl shadow-emerald-500/50 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span>Launch Interactive Prototype</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>

      {/* ZONE 2: DEDICATED DATA & DETAIL DECK (Zero Color Bleed) */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow bg-[#0c1018]/90">
        
        {/* Top Tag Bar: dual domain / tech badges */}
        <div className="relative flex flex-wrap items-center gap-2 mb-4">
          {category.split("•").map((part: string, i: number) => (
            <span key={i} className={`data-chip ${i === 0 ? 'chip-emerald' : 'chip-cyan'}`}>
              [{part.trim()}]
            </span>
          ))}
          {featured && (
            <span className="data-chip chip-neutral">Featured</span>
          )}
          <div className="ml-auto text-slate-500 group-hover:text-emerald-400 transition-colors">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
            </svg>
          </div>
        </div>
        
        {/* Title & Desc */}
        <h3 className="relative text-xl sm:text-2xl font-bold font-display text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>
        <p className="relative text-slate-400 text-sm leading-relaxed mb-5 flex-grow">
          {description}
        </p>
        
        {/* Flow Sequence */}
        {flow && flow.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-6">
            {flow.map((step, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-[11px] font-mono text-slate-300">
                  {step}
                </span>
                {idx < flow.length - 1 && (
                  <span className="text-slate-600 font-mono text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[11px] font-medium text-slate-400">
              {tag}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between group-hover:border-emerald-500/20 transition-colors">
          {targetUrl ? (
            <a 
              href={targetUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {actionText} <ExternalLink className="w-4 h-4 ml-0.5" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              {actionText} <ArrowRight className="w-4 h-4 ml-1" />
            </span>
          )}
          {statusText && (
            <span className="text-xs font-mono text-slate-500">{statusText}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { isAdminMode } = useAdmin();
  const [editingWorkItem, setEditingWorkItem] = useState<number | null>(null);
  
  const [workEditFormData, setWorkEditFormData] = useState({
    title: '',
    category: '',
    description: '',
    tags: '',
    flow: '',
    link: '',
    pdfLink: '',
    buttonText: '',
    statusText: '',
    image: '',
    urlDisplay: ''
  });

  const initialWorkExperienceData = [
    {
      id: 1,
      title: "PM Interview Coach Pro — AI Mock Simulator",
      category: "GENAI • AGENTIC WORKFLOWS",
      featured: true,
      description: "An AI-powered mock interview platform built with n8n workflow automation, adaptive LLM agents, and voice interaction — conducting realistic PM interviews with real-time follow-ups, rubric scoring, and structured feedback.",
      flow: ["Resume Ingestion", "n8n Agent Pipeline", "Adaptive Voice Interview", "Rubric Evaluation"],
      tags: ["n8n Workflows", "Multi-Agent LLMs", "Evaluation Engine", "Lovable", "Voice AI"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://pm-coach-pro.lovable.app",
      image: "/projects/pm-coach-pro.png",
      urlDisplay: "pm-coach-pro.lovable.app"
    },
    {
      id: 2,
      title: "Insurance Co-Pilot — Protection Gap Intelligence for MFDs",
      category: "INSURTECH • ADVISORY COPILOT",
      featured: true,
      description: "An intelligent advisory copilot for Mutual Fund Distributors (MFDs) that audits client portfolios to detect critical protection gaps, computes underwriting limits and tax regime trade-offs, and generates commission-blind pre-meeting briefing cards.",
      flow: ["Client Book Audit", "Gap Severity Ranking", "Underwriting Signals", "Pre-Meeting Cards"],
      tags: ["Insurtech", "Advisory Copilot", "Gap Analysis", "Financial Intelligence", "Lovable"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://insurance-copilot-mfd.lovable.app",
      image: "/projects/insurance-copilot.png",
      urlDisplay: "insurance-copilot-mfd.lovable.app"
    },
    {
      id: 3,
      title: "Ola FeedPod — Electric Micro-Transit Loops",
      category: "URBAN MOBILITY • MICRO-TRANSIT",
      featured: true,
      description: "High-frequency electric pods looping between gated residential societies and metro stations every 90 seconds. Features dynamic loop dispatching, real-time seat tracking, metro timetable sync, and a single monthly pass.",
      flow: ["Society-Metro Loop", "90s Frequency", "Metro Line Sync", "Monthly Pass"],
      tags: ["Urban Mobility", "Electric Transit", "First-Last Mile", "Commute Sync", "Lovable"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://olapod2035.lovable.app",
      image: "/projects/ola-feedpod.png",
      urlDisplay: "olapod2035.lovable.app"
    },
    {
      id: 4,
      title: "Money Wrapped — Spend Story Unpacked",
      category: "FINTECH • CONSUMER AI",
      featured: true,
      description: "An interactive personal finance web application that transforms raw UPI transaction statements into personalized, shareable spending patterns and behavioral stories — a 'Spotify Wrapped' for your wallet.",
      flow: ["Upload Statement", "UPI Parser", "Behavioral Insights", "Shareable Stories"],
      tags: ["Consumer Fintech", "Data Analytics", "AI Insights", "Interactive Prototype"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://spend-story-unpacked.lovable.app",
      image: "/projects/money-wrapped.png",
      urlDisplay: "spend-story-unpacked.lovable.app"
    },
    {
      id: 5,
      title: "Nooka — On-Demand Workspace Marketplace",
      category: "MARKETPLACE • 0→1 PRODUCT",
      featured: true,
      description: "A curated workspace discovery platform connecting remote professionals with boutique cafés, hotel lounges, call pods, and quiet creative studios — with dynamic filters, collections, and a unified WorkPass membership.",
      flow: ["Vibe & Needs Filter", "Space Discovery", "Instant Booking", "WorkPass Pass"],
      tags: ["Marketplace", "Product Discovery", "Consumer Tech", "Lovable"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://work-inspired-frontend.lovable.app",
      image: "/projects/nooka.png",
      urlDisplay: "work-inspired-frontend.lovable.app"
    },
    {
      id: 6,
      title: "TripMind — AI Travel Copilot for India",
      category: "TRAVEL-TECH • CONSUMER AI",
      featured: true,
      description: "An AI travel consultant for domestic Indian travel that computes dynamic 0–100 Trip Confidence Scores across weather seasonality, travel styles, and budget constraints — generating realistic day-wise itineraries in under 90 seconds.",
      flow: ["Travel Preferences", "Seasonality Filter", "Trip Confidence Score", "Day-Wise Itinerary"],
      tags: ["TravelTech", "GenAI", "Recommendation Engine", "Lovable"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://go-india-ai.lovable.app",
      image: "/projects/tripmind.png",
      urlDisplay: "go-india-ai.lovable.app"
    }
  ];

  const [workExperienceData, setWorkExperienceData] = useState(() => {
    const saved = localStorage.getItem('portfolioProjectsData_v11');
    return saved ? JSON.parse(saved) : initialWorkExperienceData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioProjectsData_v11', JSON.stringify(workExperienceData));
  }, [workExperienceData]);

  const handleEditWork = (index: number) => {
    const item = workExperienceData[index];
    setWorkEditFormData({
      title: item.title,
      category: item.category,
      description: item.description,
      tags: item.tags.join(', '),
      flow: item.flow ? item.flow.join(', ') : '',
      link: item.link || '',
      pdfLink: item.pdfLink || '',
      buttonText: item.buttonText || '',
      statusText: item.statusText || '',
      image: item.image || '',
      urlDisplay: item.urlDisplay || ''
    });
    setEditingWorkItem(index);
  };

  const handleSaveWorkEdit = () => {
    if (editingWorkItem !== null) {
      const updatedData = [...workExperienceData];
      updatedData[editingWorkItem] = { 
        ...updatedData[editingWorkItem],
        title: workEditFormData.title,
        category: workEditFormData.category,
        description: workEditFormData.description,
        tags: workEditFormData.tags.split(',').map(t => t.trim()).filter(Boolean),
        flow: workEditFormData.flow.split(',').map(t => t.trim()).filter(Boolean),
        link: workEditFormData.link,
        statusText: workEditFormData.statusText,
        image: workEditFormData.image,
        urlDisplay: workEditFormData.urlDisplay
      };
      setWorkExperienceData(updatedData);
      setEditingWorkItem(null);
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent border-t border-white/5 relative z-10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">01 / SELECTED WORK</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Things I've Built
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Interactive software prototypes, autonomous agentic workflows, and financial intelligence tools built from 0→1.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
          {workExperienceData.map((project: any, index: number) => (
            <div 
              key={index} 
              className={`relative animate-fade-in h-full ${workExperienceData.length % 2 !== 0 && index === workExperienceData.length - 1 ? 'md:col-span-2' : ''}`} 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {isAdminMode && (
                <div className="absolute top-4 right-4 z-50 flex gap-2">
                  <Dialog open={editingWorkItem === index} onOpenChange={(open) => !open && setEditingWorkItem(null)}>
                    <DialogTrigger asChild>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleEditWork(index); }}
                        className="p-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg shadow-lg hover-lift"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Project</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Project Title</Label>
                          <Input value={workEditFormData.title} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, title: e.target.value }))} />
                        </div>
                        <div>
                          <Label>Category (Top Left Pill)</Label>
                          <Input value={workEditFormData.category} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, category: e.target.value }))} />
                        </div>
                        <div>
                          <Label>Description</Label>
                          <Textarea value={workEditFormData.description} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, description: e.target.value }))} rows={3} />
                        </div>
                        <div>
                          <Label>Image Path</Label>
                          <Input value={workEditFormData.image} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, image: e.target.value }))} placeholder="/projects/..." />
                        </div>
                        <div>
                          <Label>Flow Steps (Comma separated)</Label>
                          <Input value={workEditFormData.flow} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, flow: e.target.value }))} placeholder="User Input, AI, Output" />
                        </div>
                        <div>
                          <Label>Tags (Comma separated)</Label>
                          <Input value={workEditFormData.tags} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, tags: e.target.value }))} />
                        </div>
                        <div>
                          <Label>Live Project Link (URL)</Label>
                          <Input value={workEditFormData.link} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, link: e.target.value }))} placeholder="https://..." />
                        </div>
                        <div>
                          <Label>Status/Meta Text</Label>
                          <Input value={workEditFormData.statusText} onChange={(e) => setWorkEditFormData(prev => ({ ...prev, statusText: e.target.value }))} />
                        </div>
                        <Button onClick={handleSaveWorkEdit} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;