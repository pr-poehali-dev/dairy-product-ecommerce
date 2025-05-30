import React, { createContext, useContext, useState } from "react";

interface TelegramBotConfig {
  botToken: string;
  chatId: string;
  isEnabled: boolean;
}

interface TelegramBotConfigContextType {
  config: TelegramBotConfig;
  setConfig: (config: TelegramBotConfig) => void;
  updateConfig: (updates: Partial<TelegramBotConfig>) => void;
}

const defaultConfig: TelegramBotConfig = {
  botToken: "YOUR_BOT_TOKEN_HERE",
  chatId: "YOUR_CHAT_ID_HERE",
  isEnabled: true,
};

const TelegramBotConfigContext = createContext<
  TelegramBotConfigContextType | undefined
>(undefined);

export const TelegramBotConfigProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [config, setConfig] = useState<TelegramBotConfig>(() => {
    const saved = localStorage.getItem("telegramBotConfig");
    return saved ? JSON.parse(saved) : defaultConfig;
  });

  const updateConfig = (updates: Partial<TelegramBotConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem("telegramBotConfig", JSON.stringify(newConfig));
  };

  return (
    <TelegramBotConfigContext.Provider
      value={{ config, setConfig, updateConfig }}
    >
      {children}
    </TelegramBotConfigContext.Provider>
  );
};

export const useTelegramBotConfig = (): TelegramBotConfigContextType => {
  const context = useContext(TelegramBotConfigContext);
  if (!context) {
    throw new Error(
      "useTelegramBotConfig must be used within TelegramBotConfigProvider",
    );
  }
  return context;
};
