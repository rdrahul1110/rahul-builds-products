import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Edit, ArrowRight, ExternalLink } from "lucide-react";
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
}

const ProjectCard = ({ title, category, featured, description, flow, tags, link, pdfLink, buttonText, statusText }: ProjectCardProps) => {
  const targetUrl = link || pdfLink;

  const handleCardClick = () => {
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const actionText = buttonText || (pdfLink ? "View Case Study" : link ? "View Prototype" : "Read case study");

  return (
    <div 
      onClick={handleCardClick}
      className="group glass-panel edge-glow rounded-3xl p-7 sm:p-8 hover-lift relative overflow-hidden shadow-sm h-full flex flex-col cursor-pointer transition-all duration-500"
    >
      {/* Faint gridlines */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.12]"></div>

      {/* Top Tag Bar: dual domain / tech badges */}
      <div className="relative flex flex-wrap items-center gap-2 mb-6">
        {category.split("•").map((part: string, i: number) => (
          <span key={i} className={`data-chip ${i === 0 ? 'chip-emerald' : 'chip-cyan'}`}>
            [{part.trim()}]
          </span>
        ))}
        {featured && (
          <span className="data-chip chip-neutral">Featured</span>
        )}
        <div className="ml-auto text-slate-600 group-hover:text-emerald-500 transition-colors">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6465L10.2929 4L6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3L11.5 3C11.6326 3 11.7598 3.05268 11.8536 3.14645C11.9473 3.24022 12 3.36739 12 3.5L12 9C12 9.27614 11.7761 9.5 11.5 9.5C11.2239 9.5 11 9.27614 11 9L11 4.70711L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
      
      {/* Title & Desc */}
      <h3 className="text-2xl font-bold font-display text-white mb-3">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{description}</p>
      
      {/* Flow Sequence */}
      {flow && flow.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {flow.map((step, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-xs font-mono font-medium text-slate-300">
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
      <div className="flex flex-wrap gap-2 mb-8">
        {tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 rounded-full border border-white/10 bg-transparent text-xs font-medium text-slate-400 shadow-sm group-hover:border-white/20 transition-colors">
            {tag}
          </span>
        ))}
      </div>
      
      {/* Links */}
      <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between group-hover:border-emerald-500/20 transition-colors">
        {targetUrl ? (
          <a 
            href={targetUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {actionText} <ExternalLink className="w-4 h-4 ml-0.5" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors">
            {actionText} <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        )}
        {statusText && (
          <span className="text-xs font-mono text-slate-500">{statusText}</span>
        )}
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
    statusText: ''
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
      link: "https://pm-coach-pro.lovable.app"
    },
    {
      id: 2,
      title: "BookMyShow Ticket Booking Experience",
      category: "UX / SYSTEM DESIGN",
      featured: true,
      description: "Proposed a scalable pre-booking architecture and waitlist engine to resolve high-demand ticket surges (Coldplay, World Cup), preventing scalping and platform crashes.",
      flow: ["User Research", "Root Cause Analysis", "System Design", "Wireframing"],
      tags: ["UX Research", "System Architecture", "Wireframing", "Product Teardown"],
      statusText: "NextLeap Top Fellow",
      buttonText: "View Case Study",
      pdfLink: "/bookmyshow-case-study.pdf",
      link: "/bookmyshow-case-study.pdf"
    },
    {
      id: 3,
      title: "Money Wrapped — Spend Story Unpacked",
      category: "FINTECH • CONSUMER AI",
      featured: true,
      description: "An interactive personal finance web application that transforms raw UPI transaction statements into personalized, shareable spending patterns and behavioral stories — a 'Spotify Wrapped' for your wallet.",
      flow: ["Upload Statement", "UPI Parser", "Behavioral Insights", "Shareable Stories"],
      tags: ["Consumer Fintech", "Data Analytics", "AI Insights", "Interactive Prototype"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://spend-story-unpacked.lovable.app"
    },
    {
      id: 4,
      title: "Nooka — On-Demand Workspace Marketplace",
      category: "MARKETPLACE • 0→1 PRODUCT",
      featured: true,
      description: "A curated workspace discovery platform connecting remote professionals with boutique cafés, hotel lounges, call pods, and quiet creative studios — with dynamic filters, collections, and a unified WorkPass membership.",
      flow: ["Vibe & Needs Filter", "Space Discovery", "Instant Booking", "WorkPass Pass"],
      tags: ["Marketplace", "Product Discovery", "Consumer Tech", "Lovable"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://work-inspired-frontend.lovable.app"
    },
    {
      id: 5,
      title: "TripMind — AI Travel Copilot for India",
      category: "TRAVEL-TECH • CONSUMER AI",
      featured: true,
      description: "An AI travel consultant for domestic Indian travel that computes dynamic 0–100 Trip Confidence Scores across weather seasonality, travel styles, and budget constraints — generating realistic day-wise itineraries in under 90 seconds.",
      flow: ["Travel Preferences", "Seasonality Filter", "Trip Confidence Score", "Day-Wise Itinerary"],
      tags: ["TravelTech", "GenAI", "Recommendation Engine", "Lovable"],
      statusText: "Live Interactive App",
      buttonText: "View Prototype",
      link: "https://go-india-ai.lovable.app"
    }
  ];

  const [workExperienceData, setWorkExperienceData] = useState(() => {
    const saved = localStorage.getItem('portfolioProjectsData_v7');
    return saved ? JSON.parse(saved) : initialWorkExperienceData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioProjectsData_v7', JSON.stringify(workExperienceData));
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
      statusText: item.statusText || ''
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
        statusText: workEditFormData.statusText
      };
      setWorkExperienceData(updatedData);
      setEditingWorkItem(null);
    }
  };

  return (
    <section id="projects" className="py-24 bg-transparent border-t border-white/5 relative z-10 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-2 block">SELECTED WORK</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Things I've Built
          </h2>
          <p className="text-slate-400 max-w-2xl text-lg">
            Turning operational problems into scalable products and automation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6 auto-rows-fr">
          {workExperienceData.map((project: any, index: number) => (
            <div key={index} className={`relative animate-fade-in ${index === 0 ? 'lg:col-span-4' : index === 1 ? 'lg:col-span-2' : 'lg:col-span-2'}`} style={{ animationDelay: `${index * 0.1}s` }}>
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
                          <Label>Status/Meta Text (If no link)</Label>
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