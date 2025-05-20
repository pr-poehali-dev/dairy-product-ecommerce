
import React from "react";
import ContactInfoItem from "./ContactInfoItem";
import SocialLinks from "./SocialLinks";

const ContactInfo: React.FC = () => {
  const socialLinks = [
    {
      name: "telegram",
      icon: "MessageCircle",
      url: "#",
      hoverColor: "text-[#0088cc]",
      title: "Telegram"
    },
    {
      name: "vkontakte",
      icon: "AtSign",
      url: "#",
      hoverColor: "text-[#4C75A3]",
      title: "ВКонтакте"
    },
    {
      name: "whatsapp",
      icon: "MessageSquare",
      url: "#",
      hoverColor: "text-[#25D366]",
      title: "WhatsApp"
    }
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        Контактная информация
      </h3>

      <div className="space-y-6">
        <ContactInfoItem icon="MapPin" title="Адрес">
          <p className="text-gray-600">
            Орловская обл. Ливенский р-он, д. Барково, ул. Карла Маркса
            д. 47
          </p>
        </ContactInfoItem>

        <ContactInfoItem icon="Phone" title="Телефон">
          <p className="text-gray-600">
            <a
              href="tel:89534187290"
              className="hover:text-milk-500 transition-colors"
            >
              8 (953) 418-72-90
            </a>
          </p>
          <SocialLinks links={socialLinks} />
          <p className="text-sm text-gray-500 mt-2">
            Доступны в Telegram, ВКонтакте и WhatsApp
          </p>
        </ContactInfoItem>

        <ContactInfoItem icon="Clock" title="Режим работы">
          <p className="text-gray-600">Ежедневно с 8:00 до 19:00</p>
        </ContactInfoItem>
      </div>
    </div>
  );
};

export default ContactInfo;
