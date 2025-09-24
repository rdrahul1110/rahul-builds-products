import { Heart, Linkedin, Mail, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://linkedin.com/in/rahuldas"
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:rahuldas@email.com"
    },
    {
      name: "GitHub",
      icon: <Github className="h-5 w-5" />,
      url: "https://github.com/rahuldas"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-br from-foreground via-foreground/95 to-foreground/90 text-background py-16">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button 
              onClick={scrollToTop}
              className="text-3xl font-bold mb-4 hover:opacity-80 transition-opacity gradient-hero"
            >
              Rahul Das
            </button>
            <p className="text-background/70 leading-relaxed max-w-md">
              Product Manager passionate about solving complex problems with simple, 
              user-first solutions. Building products that drive growth and create value.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-background">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Projects', 'Skills', 'Contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-background/70 hover:text-background transition-colors"
                >
                  {section}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-4 text-background">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="flex items-center space-x-2 text-background/70 hover:text-background transition-colors group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="group-hover:scale-110 transition-transform">
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-background/70">
              <span>© {currentYear} Rahul Das. Made with</span>
              <Heart className="h-4 w-4 text-red-400 fill-current animate-pulse" />
              <span>in India</span>
            </div>
            
            <div className="text-background/50 text-sm">
              <span>Product Manager • Problem Solver • Growth Builder</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;