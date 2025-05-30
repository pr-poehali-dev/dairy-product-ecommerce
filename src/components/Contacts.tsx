import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useWhatsAppConfig } from "./WhatsAppConfig";
import { useContactsConfig } from "./ContactsConfig";
import { useEmailConfig } from "./EmailConfig";
import { formatOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { formatTelegramOrder, sendTelegramMessage } from "@/lib/telegram";
import { useTelegramBotConfig } from "./TelegramBotConfig";
import { toast } from "@/hooks/use-toast";

// Константа для Telegram-ссылки
const TELEGRAM_LINK = "https://t.me/molohka";

export default function Contacts() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Получаем контакты и другие настройки из контекста
  const { contacts } = useContactsConfig();
  const { whatsappNumber } = useWhatsAppConfig();
  const { email } = useEmailConfig();
  const { config: telegramConfig } = useTelegramBotConfig();

  // Функция для открытия Telegram
  const openTelegram = () => {
    window.open(TELEGRAM_LINK, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Формируем данные заявки
      const orderData = {
        name,
        phone,
        address: "-",
        product: "-",
        comment: message,
      };

      // Отправляем через Telegram бота, если настроен
      if (
        telegramConfig.isEnabled &&
        telegramConfig.botToken &&
        telegramConfig.chatId
      ) {
        const telegramMessage = formatTelegramOrder(orderData);
        const telegramSent = await sendTelegramMessage(telegramMessage);

        if (telegramSent) {
          toast({
            title: "Заявка отправлена!",
            description:
              "Ваше сообщение успешно доставлено через Telegram бота",
            duration: 5000,
          });

          // Очищаем форму
          setName("");
          setPhone("");
          setMessage("");
          setShowSuccess(true);
          setIsSubmitting(false);
          return;
        }
      }

      // Fallback: используем старый метод с email и открытием Telegram
      const orderMessage = formatOrderMessage(orderData);

      // Создаем данные для email формы
      const formData = {
        name,
        phone,
        message,
        _subject: `Сообщение с сайта от ${name}`,
        _captcha: "false",
        _template: "table",
        _replyto: email,
      };

      // Отправляем форму на email через formsubmit.co
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Открываем Telegram
        openTelegram();

        // Копируем текст заявки в буфер обмена
        navigator.clipboard
          .writeText(orderMessage)
          .then(() => {
            toast({
              title: "Заявка подготовлена",
              description:
                "Текст заявки скопирован. Вставьте его в чат Telegram",
              duration: 5000,
            });
          })
          .catch((err) => {
            console.error("Не удалось скопировать текст: ", err);
            toast({
              title: "Заявка отправлена",
              description:
                "Пожалуйста, отправьте ваш запрос в открывшемся чате Telegram",
              duration: 5000,
            });
          });

        // Показываем сообщение об успехе
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);

        // Очищаем форму
        setName("");
        setPhone("");
        setMessage("");
      } else {
        alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacts" className="py-20 bg-milk-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Свяжитесь с нами
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Есть вопросы о нашей продукции или хотите сделать заказ? Свяжитесь с
            нами любым удобным способом.
          </p>
          <div className="w-24 h-1 bg-nature-400 mx-auto"></div>

          {/* Добавляем заметную кнопку для связи в Telegram */}
          <div className="mt-8">
            <Button
              onClick={openTelegram}
              className="bg-[#0088cc] hover:bg-[#0077b5] text-white"
            >
              <Icon name="MessageCircle" className="mr-2 h-5 w-5" />
              Написать в Telegram
            </Button>
            <p className="text-sm text-gray-600 mt-2">
              Мы доступны в Telegram для быстрой связи
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Контактная информация
            </h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                  <Icon name="MapPin" className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Адрес</h4>
                  <p className="text-gray-600">
                    Орловская обл. Ливенский р-он, д. Барково, ул. Карла Маркса
                    д. 47
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                  <Icon name="Phone" className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Телефон</h4>
                  {contacts.map((contact, index) =>
                    contact.phone && contact.phone !== "-" ? (
                      <p className="text-gray-600 mb-1" key={index}>
                        <a
                          href={`tel:${contact.phone}`}
                          className="hover:text-milk-500 transition-colors"
                        >
                          {contact.name}: {contact.phone}
                        </a>
                      </p>
                    ) : null,
                  )}

                  {/* Выделенный блок для Telegram */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <h5 className="font-medium text-blue-800 mb-2">
                      <Icon
                        name="MessageCircle"
                        className="inline-block mr-1 h-4 w-4"
                      />
                      Telegram для связи
                    </h5>
                    <a
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0088cc] hover:text-[#0077b5] font-medium flex items-center"
                    >
                      <Icon name="ExternalLink" className="mr-1 h-4 w-4" />
                      @molohka
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Самый быстрый способ связи
                    </p>
                  </div>

                  <div className="flex items-center mt-4 space-x-3">
                    <a
                      href={TELEGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#0088cc] transition-colors"
                    >
                      <Icon
                        name="MessageCircle"
                        className="h-6 w-6"
                        title="Telegram"
                      />
                    </a>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#4C75A3] transition-colors"
                    >
                      <Icon
                        name="AtSign"
                        className="h-6 w-6"
                        title="ВКонтакте"
                      />
                    </a>
                    <a
                      href={`https://wa.me/${formatPhoneNumber(whatsappNumber)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-[#25D366] transition-colors"
                    >
                      <Icon
                        name="MessageSquare"
                        className="h-6 w-6"
                        title="WhatsApp"
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                  <Icon name="Clock" className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">Режим работы</h4>
                  <p className="text-gray-600">Ежедневно с 8:00 до 19:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
              Заказать продукцию
            </h3>
            <p className="text-gray-600 mb-6">
              Заполните форму, и мы свяжемся с вами для уточнения деталей
              заказа. Ваша заявка будет отправлена в наш Telegram.
            </p>

            {showSuccess && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                Ваше сообщение успешно отправлено! Мы свяжемся с вами в
                ближайшее время.
              </div>
            )}

            <div className="space-y-4">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше имя"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Номер телефона"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500 mt-4"
                  required
                />
                <textarea
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ваш заказ"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500 mt-4"
                  required
                ></textarea>

                <Button
                  type="submit"
                  className="w-full bg-milk-500 hover:bg-milk-600 mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Icon
                        name="Loader2"
                        className="mr-2 h-4 w-4 animate-spin"
                      />
                      Отправка...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Отправить заявку
                    </span>
                  )}
                </Button>
              </form>
            </div>

            <p className="text-xs text-gray-500 mt-4">
              Нажимая кнопку "Отправить заявку", вы соглашаетесь с нашей
              политикой конфиденциальности.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Функция для форматирования телефонного номера (удаляет все, кроме цифр)
const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, "");
};
