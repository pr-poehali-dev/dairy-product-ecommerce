import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WhatsAppConfigProvider } from "./components/WhatsAppConfig";
import { EmailConfigProvider } from "./components/EmailConfig";
import { ContactsConfigProvider } from "./components/ContactsConfig";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  return (
    <Router>
      <WhatsAppConfigProvider>
        <EmailConfigProvider>
          <ContactsConfigProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ContactsConfigProvider>
        </EmailConfigProvider>
      </WhatsAppConfigProvider>
    </Router>
  );
}

export default App;
