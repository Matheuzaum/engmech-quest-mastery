
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import CoursesPage from "./pages/CoursesPage";
import DisciplinesPage from "./pages/DisciplinesPage";
import DisciplineTopicsPage from "./pages/DisciplineTopicsPage";
import TopicPage from "./pages/TopicPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<DisciplinesPage />} />
          <Route path="/courses/:courseId/:disciplineId" element={<DisciplineTopicsPage />} />
          <Route path="/courses/:courseId/:disciplineId/:topicId" element={<TopicPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
