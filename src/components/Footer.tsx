import { Heart, Linkedin, Mail, Github } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      url: "https://www.linkedin.com/in/rahul-das-117a56223/"
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: "mailto:rahul4ever2011@gmail.com"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 text-white py-16 relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button 
              onClick={scrollToTop}
              className="text-3xl font-display font-bold mb-4 hover:opacity-80 transition-opacity tracking-tight"
            >
              Rahul Das
            </button>
            <p className="text-slate-400 leading-relaxed max-w-md">
              AI-native product manager turning messy workflows into simple, measurable products. Building practical solutions across fintech, insurtech, and zero-to-one development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-white">Quick Links</h4>
            <div className="space-y-2">
              {[
                { name: 'Work', id: 'projects' },
                { name: 'About', id: 'about' },
                { name: 'Experience', id: 'experience' },
                { name: 'Contact', id: 'contact' }
              ].map((section) => (
                <button
                  key={section.name}
                  onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
                  className="block text-slate-400 hover:text-emerald-500 transition-colors"
                >
                  {section.name}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-4 text-white">Connect</h4>
            <div className="space-y-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="flex items-center space-x-2 text-slate-400 hover:text-emerald-500 transition-colors group"
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
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-slate-400">
              <span>© {currentYear} Rahul Das. Made with</span>
              <Heart className="h-4 w-4 text-emerald-500 fill-emerald-500 animate-pulse" />
              <span>in India</span>
            </div>
            
            <div className="text-slate-500 text-sm">
              <span>Product Manager • Problem Solver • Growth Builder</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;