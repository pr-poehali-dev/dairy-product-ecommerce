/**
 * Утилиты для работы с Telegram Bot API
 */

// Конфигурация Telegram бота
const BOT_TOKEN = "YOUR_BOT_TOKEN_HERE"; // Замените на токен вашего бота
const CHAT_ID = "YOUR_CHAT_ID_HERE"; // Замените на ID чата куда отправлять сообщения

/**
 * Отправляет сообщение через Telegram Bot API
 */
export const sendTelegramMessage = async (
  message: string,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      },
    );

    const result = await response.json();
    return result.ok;
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
    return false;
  }
};

/**
 * Форматирует заявку для отправки в Telegram
 */
export const formatTelegramOrder = (orderData: {
  name: string;
  phone: string;
  address?: string;
  product?: string;
  comment: string;
}): string => {
  const { name, phone, address, product, comment } = orderData;

  return (
    `🥛 *Новая заявка с сайта!* 🥛\n\n` +
    `*Имя:* ${name}\n` +
    `*Телефон:* ${phone}\n` +
    `*Адрес:* ${address || "Не указан"}\n` +
    `*Продукт:* ${product || "Не указан"}\n` +
    `*Сообщение:* ${comment}\n\n` +
    `⏰ ${new Date().toLocaleString("ru-RU")}`
  );
};

/**
 * Конфигурация бота (для настройки в админ панели)
 */
export interface TelegramBotConfig {
  botToken: string;
  chatId: string;
  isEnabled: boolean;
}

/**
 * Проверяет настройки бота
 */
export const validateBotConfig = (config: TelegramBotConfig): boolean => {
  return !!(config.botToken && config.chatId && config.isEnabled);
};
