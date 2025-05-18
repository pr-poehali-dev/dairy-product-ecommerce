import React, { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const About: React.FC = () => {
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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            О нашем хозяйстве
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Наше подсобное хозяйство находится в экологически чистом районе
            Орловской области, где мы производим натуральные молочные продукты
            по традиционным рецептам.
          </p>
          <div className="w-24 h-1 bg-nature-400 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div ref={sectionRef} className="section-animate">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Почему выбирают нас
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                    <Icon name="Leaf" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Экологически чистая продукция
                    </h4>
                    <p className="text-gray-600">
                      Наши коровы питаются только натуральными кормами с
                      собственных полей, без химических добавок и стимуляторов
                      роста.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                    <Icon name="Clock" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Свежесть каждый день
                    </h4>
                    <p className="text-gray-600">
                      Мы ежедневно производим свежую молочную продукцию, которая
                      поступает к нашим клиентам в течение суток после
                      изготовления.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                    <Icon name="Heart" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Традиционные рецепты
                    </h4>
                    <p className="text-gray-600">
                      Все наши продукты изготавливаются по старинным семейным
                      рецептам, сохраняя настоящий деревенский вкус натуральной
                      молочной продукции.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
                    <Icon name="Users" className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Семейное дело
                    </h4>
                    <p className="text-gray-600">
                      Наше хозяйство — это семейный бизнес, который мы развиваем
                      с любовью и заботой, вкладывая душу в каждый продукт,
                      который предлагаем нашим клиентам.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-milk-100 rounded-full opacity-70"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-nature-100 rounded-full opacity-70"></div>

              <Card className="relative z-10 overflow-hidden shadow-xl p-3 bg-white">
                <img
                  src="https://images.unsplash.com/photo-1510610240853-127e698fd505?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80"
                  alt="Наше хозяйство"
                  className="rounded-lg h-[400px] w-full object-cover"
                />
              </Card>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6 max-w-lg mx-auto">
            <div className="bg-milk-100 rounded-xl p-8 text-center">
              <div className="flex justify-center">
                <div className="bg-milk-500 rounded-full p-4 text-white mb-6">
                  <Icon name="Users" className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">200+ клиентов</h3>
              <p className="text-gray-600">
                Более 200 постоянных клиентов доверяют качеству нашей продукции
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
