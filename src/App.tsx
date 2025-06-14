
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import GpuDetails from "./pages/GpuDetails";
import GpuComparison from "./pages/GpuComparison";
import GPUComparison from "./pages/GPUComparison";
import GpuSelection from "./pages/GpuSelection";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/gpu/:id" element={<GpuDetails />} />
              <Route path="/gpu/:id/compare" element={<GpuComparison />} />
              <Route path="/comparison" element={<GPUComparison />} />
              <Route path="/selection" element={<GpuSelection />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
