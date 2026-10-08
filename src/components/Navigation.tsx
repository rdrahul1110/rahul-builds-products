import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Download, LogOut, Edit, RefreshCw } from "lucide-react";
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
    { name: "Work", id: "projects" },
    { name: "Teardowns", id: "teardowns" },
    { name: "About", id: "about" }
  ];

  return (
    <header className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? 'bg-[#08090C]/90 border-white/5 shadow-sm' : 'bg-[#08090C]/70 border-transparent hover:bg-[#08090C]/90'} backdrop-blur-md`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <span className="text-xl font-bold font-display text-white tracking-tight hover:text-emerald-500 transition-colors cursor-pointer">
              Rahul Das
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-dot"></div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 border border-white/10 rounded-full px-2 py-1 bg-[#0D0F14]/50 backdrop-blur-sm">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && user ? (
              <>
                {isAdmin && (
                  <Button 
                    size="sm"
                    onClick={toggleAdminMode}
                    variant={isAdminMode ? "default" : "outline"}
                    className={isAdminMode ? "bg-emerald-500 text-white" : "border-white/10 hover:bg-white/5 text-slate-400"}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    {isAdminMode ? "Exit Edit Mode" : "Edit Mode"}
                  </Button>
                )}
                {isAdminMode && (
                  <Button size="sm" onClick={handleResetContent} variant="destructive">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                )}
                <Button size="sm" onClick={signOut} variant="outline" className="border-white/10 hover:bg-white/5 text-slate-400">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : null}
            
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-emerald-500 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#08090C] border-t border-white/5 animate-fade-in shadow-lg">
          <div className="container py-6 space-y-4 px-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2 text-slate-400 hover:text-emerald-500 transition-colors font-medium text-sm"
              >
                {item.name}
              </button>
            ))}
            {!loading && user ? (
              <div className="space-y-2 pt-2 border-t border-white/5">
                {isAdmin && (
                  <Button size="sm" onClick={toggleAdminMode} variant={isAdminMode ? "default" : "outline"} className={isAdminMode ? "w-full bg-emerald-500" : "w-full border-white/10"}>
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
                <Button size="sm" onClick={signOut} variant="outline" className="w-full border-white/10 text-slate-400 hover:text-white hover:bg-white/5">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : null}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold transition-all duration-300 mt-4"
            >
              <Download className="mr-2 h-4 w-4" />
              View Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
