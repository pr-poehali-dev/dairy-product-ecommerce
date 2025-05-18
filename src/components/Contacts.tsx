
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Contacts: React.FC = () => {
  return (
    <section id="contacts" className="py-20 bg-gradient-to-b from-white to-milk-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Свяжитесь с нами</h2>
          <p className="text-lg text-gray-600 mb-6">
            Закажите свежую молочную продукцию или задайте вопрос. 
            Мы всегда рады помочь нашим клиентам и ответить на все вопросы.
          </p>
          <div className="w-24 h-1 bg-milk-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Контактная информация</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                      <Icon name="MapPin" className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Адрес</h4>
                      <p className="text-gray-600">
                        Орловская обл. Ливенский р-он, д. Барково, ул. Карла Маркса д. 47
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                      <Icon name="Phone" className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Телефон</h4>
                      <p className="text-gray-600">
                        <a href="tel:89534187290" className="hover:text-milk-500 transition-colors">
                          8 (953) 418-72-90
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                      <Icon name="Clock" className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">График работы</h4>
                      <p className="text-gray-600">
                        Ежедневно с 8:00 до 19:00
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                      <Icon name="Truck" className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">Доставка</h4>
                      <p className="text-gray-600">
                        Доставка осуществляется по Ливенскому району при заказе от 1000 ₽
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-3">Мы в социальных сетях</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="bg-milk-100 hover:bg-milk-200 text-milk-500 p-3 rounded-full transition-colors">
                      <Icon name="Facebook" className="h-5 w-5" />
                    </a>
                    <a href="#" className="bg-milk-100 hover:bg-milk-200 text-milk-500 p-3 rounded-full transition-colors">
                      <Icon name="Instagram" className="h-5 w-5" />
                    </a>
                    <a href="#" className="bg-milk-100 hover:bg-milk-200 text-milk-500 p-3 rounded-full transition-colors">
                      <Icon name="MessageCircle" className="h-5 w-5" />
                    </a>
                    <a href="#" className="bg-milk-100 hover:bg-milk-200 text-milk-500 p-3 rounded-full transition-colors">
                      <Icon name="Send" className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Оставьте заявку</h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Ваше имя
                      </label>
                      <Input 
                        id="name" 
                        placeholder="Введите ваше имя" 
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Телефон
                      </label>
                      <Input 
                        id="phone" 
                        placeholder="+7 (___) ___-__-__" 
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Сообщение
                    </label>
                    <Textarea 
                      id="message" 
                      placeholder="Напишите, какую продукцию вы хотели бы заказать, или задайте вопрос" 
                      className="w-full min-h-[120px]"
                    />
                  </div>
                  
                  <Button className="w-full bg-milk-500 hover:bg-milk-600">
                    <Icon name="Send" className="h-5 w-5 mr-2" />
                    Отправить заявку
                  </Button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    Нажимая кнопку "Отправить заявку", вы соглашаетесь с нашей политикой
                    обработки персональных данных.
                  </p>
                </form>
              </CardContent>
            </Card>
            
            <div className="mt-8 bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-video">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d78283.94590330258!2d37.47806436953124!3d52.42771399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x41267e11fb152c2f%3A0x1d1094a6ca1b7e22!2z0JHQsNGA0LrQvtCy0L4sINCb0LjQstC10L3RgdC60LjQuSDRgNCw0LnQvtC9LCDQntGA0LvQvtCy0YHQutCw0Y8g0L7QsdC7Lg!5e0!3m2!1sru!2sru!4v1715101903909!5m2!1sru!2sru" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
