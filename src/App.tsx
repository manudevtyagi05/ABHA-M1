import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateABHA from "./pages/CreateABHA";
import AadharVerification from "./pages/AadharVerification";
import OTPVerification from "./pages/OTPVerification";
import AddressSelection from "./pages/AddressSelection";
import ABHADetails from "./pages/ABHADetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-abha" element={<CreateABHA />} />
          <Route path="/create-abha/aadhar" element={<AadharVerification />} />
          <Route path="/create-abha/aadhar/otp" element={<OTPVerification />} />
          <Route path="/create-abha/address-selection" element={<AddressSelection />} />
          <Route path="/abha-details" element={<ABHADetails />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
