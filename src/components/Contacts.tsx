import React from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useOrder } from "./OrderContext";
import { useToast } from "@/hooks/use-toast";
import { useWhatsAppConfig } from "./WhatsAppConfig";
import { openWhatsApp } from "@/lib/whatsapp";

const Contacts: React.FC = () => {
  const { setOrderFormOpen, setSelectedProduct } = useOrder();
  const { toast } = useToast();
  const { whatsappNumber } = useWhatsAppConfig();

  const handleContactFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Получаем данные из формы
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const order = formData.get("order") as string;

    // Формируем сообщение для WhatsApp
    const message =
      `🥛 *Новая заявка с сайта!* 🥛\n\n` +
      `*Имя*: ${name}\n` +
      `*Телефон*: ${phone}\n` +
      `*Заказ*: ${order}\n\n` +
      `Пожалуйста, обработайте заявку как можно скорее.`;

    // Отправляем сообщение в WhatsApp
    openWhatsApp(whatsappNumber, message);

    // Выводим уведомление о принятии заказа
    toast({
      title: "Заявка принята!",
      description:
        "Мы свяжемся с вами в ближайшее время для подтверждения заказа.",
      duration: 5000,
    });

    // Сбрасываем форму
    (e.target as HTMLFormElement).reset();

    console.log("Отправка заявки из формы контактов:", { name, phone, order });
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
                  <p className="text-gray-600">
                    <a
                      href="tel:89534187290"
                      className="hover:text-milk-500 transition-colors"
                    >
                      8 (953) 418-72-90
                    </a>
                  </p>
                  <div className="flex items-center mt-2 space-x-3">
                    <a
                      href="#"
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
                      href="#"
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
                    Доступны в Telegram, ВКонтакте и WhatsApp
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

            <div className="space-y-4">
              <form onSubmit={handleContactFormSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефона"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500 mt-4"
                  required
                />
                <textarea
                  name="order"
                  placeholder="Ваш заказ"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-milk-500 mt-4"
                  required
                ></textarea>

                <Button
                  type="submit"
                  className="w-full bg-milk-500 hover:bg-milk-600 mt-4"
                >
                  <Icon name="Send" className="mr-2 h-4 w-4" />
                  Отправить заявку
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
};

export default Contacts;
