import { Card } from "@/components/ui/card";
import { GraduationCap, Target, Users, TrendingUp, Edit } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { EditAboutDialog } from "./EditDialogs";
import { useState } from "react";

const About = () => {
  const { isAdminMode } = useAdmin();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  return <section id="about" className="relative py-20 bg-gradient-to-br from-background via-secondary to-background">
      {/* Admin Edit Button */}
      {isAdminMode && (
        <>
          <button 
            onClick={() => setEditDialogOpen(true)} 
            className="absolute top-8 right-8 z-10 p-3 bg-accent-teal hover:bg-accent-teal/90 text-white rounded-lg shadow-lg hover-lift flex items-center gap-2"
          >
            <Edit className="h-5 w-5" />
            Edit About
          </button>
          <EditAboutDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />
        </>
      )}
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-in-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="text-primary font-semibold">2024 BITS Pilani graduate</span> and 
                currently a <span className="text-accent-orange font-semibold">Associate Product Manager at 5paisa Capital</span>. 
                I'm passionate about solving real-world problems using data, user research, and design thinking.
              </p>
              
              <p>
                My approach blends <span className="text-accent-teal font-semibold">curiosity</span>, 
                structured problem-solving, and a bias for action. I believe in building products that not only 
                meet business goals but also create genuine value for users.
              </p>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <Card className="glass-effect p-4 text-center hover-lift hover-glow-orange animate-glow-pulse">
                <TrendingUp className="h-6 w-6 text-accent-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">7%+</div>
                <div className="text-sm text-muted-foreground">Avg Conversion Boost</div>
              </Card>
              
              <Card className="glass-effect p-4 text-center hover-lift hover-glow-teal animate-glow-pulse" style={{
              animationDelay: '0.5s'
            }}>
                <Target className="h-6 w-6 text-accent-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">70%</div>
                <div className="text-sm text-muted-foreground">Support Automation</div>
              </Card>
            </div>
          </div>

          {/* Photo & Highlights */}
          <div className="animate-slide-in-right">
            {/* Professional Photo */}
            <div className="relative mb-8">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-[var(--shadow-strong)] hover-lift hover-glow">
                <img src="/lovable-uploads/93eeb9bc-1674-4014-83f5-4166799ce65d.png" alt="Rahul Das - Product Manager" className="w-full h-full object-cover object-center hover-scale" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-orange/30 rounded-full animate-float blur-lg"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent-teal/30 rounded-full animate-float blur-lg" style={{
              animationDelay: '1s'
            }}></div>
              <div className="absolute top-1/2 -right-8 w-10 h-10 bg-primary/30 rounded-full animate-float blur-lg" style={{
              animationDelay: '1.5s'
            }}></div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 glass-effect rounded-xl hover-lift hover-glow">
                <div className="p-2 rounded-lg bg-primary/20 hover-rotate">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold">BITS Pilani Graduate</div>
                  <div className="text-sm text-muted-foreground">Class of 2024</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass-effect rounded-xl hover-lift hover-glow-orange">
                <div className="p-2 rounded-lg bg-accent-orange/20 hover-rotate">
                  <Target className="h-6 w-6 text-accent-orange" />
                </div>
                <div>
                  <div className="font-semibold">Product Manager</div>
                  <div className="text-sm text-muted-foreground">5paisa Capital</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 glass-effect rounded-xl hover-lift hover-glow-teal">
                <div className="p-2 rounded-lg bg-accent-teal/20 hover-rotate">
                  <TrendingUp className="h-6 w-6 text-accent-teal" />
                </div>
                <div>
                  <div className="font-semibold">Growth Builder</div>
                  <div className="text-sm text-muted-foreground">Data-Driven Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-16 animate-fade-in">
          <h3 className="text-2xl font-bold text-center mb-8">
            Key <span className="gradient-text">Achievements</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 text-center glass-effect hover-lift hover-glow-orange hover-scale">
              <div className="text-3xl font-bold gradient-text mb-2">5-7%</div>
              <div className="text-sm text-muted-foreground">User Engagement Boost</div>
              <div className="text-xs text-muted-foreground mt-1">Homepage & page redesigns</div>
            </Card>
            
            <Card className="p-6 text-center glass-effect hover-lift hover-glow-teal hover-scale">
              <div className="text-3xl font-bold text-accent-teal mb-2">3%</div>
              <div className="text-sm text-muted-foreground">Conversion Improvement</div>
              <div className="text-xs text-muted-foreground mt-1">Basket Investing & Compare tools</div>
            </Card>
            
            <Card className="p-6 text-center glass-effect hover-lift hover-glow hover-scale">
              <div className="text-3xl font-bold text-primary mb-2">70%</div>
              <div className="text-sm text-muted-foreground">Support Automation</div>
              <div className="text-xs text-muted-foreground mt-1">AI chatbot implementation</div>
            </Card>
            
            <Card className="p-6 text-center glass-effect hover-lift hover-glow-orange hover-scale">
              <div className="text-3xl font-bold text-accent-orange mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Partner Onboardings</div>
              <div className="text-xs text-muted-foreground mt-1">Partner Page revamp</div>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default About;