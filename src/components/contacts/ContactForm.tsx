
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useEmailConfig } from "@/components/EmailConfig";
import { useContactsConfig } from "@/components/ContactsConfig";

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { email } = useEmailConfig();
  const { contacts } = useContactsConfig();

  // Формируем список контактов для отображения в сообщении
  const contactsInfo = contacts
    .map((contact) => `${contact.name}: ${contact.phone}`)
    .join(", ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    setIsSubmitting(true);

    // Создаем данные для формы
    const formData = {
      name,
      phone,
      message,
      _subject: `Сообщение с сайта от ${name}`,
      _captcha: "false",
      _template: "table",
      _replyto: email, // Для ответа
    };

    try {
      // Используем formsubmit.co для отправки формы на email
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          message: `
          <h2>Новое сообщение с сайта!</h2>
          <p><strong>Имя:</strong> ${name}</p>
          <p><strong>Телефон:</strong> ${phone}</p>
          <p><strong>Сообщение:</strong> ${message}</p>
          <p><strong>Контактные лица:</strong> ${contactsInfo}</p>
          `,
        }),
      });

      if (response.ok) {
        // Успешная отправка
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);

        // Очищаем форму
        setName("");
        setPhone("");
        setMessage("");
      } else {
        alert(
          "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
        );
      }
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      alert(
        "Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Заказать продукцию
      </h3>
      <p className="text-gray-600 mb-6">
        Заполните форму, и мы свяжемся с вами для уточнения деталей
        заказа.
      </p>

      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500 mt-4"
            required
          />
          <textarea
            name="order"
            placeholder="Ваш заказ"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500 mt-4"
            required
          ></textarea>

          <Button
            type="submit"
            className="w-full bg-milk-500 hover:bg-milk-600 mt-4"
            disabled={isSubmitting}
          >
            <Icon name="Send" className="mr-2 h-4 w-4" />
            {isSubmitting ? "Отправка..." : "Отправить заявку"}
          </Button>
        </form>
      </div>

      {showSuccess && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в ближайшее время.
        </div>
      )}

      <p className="text-xs text-gray-500 mt-4">
        Нажимая кнопку "Отправить заявку", вы соглашаетесь с нашей
        политикой конфиденциальности.
      </p>
    </div>
  );
};

export default ContactForm;
