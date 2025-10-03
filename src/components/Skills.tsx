import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  BarChart3, 
  Users, 
  Lightbulb, 
  Search, 
  TrendingUp,
  Figma,
  Database,
  LineChart,
  Settings,
  Edit
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
// import { EditSkillsDialog } from "./EditSkillsDialog";
import { useState, useEffect } from "react";

const Skills = () => {
  const { isAdmin } = useAdmin();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  
  const initialSkillCategories = [
    {
      title: "Product Skills",
      icon: <Brain className="h-6 w-6" />,
      gradient: "from-primary/20 to-accent-orange/20",
      skills: [
        "Product Roadmapping",
        "PRD Writing",
        "Root Cause Analysis",
        "User Research",
        "A/B Testing",
        "Growth Experiments"
      ]
    },
    {
      title: "Analytics & Data",
      icon: <BarChart3 className="h-6 w-6" />,
      gradient: "from-accent-teal/20 to-primary/20",
      skills: [
        "Google Analytics",
        "SQL Basics",
        "Data Analysis",
        "KPI Tracking",
        "Cohort Analysis",
        "Conversion Optimization"
      ]
    },
    {
      title: "Design & Research",
      icon: <Figma className="h-6 w-6" />,
      gradient: "from-accent-orange/20 to-accent-teal/20",
      skills: [
        "Figma",
        "User Journey Mapping",
        "Wireframing",
        "Prototyping",
        "Usability Testing",
        "Design Systems"
      ]
    },
    {
      title: "Technical Tools",
      icon: <Settings className="h-6 w-6" />,
      gradient: "from-accent-teal/20 to-accent-orange/20",
      skills: [
        "Jira",
        "Rasa NLU",
        "API Documentation",
        "Git Basics",
        "Agile/Scrum",
        "Product Analytics"
      ]
    }
  ];

  const initialAchievements = [
    {
      icon: <TrendingUp className="h-8 w-8 text-accent-orange" />,
      title: "Growth Impact",
      description: "Consistently delivered 3-5% improvements in key metrics"
    },
    {
      icon: <Users className="h-8 w-8 text-accent-teal" />,
      title: "User-Centric",
      description: "Built features used by 500K+ active users"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "Innovation",
      description: "Implemented AI chatbot in fintech space"
    },
    {
      icon: <Search className="h-8 w-8 text-accent-orange" />,
      title: "Research-Driven",
      description: "Data-backed decisions with 70%+ success rate"
    }
  ];

  const [skillCategories, setSkillCategories] = useState(() => {
    const saved = localStorage.getItem('skillCategories');
    if (saved) {
      const savedData = JSON.parse(saved);
      // Restore non-serializable icon and gradient from initial data
      return savedData.map((item: any, index: number) => ({
        ...item,
        icon: initialSkillCategories[index]?.icon,
        gradient: initialSkillCategories[index]?.gradient,
      }));
    }
    return initialSkillCategories;
  });

  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements');
    // Restore non-serializable icon from initial data
    const savedData = saved ? JSON.parse(saved) : initialAchievements;
    return savedData.map((item: any, index: number) => ({ ...item, icon: initialAchievements[index]?.icon }));
  });

  useEffect(() => {
    // We stringify a version without the non-serializable icon/gradient elements for localStorage
    localStorage.setItem('skillCategories', JSON.stringify(skillCategories.map(({ icon, gradient, ...rest }) => rest)));
    localStorage.setItem('achievements', JSON.stringify(achievements.map(({ icon, ...rest }) => rest)));
  }, [skillCategories, achievements]);

  return (
    <section id="skills" className="relative py-20 bg-gradient-to-br from-secondary via-background to-secondary">
      {/* Admin Edit Button */}
      {isAdmin && (
        <>
          <button
            onClick={() => setEditDialogOpen(true)}
            className="absolute top-8 right-8 z-10 p-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-lg hover-lift flex items-center gap-2"
          >
            <Edit className="h-5 w-5" />
            Edit Skills
          </button>
          {/* <EditSkillsDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} /> */}
        </>
      )}
      
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Skills & <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building products that users love and businesses need.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {skillCategories.map((category, index) => (
            <Card 
              key={category.title} 
              className={`glass-effect hover-lift hover-glow hover-scale animate-fade-in delay-${index * 100}`}
            >
              <CardContent className="p-6">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${category.gradient} w-fit mb-4 hover-rotate`}>
                  {category.icon}
                </div>
                
                <h3 className="text-lg font-bold mb-4">{category.title}</h3>
                
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary" 
                      className="mr-1 mb-1 glass-effect text-foreground hover:bg-primary hover:text-primary-foreground transition-all hover-scale"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card 
              key={achievement.title}
              className={`text-center glass-effect hover-lift hover-glow hover-scale animate-slide-up delay-${index * 150}`}
            >
              <CardContent className="p-6">
                <div className="flex justify-center mb-4 hover-rotate">
                  {achievement.icon}
                </div>
                <h3 className="font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;