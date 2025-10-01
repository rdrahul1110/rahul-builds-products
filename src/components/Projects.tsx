import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExternalLink, TrendingUp, Users, BarChart3, HandHeart, ChevronDown, Edit, Trash2, Download, Upload } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import basketIcon from "@/assets/basket-investing-icon.png";
import chatbotIcon from "@/assets/ai-chatbot-icon.png";
import compareIcon from "@/assets/compare-tool-icon.png";
import partnershipIcon from "@/assets/partnership-icon.png";

interface ProjectCardProps {
  title: string;
  problem: string;
  solution: string;
  impact: string;
  icon: string;
  gradient: string;
  accentColor: string;
  delay?: string;
}

const ProjectCard = ({ title, problem, solution, impact, icon, gradient, accentColor, delay = "" }: ProjectCardProps) => {
  return (
    <Card className={`group hover-lift animate-fade-in ${delay} border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] bg-card/50 backdrop-blur-sm`}>
      <CardContent className="p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className={`p-4 rounded-2xl bg-gradient-to-br ${gradient}`}>
            <img src={icon} alt={title} className="w-12 h-12 object-contain" />
          </div>
          <Button 
            size="sm" 
            variant="ghost" 
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-colors">
            {title}
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-red-600 mb-2">Problem:</h4>
              <p className="text-muted-foreground leading-relaxed">{problem}</p>
            </div>

            <div>
              <h4 className="font-semibold text-blue-600 mb-2">Solution:</h4>
              <p className="text-muted-foreground leading-relaxed">{solution}</p>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-2">Impact:</h4>
              <p className={`font-semibold ${accentColor} leading-relaxed`}>{impact}</p>
            </div>
          </div>
        </div>

        {/* Bottom Border */}
        <div className={`h-1 bg-gradient-to-r ${gradient} rounded-full mt-6 opacity-60 group-hover:opacity-100 transition-opacity`}></div>
      </CardContent>
    </Card>
  );
};

