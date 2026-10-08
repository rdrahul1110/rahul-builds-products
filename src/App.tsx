import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import CaseStudyPage from "./pages/CaseStudyPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AdminProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<Auth />} />
            {/* Direct PDF & Case Study Dedicated Routes to prevent 404 redirect */}
            <Route
              path="/bookmyshow-case-study.pdf"
              element={
                <CaseStudyPage
                  pdfPath="/bookmyshow-case-study.pdf"
                  title="Improving BookMyShow: High-Surge Ticket Booking & Phantom Lock Resolution"
                  category="SYSTEM DESIGN & PRD"
                />
              }
            />
            <Route
              path="/zepto-case-study.pdf"
              element={
                <CaseStudyPage
                  pdfPath="/zepto-case-study.pdf"
                  title="Zepto: Boosting Order Value & Grocery Experience via 'Zepto Stock Up'"
                  category="QUICK COMMERCE · PRODUCT TEARDOWN & PRD"
                />
              }
            />
            <Route
              path="/case-study/bookmyshow"
              element={
                <CaseStudyPage
                  pdfPath="/bookmyshow-case-study.pdf"
                  title="Improving BookMyShow: High-Surge Ticket Booking & Phantom Lock Resolution"
                  category="SYSTEM DESIGN & PRD"
                />
              }
            />
            <Route
              path="/case-study/zepto"
              element={
                <CaseStudyPage
                  pdfPath="/zepto-case-study.pdf"
                  title="Zepto: Boosting Order Value & Grocery Experience via 'Zepto Stock Up'"
                  category="QUICK COMMERCE · PRODUCT TEARDOWN & PRD"
                />
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AdminProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
