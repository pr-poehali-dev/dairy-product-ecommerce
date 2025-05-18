import React from "react";
import Icon from "@/components/ui/icon";

const Footer: React.FC = () => {
  return (
    <footer className="bg-milk-500 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-montserrat font-bold mb-4 flex items-center">
              <span className="mr-2">🐄</span> БарковоЛПХ
            </h3>
            <p className="mb-4 text-milk-100">
              Натуральные молочные продукты из экологически чистого района
              Орловской области. Качество, проверенное временем.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-milk-200 transition-colors">
                <Icon name="Facebook" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-milk-200 transition-colors">
                <Icon name="Instagram" className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-milk-200 transition-colors">
                <Icon name="MessageCircle" className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="hover:text-milk-200 transition-colors flex items-center"
                >
                  <Icon name="ChevronRight" className="h-4 w-4 mr-1" />
                  Главная
                </a>
              </li>
              <li>
                <a
                  href="#products"
                  className="hover:text-milk-200 transition-colors flex items-center"
                >
                  <Icon name="ChevronRight" className="h-4 w-4 mr-1" />
                  Продукция
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-milk-200 transition-colors flex items-center"
                >
                  <Icon name="ChevronRight" className="h-4 w-4 mr-1" />О нас
                </a>
              </li>
              <li>
                <a
                  href="#contacts"
                  className="hover:text-milk-200 transition-colors flex items-center"
                >
                  <Icon name="ChevronRight" className="h-4 w-4 mr-1" />
                  Контакты
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-milk-200 transition-colors flex items-center"
                >
                  <Icon name="ChevronRight" className="h-4 w-4 mr-1" />
                  Доставка и оплата
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Icon name="MapPin" className="h-5 w-5 mr-3 mt-0.5" />
                <span>
                  Орловская обл. Ливенский р-он, д. Барково, ул. Карла Маркса д.
                  47
                </span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" className="h-5 w-5 mr-3" />
                <a
                  href="tel:89534187290"
                  className="hover:text-milk-200 transition-colors"
                >
                  8 (953) 418-72-90
                </a>
              </li>
              <li className="flex items-center">
                <Icon name="Clock" className="h-5 w-5 mr-3" />
                <span>Ежедневно с 8:00 до 19:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-milk-400 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-milk-100 text-sm">
            © {new Date().getFullYear()} БарковоЛПХ. Все права защищены.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-milk-100 hover:text-white text-sm transition-colors"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="text-milk-100 hover:text-white text-sm transition-colors"
            >
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
