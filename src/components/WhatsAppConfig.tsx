
import React, { createContext, useContext, useState } from "react";

interface WhatsAppConfigContextType {
  whatsappNumber: string;
  setWhatsappNumber: (number: string) => void;
}

const defaultNumber = "79999999999"; // Замените на ваш номер WhatsApp

const WhatsAppConfigContext = createContext<WhatsAppConfigContextType | undefined>(undefined);

export const WhatsAppConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    // Попробуем загрузить номер из localStorage, если он там есть
    const savedNumber = localStorage.getItem("whatsappNumber");
    return savedNumber || defaultNumber;
  });

  // Сохраняем номер в localStorage при изменении
  const updateWhatsappNumber = (number: string) => {
    setWhatsappNumber(number);
    localStorage.setItem("whatsappNumber", number);
  };

  return (
    <WhatsAppConfigContext.Provider
      value={{
        whatsappNumber,
        setWhatsappNumber: updateWhatsappNumber,
      }}
    >
      {children}
    </WhatsAppConfigContext.Provider>
  );
};

export const useWhatsAppConfig = () => {
  const context = useContext(WhatsAppConfigContext);
  if (context === undefined) {
    throw new Error("useWhatsAppConfig must be used within a WhatsAppConfigProvider");
  }
  return context;
};
