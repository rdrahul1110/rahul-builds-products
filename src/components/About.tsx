import { Card } from "@/components/ui/card";
import { GraduationCap, Target, Users, TrendingUp } from "lucide-react";
const About = () => {
  return <section id="about" className="py-20 bg-gradient-subtle">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I'm a <span className="text-primary font-semibold">2024 BITS Pilani graduate</span> and 
                currently a <span className="text-accent-orange font-semibold">Product Manager at 5paisa Capital</span>. 
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
              <Card className="p-4 text-center hover-lift">
                <TrendingUp className="h-6 w-6 text-accent-orange mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">7
%+</div>
                <div className="text-sm text-muted-foreground">Avg Conversion Boost</div>
              </Card>
              
              <Card className="p-4 text-center hover-lift">
                <Target className="h-6 w-6 text-accent-teal mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">70%</div>
                <div className="text-sm text-muted-foreground">Support Automation</div>
              </Card>
            </div>
          </div>

          {/* Photo & Highlights */}
          <div className="animate-slide-up">
            {/* Professional Photo */}
            <div className="relative mb-8">
              <div className="w-80 h-80 mx-auto rounded-2xl overflow-hidden shadow-[var(--shadow-medium)] hover-lift">
                <img src="/lovable-uploads/93eeb9bc-1674-4014-83f5-4166799ce65d.png" alt="Rahul Das - Product Manager" className="w-full h-full object-cover object-center" />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent-orange/20 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent-teal/20 rounded-full animate-pulse delay-700"></div>
            </div>

            {/* Highlights */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border hover-lift">
                <GraduationCap className="h-6 w-6 text-primary" />
                <div>
                  <div className="font-semibold">BITS Pilani Graduate</div>
                  <div className="text-sm text-muted-foreground">Class of 2024</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border hover-lift">
                <Target className="h-6 w-6 text-accent-orange" />
                <div>
                  <div className="font-semibold">Product Manager</div>
                  <div className="text-sm text-muted-foreground">5paisa Capital</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-card rounded-xl border hover-lift">
                <TrendingUp className="h-6 w-6 text-accent-teal" />
                <div>
                  <div className="font-semibold">Growth Builder</div>
                  <div className="text-sm text-muted-foreground">Data-Driven Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default About;