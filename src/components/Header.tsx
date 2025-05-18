import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-milk-500 mr-2">🐄</span>
          <h1 className="text-2xl font-montserrat font-bold">
            <span className="text-milk-500">Барково</span>
            <span className="text-nature-400 ml-1">ЛПХ</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#home"
            className="text-foreground hover:text-milk-500 transition-colors"
          >
            Главная
          </a>
          <a
            href="#products"
            className="text-foreground hover:text-milk-500 transition-colors"
          >
            Продукция
          </a>
          <a
            href="#about"
            className="text-foreground hover:text-milk-500 transition-colors"
          >
            О нас
          </a>
          <a
            href="#contacts"
            className="text-foreground hover:text-milk-500 transition-colors"
          >
            Контакты
          </a>
          <Button className="bg-milk-500 hover:bg-milk-600">
            <Icon name="Phone" className="mr-2 h-4 w-4" />
            Заказать
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Icon name={isMobileMenuOpen ? "X" : "Menu"} className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <a
              href="#home"
              className="text-foreground hover:text-milk-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Главная
            </a>
            <a
              href="#products"
              className="text-foreground hover:text-milk-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Продукция
            </a>
            <a
              href="#about"
              className="text-foreground hover:text-milk-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              О нас
            </a>
            <a
              href="#contacts"
              className="text-foreground hover:text-milk-500 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Контакты
            </a>
            <Button className="bg-milk-500 hover:bg-milk-600 w-full">
              <Icon name="Phone" className="mr-2 h-4 w-4" />
              Заказать
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
