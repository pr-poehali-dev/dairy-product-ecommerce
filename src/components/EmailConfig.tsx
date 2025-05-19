
import React, { createContext, useContext, useState, useEffect } from "react";

interface EmailConfigContextType {
  email: string;
  setEmail: (email: string) => void;
}

const defaultEmailValue = "m88813399@gmail.com";

const EmailConfigContext = createContext<EmailConfigContextType | undefined>(undefined);

export const EmailConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmailState] = useState<string>(defaultEmailValue);

  // Загружаем сохраненный email при монтировании
  useEffect(() => {
    const savedEmail = localStorage.getItem("notificationEmail");
    if (savedEmail) {
      setEmailState(savedEmail);
    }
  }, []);

  // Сохраняем email в localStorage при изменении
  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
    localStorage.setItem("notificationEmail", newEmail);
  };

  return (
    <EmailConfigContext.Provider
      value={{
        email,
        setEmail,
      }}
    >
      {children}
    </EmailConfigContext.Provider>
  );
};

export const useEmailConfig = () => {
  const context = useContext(EmailConfigContext);
  if (context === undefined) {
    throw new Error("useEmailConfig must be used within an EmailConfigProvider");
  }
  return context;
};
