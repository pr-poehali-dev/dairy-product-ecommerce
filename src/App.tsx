import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WhatsAppConfigProvider } from "./components/WhatsAppConfig";
import { EmailConfigProvider } from "./components/EmailConfig";
import { ContactsConfigProvider } from "./components/ContactsConfig";
import { OrderProvider } from "./components/OrderContext"; // Импортируем OrderProvider
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
            <OrderProvider>
              {" "}
              {/* Оборачиваем Routes в OrderProvider */}
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </OrderProvider>
          </ContactsConfigProvider>
        </EmailConfigProvider>
      </WhatsAppConfigProvider>
    </Router>
  );
}

export default App;
