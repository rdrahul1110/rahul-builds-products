import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Download, 
  Send,
  MapPin,
  Clock,
  Edit
} from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { EditContactDialog } from "./EditDialogs";

const Contact = () => {
  const { isAdminMode } = useAdmin();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // Call edge function to send email
      const response = await fetch(`https://lggoryptfxfuqtlkojsd.supabase.co/functions/v1/send-contact-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact me directly via email.",
        variant: "destructive"
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Email",
      value: "rahul4ever2011@gmail.com",
      link: "mailto:rahul4ever2011@gmail.com"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn",
      value: "linkedin.com/in/rahul-das-117a56223",
      link: "https://www.linkedin.com/in/rahul-das-117a56223/"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: "+91 6202320035",
      link: "tel:+916202320035"
    }
  ];

  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-background via-secondary to-background">
      {/* Admin Edit Button */}
      {isAdminMode && (
        <>
          <button
            onClick={() => setEditDialogOpen(true)}
            className="absolute top-8 right-8 z-10 p-3 bg-accent-purple hover:bg-accent-purple/90 text-white rounded-lg shadow-lg hover-lift flex items-center gap-2"
          >
            <Edit className="h-5 w-5" />
            Edit Contact
          </button>
          <EditContactDialog open={editDialogOpen} onOpenChange={setEditDialogOpen} />
        </>
      )}
      
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Interested in collaborating or discussing product opportunities? 
            I'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-effect animate-slide-in-left hover-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-muted/30 border-border focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-muted/30 border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="bg-muted/30 border-border focus:border-primary"
                />
                
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="bg-muted/30 border-border focus:border-primary min-h-[120px]"
                  required
                />
                
                <Button 
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-accent-teal text-white hover:opacity-90 transition-opacity"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Quick Contact */}
            <div>
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              
              {/* Social Icons Row */}
              <div className="flex gap-4 mb-6">
                <a
                  href="mailto:rahul4ever2011@gmail.com"
                  className="p-3 rounded-xl glass-effect text-accent-orange hover:bg-accent-orange hover:text-white transition-all duration-300 hover-scale hover-glow-orange"
                  title="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rahul-das-117a56223/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass-effect text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover-scale hover-glow"
                  title="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="tel:+916202320035"
                  className="p-3 rounded-xl glass-effect text-accent-teal hover:bg-accent-teal hover:text-white transition-all duration-300 hover-scale hover-glow-teal"
                  title="Phone"
                >
                  <Phone className="h-6 w-6" />
                </a>
              </div>
              
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.link}
                    className="flex items-center space-x-4 p-4 glass-effect rounded-xl hover-lift hover-glow hover-scale group"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors hover-rotate">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{item.label}</div>
                      <div className="text-muted-foreground">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Resume Download */}
            <Card className="glass-effect hover-glow-orange hover-scale bg-gradient-to-br from-accent-orange/10 to-accent-teal/10">
              <CardContent className="p-6 text-center">
                <Download className="h-12 w-12 text-accent-orange mx-auto mb-4" />
                <h4 className="text-xl font-bold mb-2">Download My Resume</h4>
                <p className="text-muted-foreground mb-6">
                  Get the full details of my experience and achievements.
                </p>
                <div className="flex gap-4">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-accent-orange to-accent-orange/90 text-white hover:opacity-90 transition-opacity flex-1"
                    onClick={() => {
                      const downloadUrl = `https://lggoryptfxfuqtlkojsd.supabase.co/storage/v1/object/public/portfolio-files/rahul-das-resume.pdf`;
                      const link = document.createElement('a');
                      link.href = downloadUrl;
                      link.download = 'Rahul-Das-Resume.pdf';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume (PDF)
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white flex-1"
                    onClick={() => window.open('https://www.linkedin.com/in/rahul-das-117a56223/', '_blank')}
                  >
                    <Linkedin className="mr-2 h-5 w-5" />
                    View My LinkedIn
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="glass-effect hover-glow hover-scale">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-accent-teal" />
                  <h4 className="font-bold">Availability</h4>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Open to new opportunities</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Based in India (IST)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Typically responds within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;