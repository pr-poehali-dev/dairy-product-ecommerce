import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useWhatsAppConfig } from "./WhatsAppConfig";
import { useContactsConfig } from "./ContactsConfig";
import { useEmailConfig } from "./EmailConfig";
import { formatOrderMessage, openWhatsApp } from "@/lib/whatsapp";
import { toast } from "@/hooks/use-toast";

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

  // Главный контакт для Telegram (Юрий)
  const telegramContact = contacts.find((contact) => contact.telegram);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Формируем данные для отправки
      const orderData = {
        name,
        phone,
        address: "-",
        product: "-",
        comment: message,
      };

      // Формируем сообщение
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
        // Если email отправлен успешно, открываем Telegram
        // (если указан, иначе открываем WhatsApp)
        if (telegramContact?.telegram) {
          // Открываем Telegram ссылку
          window.open(telegramContact.telegram, "_blank");

          // Дополнительно показываем инструкцию как отправить заявку в Telegram
          toast({
            title: "Заявка подготовлена",
            description:
              "Пожалуйста, скопируйте и отправьте текст заявки в открывшемся окне Telegram",
            duration: 8000,
          });

          // Копируем текст заявки в буфер обмена
          navigator.clipboard
            .writeText(orderMessage)
            .then(() => {
              toast({
                title: "Текст заявки скопирован",
                description: "Текст заявки скопирован в буфер обмена",
                duration: 3000,
              });
            })
            .catch((err) => {
              console.error("Не удалось скопировать текст: ", err);
            });
        } else {
          // Если Telegram не указан, открываем WhatsApp
          openWhatsApp(whatsappNumber, orderMessage);
        }

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
                  <div className="flex items-center mt-2 space-x-3">
                    {telegramContact && telegramContact.telegram && (
                      <a
                        href={telegramContact.telegram}
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
                    )}
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
                  <p className="text-sm text-gray-500 mt-2">
                    {telegramContact && telegramContact.telegram
                      ? `Для быстрой связи напишите ${telegramContact.name} в Telegram`
                      : "Доступны в Telegram, ВКонтакте и WhatsApp"}
                  </p>
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
              заказа.
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
