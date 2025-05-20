/**
 * Утилиты для работы с WhatsApp
 */

/**
 * Форматирует телефонный номер для WhatsApp (удаляет все, кроме цифр)
 */
export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Создает ссылку для открытия чата WhatsApp с предзаполненным сообщением
 * @param phone - номер телефона в международном формате (например, 79991234567)
 * @param message - предзаполненное сообщение
 */
export const createWhatsAppLink = (phone: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://api.whatsapp.com/send?phone=${formatPhoneNumber(phone)}&text=${encodedMessage}`;
};

/**
 * Открывает WhatsApp с предзаполненным сообщением
 */
export const openWhatsApp = (phone: string, message: string): void => {
  const link = createWhatsAppLink(phone, message);
  window.open(link, "_blank");
};

/**
 * Форматирует данные заказа для отправки в WhatsApp
 */
export const formatOrderMessage = (
  orderData: Record<string, string>,
): string => {
  const { name, phone, address, product, comment } = orderData;

  return (
    `🥛 *Новый заказ на сайте!* 🥛\n\n` +
    `*Имя*: ${name}\n` +
    `*Телефон*: ${phone}\n` +
    `*Адрес*: ${address || "-"}\n` +
    `*Продукт*: ${product || "-"}\n` +
    `*Комментарий*: ${comment || "-"}\n\n` +
    `Пожалуйста, обработайте заказ как можно скорее.`
  );
};
