
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WorkloadProvider } from "@/contexts/WorkloadContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import GpuSelection from "./pages/GpuSelection";
import GpuDetails from "./pages/GpuDetails";
import GpuComparison from "./pages/GpuComparison";
import Marketplace from "./pages/Marketplace";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="market01-theme">
      <WorkloadProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/gpu-selection" element={<GpuSelection />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/gpu/:id" element={<GpuDetails />} />
              <Route path="/gpu/:id/compare" element={<GpuComparison />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/community" element={<Community />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WorkloadProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
