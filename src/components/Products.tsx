import React, { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

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
    name: "Деревенское молоко",
    description:
      "Свежее молоко от коров, выращенных на натуральных кормах. Жирность 3.5-4.5%.",
    price: "80 ₽/л",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    badge: "Хит продаж",
  },
  {
    id: 2,
    name: "Сметана домашняя",
    description:
      "Густая сметана из свежих сливок. Идеально подходит для заправки салатов и борща.",
    price: "200 ₽/500мл",
    image:
      "https://cdn.poehali.dev/files/8a6c3684-06a8-469c-abf8-c92b8fe4ede0.jpg",
  },
  {
    id: 3,
    name: "Творог обезжиренный",
    description:
      "Диетический творог с пониженным содержанием жира. Идеален для правильного питания.",
    price: "200 ₽/500г",
    image:
      "https://cdn.poehali.dev/files/71b4f5fd-158d-44aa-af56-012bac6b0fc9.jpg",
    badge: "Для диеты",
  },
  {
    id: 4,
    name: "Творог из цельного молока",
    description:
      "Сытный и питательный творог из цельного молока. Богат кальцием и белком.",
    price: "250 ₽/500г",
    image:
      "https://cdn.poehali.dev/files/71b4f5fd-158d-44aa-af56-012bac6b0fc9.jpg",
  },
  {
    id: 5,
    name: "Домашний сыр",
    description:
      "Натуральный сыр, приготовленный по традиционному рецепту. Выдержка от 2 недель.",
    price: "800 ₽",
    image:
      "https://cdn.poehali.dev/files/d2112988-6e3f-47f2-a1ce-41dd69bfa09f.jpg",
    badge: "Новинка",
  },
  {
    id: 6,
    name: "Сливки домашние",
    description:
      "Натуральные сливки с высоким содержанием жира. Идеальны для кофе и десертов.",
    price: "300 ₽",
    image:
      "https://cdn.poehali.dev/files/8a6c3684-06a8-469c-abf8-c92b8fe4ede0.jpg",
  },
  {
    id: 7,
    name: "Сливочное масло",
    description:
      "Натуральное сливочное масло, приготовленное традиционным способом. Высокое содержание полезных жиров.",
    price: "1100 ₽/кг",
    image:
      "https://cdn.poehali.dev/files/0ab5a8ff-e000-4cbc-b3bb-1a4adffb90a2.jpg",
    badge: "Новинка",
  },
  {
    id: 8,
    name: "Сыворотка",
    description:
      "Полезная молочная сыворотка, богатая белками и минералами. Идеальна для питья и приготовления выпечки.",
    price: "30 ₽/л",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
    badge: "Эконом",
  },
];

const Products: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Наша продукция
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Предлагаем вам натуральные молочные продукты, изготовленные по
            традиционным рецептам из молока коров, выращенных в экологически
            чистом районе Орловской области.
          </p>
          <div className="w-24 h-1 bg-milk-500 mx-auto"></div>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-animate"
        >
          {products.map((product) => (
            <Card
              key={product.id}
              className="product-card overflow-hidden bg-white"
            >
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
                <CardDescription className="text-gray-600">
                  {product.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between items-center">
                <p className="text-lg font-bold text-milk-500">
                  {product.price}
                </p>
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
