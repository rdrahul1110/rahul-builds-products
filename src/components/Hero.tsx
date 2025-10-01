import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Edit } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { EditHeroDialog } from "./EditDialogs";
import { useState } from "react";

const Hero = () => {
  const { isAdminMode } = useAdmin();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  
  return <section className="relative min-h-screen flex items-center justify-center bg-mesh-gradient overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-accent-orange/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent-teal/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-accent-purple/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      {/* Admin Edit Button */}
      {isAdminMode && (
        <>
          <button
            onClick={() => setEditDialogOpen(true)}
            className="absolute top-20 right-8 z-20 p-3 bg-accent-orange hover:bg-accent-orange/90 text-white rounded-lg shadow-lg hover-lift flex items-center gap-2"
          >
            <Edit className="h-5 w-5" />
            Edit Hero
          </button>
          <EditHeroDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />
        </>
      )}

      <div className="container relative z-10 text-center animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="gradient-hero">Rahul Das</span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl font-semibold text-muted-foreground mt-2 block mx-0 my-[15px]">Product Manager | Growth Builder | Problem Solver | User-First Thinker </span>
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up">
            I simplify complex problems into delightful user experiences. 
            From fintech to e-commerce, I've built products that drive{" "}
            <span className="text-accent-orange font-semibold">growth</span>,{" "}
            <span className="text-accent-teal font-semibold">trust</span>, and{" "}
            <span className="text-primary font-semibold">engagement</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
            <Button size="lg" className="bg-gradient-to-r from-accent-orange via-accent-orange-dark to-accent-orange hover:shadow-[var(--shadow-glow-orange)] text-white px-8 py-6 text-lg font-semibold rounded-xl hover-lift hover-glow-orange group">
              <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </Button>
            
            <Button size="lg" variant="outline" onClick={scrollToProjects} className="glass-effect border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl hover-lift hover-glow group">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};
export default Hero;