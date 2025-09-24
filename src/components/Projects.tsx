import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, TrendingUp, Users, BarChart3, HandHeart } from "lucide-react";
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
  const workExperience = [
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
  ];

  const personalPortfolio = [
    {
      title: "Fintech Product Teardown Analysis",
      description: "Comprehensive teardown of leading fintech apps analyzing UX, growth strategies, and monetization models.",
      buttonText: "Read Teardown",
      gradient: "from-primary/20 to-accent-teal/20"
    },
    {
      title: "Growth Strategy Case Study",
      description: "Data-driven growth experiments and optimization strategies for SaaS products with detailed ROI analysis.",
      buttonText: "View Case Study Deck",
      gradient: "from-accent-orange/20 to-primary/20"
    },
    {
      title: "Product Requirements Documents",
      description: "Collection of detailed PRDs showcasing feature specifications, user stories, and technical requirements.",
      buttonText: "View PRD Examples",
      gradient: "from-accent-teal/20 to-accent-orange/20"
    },
    {
      title: "User Research & Testing Reports",
      description: "Usability testing reports and user interview insights driving data-backed product decisions.",
      buttonText: "View Research",
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
            {workExperience.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                delay={index === 0 ? "" : index === 1 ? "delay-200" : index === 2 ? "delay-500" : "delay-700"}
              />
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
            {personalPortfolio.map((item, index) => (
              <Card 
                key={item.title}
                className={`group hover-lift animate-fade-in delay-${index * 200} border-0 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-medium)] bg-card/50 backdrop-blur-sm`}
              >
                <CardContent className="p-8">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${item.gradient} w-fit mb-6`}>
                    <BarChart3 className="h-12 w-12" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:gradient-text transition-colors mb-4">
                    {item.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <Button 
                    variant="outline"
                    className="group-hover:bg-primary group-hover:text-white transition-colors"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {item.buttonText}
                  </Button>
                  
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