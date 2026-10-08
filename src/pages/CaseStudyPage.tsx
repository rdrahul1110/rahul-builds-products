import React from "react";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";

interface CaseStudyPageProps {
  pdfPath: string;
  title: string;
  category?: string;
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ pdfPath, title, category = "PRODUCT CASE STUDY & PRD" }) => {
  const githubRawUrl = `https://raw.githubusercontent.com/rdrahul1110/rahul-builds-products/main/public${pdfPath}`;
  const directUrl = pdfPath;

  return (
    <div className="min-h-screen bg-[#08090C] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08090C]/90 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Portfolio</span>
            </a>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                {category}
              </span>
              <h1 className="text-base sm:text-lg font-bold font-display text-white line-clamp-1">
                {title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={githubRawUrl}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs sm:text-sm font-semibold shadow-lg shadow-cyan-500/20 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open in New Tab</span>
            </a>
          </div>
        </div>
      </header>

      {/* Embedded PDF Viewer */}
      <main className="flex-1 p-2 sm:p-4 max-w-7xl mx-auto w-full flex flex-col">
        <div className="w-full flex-1 rounded-2xl overflow-hidden border border-white/10 bg-[#030712] shadow-2xl relative min-h-[80vh]">
          <object
            data={directUrl}
            type="application/pdf"
            className="w-full h-full min-h-[80vh]"
          >
            <iframe
              src={directUrl}
              title={title}
              className="w-full h-full min-h-[80vh] border-0"
            >
              <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center h-full">
                <FileText className="w-12 h-12 text-cyan-400 mb-4" />
                <p className="text-lg font-semibold text-white mb-2">Unable to display PDF directly in your browser</p>
                <p className="text-sm text-slate-400 max-w-md mb-6">
                  Your device or browser settings do not support inline PDF previews. You can view or download the full document directly.
                </p>
                <div className="flex gap-3">
                  <a
                    href={githubRawUrl}
                    download
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm inline-flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF File
                  </a>
                  <a
                    href={`https://docs.google.com/viewer?url=${encodeURIComponent(githubRawUrl)}&embedded=true`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white font-semibold text-sm inline-flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View with Google Docs
                  </a>
                </div>
              </div>
            </iframe>
          </object>
        </div>
      </main>
    </div>
  );
};

export default CaseStudyPage;
