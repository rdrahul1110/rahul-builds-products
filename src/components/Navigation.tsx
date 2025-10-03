import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, LogIn, LogOut, Edit, RefreshCw } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAdmin, isAdminMode, user, signOut, loading, toggleAdminMode } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleResetContent = () => {
    if (window.confirm("Are you sure you want to reset all content to the default? This will clear all your local edits.")) {
      localStorage.removeItem('portfolioData');
      localStorage.removeItem('workExperienceData');
      localStorage.removeItem('skillCategories');
      localStorage.removeItem('achievements');
      window.location.reload();
    }
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-lg shadow-[var(--shadow-soft)] border-b border-border' 
        : 'bg-transparent'
    }`}>
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection('hero')}
          className="flex items-center space-x-2 text-2xl font-bold gradient-text hover:opacity-80 transition-opacity group"
        >
          <svg 
            className="h-8 w-8 text-accent-orange group-hover:rotate-12 transition-transform duration-300" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path d="M20 7h-3V4c0-1.1-.9-2-2-2h-6c-1.1 0-2 .9-2 2v3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2z"/>
            <circle cx="8" cy="14" r="2"/>
            <circle cx="16" cy="14" r="2"/>
            <path d="M8 12V9"/>
            <path d="M16 12V9"/>
          </svg>
          <span>RD</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          
          {/* Admin and User Buttons */}
          {!loading && user ? (
            <>
              {isAdmin && (
                <Button 
                  size="sm"
                  onClick={toggleAdminMode}
                  variant={isAdminMode ? "default" : "outline"}
                  className={isAdminMode ? "bg-primary" : "border-2 border-border hover:bg-secondary"}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  {isAdminMode ? "Exit Edit Mode" : "Edit Mode"}
                </Button>
              )}
              {isAdminMode && (
                <Button size="sm" onClick={handleResetContent} variant="destructive">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Content
                </Button>
              )}
              <Button size="sm" onClick={signOut} variant="outline" className="border-2 border-border hover:bg-secondary">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : null}
          
          <Button
            size="sm"
            className="bg-gradient-to-r from-primary to-accent-teal text-white hover:opacity-90 transition-opacity"
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
            <Download className="mr-2 h-4 w-4" />
            Resume
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border animate-fade-in">
          <div className="container py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.name}
              </button>
            ))}
            {/* Mobile Admin and User Buttons */}
            {!loading && user ? (
              <>
                {isAdmin && (
                  <Button size="sm" onClick={toggleAdminMode} variant={isAdminMode ? "default" : "outline"} className={isAdminMode ? "w-full bg-primary" : "w-full border-2 border-border hover:bg-secondary"}>
                    <Edit className="mr-2 h-4 w-4" />
                    {isAdminMode ? "Exit Edit Mode" : "Edit Mode"}
                  </Button>
                )}
                {isAdminMode && (
                  <Button size="sm" onClick={handleResetContent} variant="destructive" className="w-full">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset Content
                  </Button>
                )}
                <Button size="sm" onClick={signOut} variant="outline" className="w-full border-2 border-border hover:bg-secondary">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : null}
            <Button
              size="sm"
              className="w-full bg-gradient-to-r from-primary to-accent-teal text-white hover:opacity-90 transition-opacity mt-4"
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
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
