
import React from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero: React.FC = () => {
  return (
    <section 
      id="home" 
      className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.8)), url("https://images.unsplash.com/photo-1523473827533-2a64d0d36748?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-milk-100/90 to-white/60 z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-800">
              Натуральная молочная продукция 
              <span className="text-milk-500"> с фермы</span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-gray-700 max-w-2xl mx-auto lg:mx-0">
              Мы предлагаем свежие молочные продукты высочайшего качества 
              прямо из нашего подсобного хозяйства в деревне Барково. 
              Каждый день — свежее молоко, сметана, творог и сыр.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-milk-500 hover:bg-milk-600">
                <Icon name="ShoppingCart" className="mr-2 h-5 w-5" />
                Заказать продукцию
              </Button>
              
              <Button size="lg" variant="outline" className="border-milk-500 text-milk-500 hover:bg-milk-100">
                <Icon name="Info" className="mr-2 h-5 w-5" />
                Узнать больше
              </Button>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center">
                <div className="bg-nature-400 rounded-full p-2 mr-3">
                  <Icon name="Leaf" className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700">100% натурально</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-nature-400 rounded-full p-2 mr-3">
                  <Icon name="Truck" className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700">Доставка по району</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-nature-400 rounded-full p-2 mr-3">
                  <Icon name="ThumbsUp" className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700">Проверенное качество</span>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-nature-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-milk-100 rounded-full opacity-70"></div>
              
              <img 
                src="https://images.unsplash.com/photo-1628088062854-d1870b4553da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                alt="Натуральное молоко" 
                className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[500px]"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path fill="#E5F0F9" fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,213.3C384,203,480,213,576,224C672,235,768,245,864,240C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
