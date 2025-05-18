
import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Деревенское молоко',
    description: 'Свежее молоко от коров, выращенных на натуральных кормах. Жирность 3.5-4.5%.',
    price: 'от 80 ₽/л',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    badge: 'Хит продаж'
  },
  {
    id: 2,
    name: 'Домашняя сметана',
    description: 'Густая сметана из свежих сливок. Идеально подходит для заправки салатов и борща.',
    price: 'от 120 ₽/250г',
    image: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Творог деревенский',
    description: 'Свежий творог, приготовленный традиционным способом. Нежный вкус и мягкая текстура.',
    price: 'от 150 ₽/500г',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Сыр домашний',
    description: 'Мягкий сыр, приготовленный из цельного молока. Без консервантов и добавок.',
    price: 'от 250 ₽/300г',
    image: 'https://images.unsplash.com/photo-1566454825481-43cada551111?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    badge: 'Новинка'
  },
  {
    id: 5,
    name: 'Масло сливочное',
    description: 'Натуральное сливочное масло, взбитое из свежих сливок. Нежный сливочный вкус.',
    price: 'от 200 ₽/200г',
    image: 'https://images.unsplash.com/photo-1589985270958-bad836590562?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Ряженка домашняя',
    description: 'Традиционный кисломолочный продукт с нежным вкусом и карамельным оттенком.',
    price: 'от 90 ₽/0,5л',
    image: 'https://images.unsplash.com/photo-1596452932356-6c5db4ea7e7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
  },
];

const Products: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="products" className="py-20 bg-milk-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Наша продукция</h2>
          <p className="text-lg text-gray-600 mb-6">
            Предлагаем вам натуральные молочные продукты, изготовленные по традиционным рецептам 
            из молока коров, выращенных в экологически чистом районе Орловской области.
          </p>
          <div className="w-24 h-1 bg-milk-500 mx-auto"></div>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-animate">
          {products.map((product) => (
            <Card key={product.id} className="product-card overflow-hidden bg-white">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-nature-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.badge}
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription className="text-gray-600">{product.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <p className="text-lg font-bold text-milk-500">{product.price}</p>
                <Button size="sm" className="bg-milk-500 hover:bg-milk-600">
                  <Icon name="ShoppingCart" className="h-4 w-4 mr-1" />
                  Заказать
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-milk-500 text-milk-500 hover:bg-milk-100" 
            size="lg"
          >
            <Icon name="DownloadCloud" className="h-5 w-5 mr-2" />
            Скачать полный каталог продукции
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
