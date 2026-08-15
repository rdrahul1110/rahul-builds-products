import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface EditSkillsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditSkillsDialog = ({ open, onOpenChange }: EditSkillsDialogProps) => {
  const [categories, setCategories] = useState([
    {
      title: "Product Skills",
      skills: ["Product Roadmapping", "PRD Writing", "Root Cause Analysis", "User Research", "A/B Testing", "Growth Experiments"]
    },
    {
      title: "Analytics & Data",
      skills: ["Google Analytics", "SQL Basics", "Data Analysis", "KPI Tracking", "Cohort Analysis", "Conversion Optimization"]
    },
    {
      title: "Design & Research",
      skills: ["Figma", "User Journey Mapping", "Wireframing", "Prototyping", "Usability Testing", "Design Systems"]
    },
    {
      title: "Technical Tools",
      skills: ["Jira", "Rasa NLU", "API Documentation", "Git Basics", "Agile/Scrum", "Product Analytics"]
    }
  ]);
  
  const [newSkill, setNewSkill] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedCategories = [...categories];
      updatedCategories[selectedCategory].skills.push(newSkill.trim());
      setCategories(updatedCategories);
      setNewSkill("");
    }
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].skills.splice(skillIndex, 1);
    setCategories(updatedCategories);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Skills & Expertise</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 mt-4">
          {categories.map((category, categoryIndex) => (
            <div key={category.title} className="space-y-3 p-4 border rounded-lg">
              <h3 className="font-semibold text-lg">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex}
                    variant="secondary"
                    className="flex items-center gap-1 group hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(categoryIndex, skillIndex)}
                      className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="Add new skill"
                  value={selectedCategory === categoryIndex ? newSkill : ""}
                  onChange={(e) => {
                    setSelectedCategory(categoryIndex);
                    setNewSkill(e.target.value);
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                />
                <Button 
                  size="icon"
                  onClick={addSkill}
                  disabled={!newSkill.trim() || selectedCategory !== categoryIndex}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
