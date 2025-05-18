
import { useEffect } from 'react';

const AnimationObserver = () => {
  useEffect(() => {
    // Добавляем CSS для анимаций
    const style = document.createElement('style');
    style.textContent = `
      .section-animate {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
      }
      .section-animate.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .product-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
      }
      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);

    // Настраиваем наблюдатель для анимаций при скролле
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Наблюдаем за элементами с классом section-animate
    document.querySelectorAll('.section-animate').forEach((section) => {
      observer.observe(section);
    });

    return () => {
      // Очистка при размонтировании
      document.querySelectorAll('.section-animate').forEach((section) => {
        observer.unobserve(section);
      });
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default AnimationObserver;
