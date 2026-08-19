import { Linkedin, Mail, ArrowUpRight, Download } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 relative z-10 bg-[#08090C] border-t border-white/5">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Full Story CTA Box */}
        <div className="mb-24 bg-[#0D0F14] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-sm animate-fade-in hover:border-emerald-500/20 transition-colors">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-4">Want the full story?</h2>
          <p className="text-slate-400 text-lg mb-8">
            Explore my experience, projects and product journey in one page.
          </p>
          <a 
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          >
            View Resume
            <Download className="w-4 h-4" />
          </a>
        </div>

        {/* Traditional Contact */}
        <span className="text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-4 block animate-fade-in">CONTACT</span>
        
        <h2 className="text-4xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Have a difficult workflow, an AI product problem, or an interesting PM role?
        </h2>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <a 
            href="https://www.linkedin.com/in/rahul-das-117a56223/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D0F14] border border-white/10 px-8 py-4 text-sm font-semibold text-white hover:border-emerald-500/50 hover:bg-white/5 hover:text-emerald-400 transition-all duration-300 shadow-sm hover-lift"
          >
            <Linkedin className="w-5 h-5 text-emerald-500 group-hover:scale-110 transition-transform" />
            Connect on LinkedIn
            <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </a>

          <button 
            onClick={() => {
              navigator.clipboard.writeText("rahul4ever2011@gmail.com");
              alert("Email copied to clipboard!");
            }}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 shadow-[0_0_15px_rgba(16,185,129,0.15)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
          >
            <Mail className="w-5 h-5" />
            Copy Email
          </button>
        </div>

      </div>
    </section>
  );
};

export default Contact;