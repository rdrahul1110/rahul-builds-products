import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface EditHeroDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditHeroDialog = ({ open, onOpenChange }: EditHeroDialogProps) => {
  const [formData, setFormData] = useState({
    name: "Rahul Das",
    subtitle: "Product Manager | Growth Builder | Problem Solver | User-First Thinker",
    description: "I simplify complex problems into delightful user experiences. From fintech to e-commerce, I've built products that drive growth, trust, and engagement."
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Hero Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface EditAboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditAboutDialog = ({ open, onOpenChange }: EditAboutDialogProps) => {
  const [formData, setFormData] = useState({
    intro: "I'm a 2024 BITS Pilani graduate and currently a Associate Product Manager at 5paisa Capital. I'm passionate about solving real-world problems using data, user research, and design thinking.",
    approach: "My approach blends curiosity, structured problem-solving, and a bias for action. I believe in building products that not only meet business goals but also create genuine value for users."
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit About Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Introduction</Label>
            <Textarea
              value={formData.intro}
              onChange={(e) => setFormData(prev => ({ ...prev, intro: e.target.value }))}
              rows={3}
            />
          </div>
          <div>
            <Label>Approach</Label>
            <Textarea
              value={formData.approach}
              onChange={(e) => setFormData(prev => ({ ...prev, approach: e.target.value }))}
              rows={3}
            />
          </div>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

interface EditContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditContactDialog = ({ open, onOpenChange }: EditContactDialogProps) => {
  const [formData, setFormData] = useState({
    email: "rahul4ever2011@gmail.com",
    phone: "+91 6202320035",
    linkedin: "https://www.linkedin.com/in/rahul-das-117a56223/"
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Contact Information</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div>
            <Label>LinkedIn URL</Label>
            <Input
              value={formData.linkedin}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin: e.target.value }))}
            />
          </div>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