const Projects = () => {
  const { isAdminMode } = useAdmin();
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());
  const [editingItem, setEditingItem] = useState<number | null>(null);
  const [editingWorkItem, setEditingWorkItem] = useState<number | null>(null);
  const [workEditFormData, setWorkEditFormData] = useState({
    title: '',
    problem: '',
    solution: '',
    impact: '',
    gradient: '',
    accentColor: ''
  });
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    expandedDescription: '',
    image: '',
    gradient: ''
  });
  const [portfolioData, setPortfolioData] = useState([
    {
      title: "Fintech Product Teardown Analysis",
      description: "Comprehensive teardown of leading fintech apps analyzing UX, growth strategies, and monetization models.",
      expandedDescription: "Deep dive analysis covering user onboarding flows, feature comparison matrix, monetization strategies, and growth hacking techniques used by top fintech companies. Includes actionable insights and recommendations for product managers.",
      image: "/lovable-uploads/presentation-1.png", // Upload your presentation image here
      gradient: "from-primary/20 to-accent-teal/20"
    },
    {
      title: "Growth Strategy Case Study",
      description: "Data-driven growth experiments and optimization strategies for SaaS products with detailed ROI analysis.",
      expandedDescription: "Complete case study showcasing A/B testing methodologies, conversion funnel optimization, user acquisition strategies, and retention techniques. Includes real metrics and performance indicators with actionable growth frameworks.",
      image: "/lovable-uploads/presentation-2.png", // Upload your presentation image here
      gradient: "from-accent-orange/20 to-primary/20"
    },
    {
      title: "Product Requirements Documents",
      description: "Collection of detailed PRDs showcasing feature specifications, user stories, and technical requirements.",
      expandedDescription: "Professional PRD templates and examples covering feature specifications, user journey mapping, acceptance criteria, technical architecture, and stakeholder alignment. Perfect reference for product development workflows.",
      image: "/lovable-uploads/presentation-3.png", // Upload your presentation image here
      gradient: "from-accent-teal/20 to-accent-orange/20"
    },
    {
      title: "User Research & Testing Reports",
      description: "Usability testing reports and user interview insights driving data-backed product decisions.",
      expandedDescription: "Comprehensive user research methodology including interview scripts, usability testing protocols, data analysis frameworks, and actionable insights. Demonstrates user-centric approach to product development and decision making.",
      image: "/lovable-uploads/presentation-4.png", // Upload your presentation image here
      gradient: "from-primary/20 to-accent-orange/20"
    }
  ]);

  const toggleExpanded = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const handleEdit = (index: number) => {
    const item = portfolioData[index];
    setEditFormData({
      title: item.title,
      description: item.description,
      expandedDescription: item.expandedDescription,
      image: item.image,
      gradient: item.gradient
    });
    setEditingItem(index);
  };

  const handleSaveEdit = () => {
    if (editingItem !== null) {
      const updatedData = [...portfolioData];
      updatedData[editingItem] = { ...editFormData };
      setPortfolioData(updatedData);
      setEditingItem(null);
      setEditFormData({
        title: '',
        description: '',
        expandedDescription: '',
        image: '',
        gradient: ''
      });
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresentationUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle presentation file upload
      console.log('Presentation uploaded:', file.name);
      // You can add logic here to store the presentation file
    }
  };

  const handleDelete = (index: number) => {
    const updatedData = portfolioData.filter((_, i) => i !== index);
    setPortfolioData(updatedData);
  };

  const handleDownload = (title: string) => {
    console.log('Download:', title);
    // Add download functionality here
  };
  const [workExperienceData, setWorkExperienceData] = useState([
    {
      title: "Basket Investing Feature",
      problem: "Users struggled to pick the right funds from hundreds of options, leading to analysis paralysis and low engagement.",
      solution: "Curated investment baskets with detailed research insights, risk assessments, and performance tracking.",
      impact: "Boosted user engagement by 3% and improved conversion rates across all user segments.",
      icon: basketIcon,
      gradient: "from-primary/20 to-accent-orange/20",
      accentColor: "text-accent-orange"
    },
    {
      title: "AI-Powered Chatbot",
      problem: "High load on customer support agents with 80% repetitive queries causing delays and user frustration.",
      solution: "Built intelligent chatbot using NLP intent classification with seamless handoff to human agents.",
      impact: "Automated 70% of repetitive queries, reduced response time by 60%.",
      icon: chatbotIcon,
      gradient: "from-accent-teal/20 to-primary/20",
      accentColor: "text-accent-teal"
    },
    {
      title: "MF Compare & Nifty50 Tool",
      problem: "Lack of easy-to-use comparison tools for mutual funds and benchmarking against indices.",
      solution: "Interactive comparison dashboard with benchmark overlay, performance metrics, and visual analytics.",
      impact: "Traffic increased by 3%, conversion rate improved significantly.",
      icon: compareIcon,
      gradient: "from-accent-orange/20 to-accent-teal/20",
      accentColor: "text-primary"
    },
    {
      title: "Pre-login & Partner Page Revamp",
      problem: "Low engagement on landing pages and poor partner signup conversion rates.",
      solution: "Redesigned layouts with trust signals, social proof, and optimized conversion funnels.",
      impact: "Engagement increased by 5%, achieved 500+ new partner onboardings.",
      icon: partnershipIcon,
      gradient: "from-primary/20 to-accent-teal/20",
      accentColor: "text-accent-teal"
    }
  ]);

  const handleEditWork = (index: number) => {
    const item = workExperienceData[index];
    setWorkEditFormData({
      title: item.title,
      problem: item.problem,
      solution: item.solution,
      impact: item.impact,
      gradient: item.gradient,
      accentColor: item.accentColor
    });
    setEditingWorkItem(index);
  };

  const handleSaveWorkEdit = () => {
    if (editingWorkItem !== null) {
      const updatedData = [...workExperienceData];
      updatedData[editingWorkItem] = { 
        ...updatedData[editingWorkItem],
        ...workEditFormData 
      };
      setWorkExperienceData(updatedData);
      setEditingWorkItem(null);
    }
  };

  const personalPortfolio = [
    {
      title: "Fintech Product Teardown Analysis",
      description: "Comprehensive teardown of leading fintech apps analyzing UX, growth strategies, and monetization models.",
      expandedDescription: "Deep dive analysis covering user onboarding flows, feature comparison matrix, monetization strategies, and growth hacking techniques used by top fintech companies. Includes actionable insights and recommendations for product managers.",
      image: "/lovable-uploads/presentation-1.png", // Upload your presentation image here
      gradient: "from-primary/20 to-accent-teal/20"
    },
    {
      title: "Growth Strategy Case Study",
      description: "Data-driven growth experiments and optimization strategies for SaaS products with detailed ROI analysis.",
      expandedDescription: "Complete case study showcasing A/B testing methodologies, conversion funnel optimization, user acquisition strategies, and retention techniques. Includes real metrics and performance indicators with actionable growth frameworks.",
      image: "/lovable-uploads/presentation-2.png", // Upload your presentation image here
      gradient: "from-accent-orange/20 to-primary/20"
    },
    {
      title: "Product Requirements Documents",
      description: "Collection of detailed PRDs showcasing feature specifications, user stories, and technical requirements.",
      expandedDescription: "Professional PRD templates and examples covering feature specifications, user journey mapping, acceptance criteria, technical architecture, and stakeholder alignment. Perfect reference for product development workflows.",
      image: "/lovable-uploads/presentation-3.png", // Upload your presentation image here
      gradient: "from-accent-teal/20 to-accent-orange/20"
    },
    {
      title: "User Research & Testing Reports",
      description: "Usability testing reports and user interview insights driving data-backed product decisions.",
      expandedDescription: "Comprehensive user research methodology including interview scripts, usability testing protocols, data analysis frameworks, and actionable insights. Demonstrates user-centric approach to product development and decision making.",
      image: "/lovable-uploads/presentation-4.png", // Upload your presentation image here
      gradient: "from-primary/20 to-accent-orange/20"
    }
  ];

  return (
    <>
      {/* Work Experience Projects */}
      <section id="projects" className="py-20 bg-background">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Work Experience <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Real products launched at 5paisa with measurable impact. Here's how I've driven growth 
              and solved complex user problems through data-driven product decisions.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {workExperienceData.map((project, index) => (
              <div key={project.title} className="relative">
                {isAdminMode && (
                  <Dialog open={editingWorkItem === index} onOpenChange={(open) => !open && setEditingWorkItem(null)}>
                    <DialogTrigger asChild>
                      <button
                        onClick={() => handleEditWork(index)}
                        className="absolute top-4 right-4 z-10 p-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover-lift"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Edit Work Project</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 mt-4">
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={workEditFormData.title}
                            onChange={(e) => setWorkEditFormData(prev => ({ ...prev, title: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label>Problem</Label>
                          <Textarea
                            value={workEditFormData.problem}
                            onChange={(e) => setWorkEditFormData(prev => ({ ...prev, problem: e.target.value }))}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Solution</Label>
                          <Textarea
                            value={workEditFormData.solution}
                            onChange={(e) => setWorkEditFormData(prev => ({ ...prev, solution: e.target.value }))}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label>Impact</Label>
                          <Textarea
                            value={workEditFormData.impact}
                            onChange={(e) => setWorkEditFormData(prev => ({ ...prev, impact: e.target.value }))}
                            rows={2}
                          />
                        </div>
                        <Button onClick={handleSaveWorkEdit} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <ProjectCard
                  {...project}
                  delay={index === 0 ? "" : index === 1 ? "delay-200" : index === 2 ? "delay-500" : "delay-700"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personal Portfolio */}
      <section id="portfolio" className="py-20 bg-gradient-subtle">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Personal <span className="gradient-text">Portfolio</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Product decks, teardown analyses, and BRDs showcasing my strategic thinking and 
              analytical approach to product management.
            </p>
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {portfolioData.map((item, index) => (
              <Card 
                key={item.title}
                className={`group hover-lift animate-fade-in delay-${index * 200} border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] bg-card/50 backdrop-blur-sm`}
              >
                <CardContent className="p-8">
                  {/* Presentation Image */}
                  <div className="mb-6">
                    <img 
                      src={item.image} 
                      alt={`${item.title} presentation`}
                      className="w-full h-48 object-cover rounded-xl border border-border/50"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNTAgMTAwQzE1MCA5Mi44IDEzNy4yIDg3IDE0MCA4MEM5NiA4MCA2MCA4MCA2MCA4MEM2MCA4NCA2NCA4OCA2OCA5MkM3MiA5NiA3NiAxMDAgODAgMTA0Qzg0IDEwOCA4OCAxMTIgOTIgMTE2Qzk2IDEyMCAxMDAgMTI0IDEwNCAxMjhDMTA4IDEzMiAxMTIgMTM2IDExNiAxNDBDMTIwIDE0NCAxMjQgMTQ4IDEyOCAxNTJDMTMyIDE1NiAxMzYgMTYwIDE0MCA1MkMxNDQgNTYgMTQ4IDYwIDE1MiA2NEMxNTYgNjggMTYwIDcyIDE2NCA3NkMxNjggODAgMTcyIDg0IDE3NiA4OEMxODAgOTIgMTg0IDk2IDE4OCAxMDBDMTkyIDEwNCAxOTYgMTA4IDIwMCAxMTJDMjA0IDExNiAyMDggMTIwIDIxMiAxMjRDMjE2IDEyOCAyMjAgMTMyIDIyNCAxMzZDMjI4IDE0MCAyMzIgMTQ0IDIzNiAxNDhDMjQwIDE1MiAyNDQgMTU2IDI0OCAxNjBDMjUyIDE2NCAyNTYgMTY4IDI2MCAxNzJDMjY0IDE3NiAyNjggMTgwIDI3MiAxODRDMjc2IDE4OCAyODAgMTkyIDI4NCAyMDBIMTZDMTYgMTk2IDIwIDE5MiAyNCAxODhDMjggMTg0IDMyIDE4MCAzNiAxNzZDNDAgMTcyIDQ0IDE2OCA0OCAxNjRDNTIgMTYwIDU2IDE1NiA2MCAxNTJDNjQgMTQ4IDY4IDE0NCA3MiAxNDBDNzYgMTM2IDgwIDEzMiA4NCAxMjhDODggMTI0IDkyIDEyMCA5NiAxMTZDMTAwIDExMiAxMDQgMTA4IDEwOCAxMDRDMTEyIDEwMCAxMTYgOTYgMTIwIDkyQzEyNCA4OCAxMjggODQgMTMyIDgwQzEzNiA3NiAxNDAgNzIgMTQ0IDY4QzE0OCA2NCAxNTIgNjAgMTU2IDU2QzE2MCA1MiAxNjQgNDggMTY4IDQ0QzE3MiA0MCAxNzYgMzYgMTgwIDMyQzE4NCAyOCAxODggMjQgMTkyIDIwQzE5NiAxNiAyMDAgMTIgMjA0IDhDMjA4IDQgMjEyIDAgMjE2IDRDMjIwIDggMjI0IDEyIDIyOCAxNkMyMzIgMjAgMjM2IDI0IDI0MCAyOEMyNDQgMzIgMjQ4IDM2IDI1MiA0MEMyNTYgNDQgMjYwIDQ4IDI2NCA1MkMyNjggNTYgMjcyIDYwIDI3NiA2NEMyODAgNjggMjg0IDcyIDI4OCA3NkMyOTIgODAgMjk2IDg0IDMwMCA4OFYyMDBIMTZDMTYgMTk2IDIwIDE5MiAyNCAxODhMMTUwIDEwMFoiIGZpbGw9IiNEMUQ1REIiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSIxMzAiIHk9IjgwIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOTg5REE1Ii8+CjxwYXRoIGQ9Ik0yMCAxMEwzMCAyMEwyMCAzMEwxMCAyMEwyMCAxMFoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo8L3N2Zz4K';
                      }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-colors mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Collapsible Content */}
                  <Collapsible>
                    <CollapsibleTrigger 
                      className="flex items-center text-primary hover:text-primary/80 transition-colors mb-4"
                      onClick={() => toggleExpanded(index)}
                    >
                      <span className="text-sm font-medium">Read more</span>
                      <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expandedItems.has(index) ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {item.expandedDescription}
                      </p>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(item.title)}
                      className="group-hover:bg-primary group-hover:text-white transition-colors"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                    
                    {isAdmin && (
                      <>
                        <Dialog open={editingItem === index} onOpenChange={(open) => !open && setEditingItem(null)}>
                          <DialogTrigger asChild>
                            <Button 
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(index)}
                              className="hover:bg-blue-500 hover:text-white transition-colors"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Edit Portfolio Item</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                  id="title"
                                  value={editFormData.title}
                                  onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                  id="description"
                                  value={editFormData.description}
                                  onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                                  rows={3}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="expanded-description">Expanded Description</Label>
                                <Textarea
                                  id="expanded-description"
                                  value={editFormData.expandedDescription}
                                  onChange={(e) => setEditFormData(prev => ({ ...prev, expandedDescription: e.target.value }))}
                                  rows={4}
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="image-upload">Upload Presentation Image</Label>
                                <Input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                                {editFormData.image && (
                                  <img 
                                    src={editFormData.image} 
                                    alt="Preview" 
                                    className="w-full h-32 object-cover rounded border"
                                  />
                                )}
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="presentation-upload">Upload Presentation File</Label>
                                <Input
                                  id="presentation-upload"
                                  type="file"
                                  accept=".pdf,.ppt,.pptx,.doc,.docx"
                                  onChange={handlePresentationUpload}
                                />
                              </div>
                              
                              <div className="flex justify-end gap-2 pt-4">
                                <Button 
                                  variant="outline" 
                                  onClick={() => setEditingItem(null)}
                                >
                                  Cancel
                                </Button>
                                <Button onClick={handleSaveEdit}>
                                  Save Changes
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(index)}
                          className="hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                  
                  <div className={`h-1 bg-gradient-to-r ${item.gradient} rounded-full mt-6 opacity-60 group-hover:opacity-100 transition-opacity`}></div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16 animate-fade-in">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary to-accent-teal text-white hover:opacity-90 transition-opacity px-8 py-6 text-lg font-semibold rounded-xl"
            >
              <BarChart3 className="mr-2 h-5 w-5" />
              View Complete Portfolio
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Projects;