
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import { OrderProvider } from "@/components/OrderContext";
import { EmailConfigProvider } from "@/components/EmailConfig";
import "./App.css";

function App() {
  return (
    <EmailConfigProvider>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </OrderProvider>
    </EmailConfigProvider>
  );
}

export default App;
