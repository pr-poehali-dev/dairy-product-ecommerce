import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Contacts from "@/components/Contacts"; // Используем обновленный компонент Contacts
import Footer from "@/components/Footer";
import AnimationObserver from "@/components/AnimationObserver";
import OrderForm from "@/components/OrderForm";
import { useOrder } from "@/components/OrderContext";
import { Toaster } from "@/components/ui/toaster"; // Добавляем Toaster для уведомлений

const Index: React.FC = () => {
  const { isOrderFormOpen, setOrderFormOpen, selectedProduct } = useOrder();

  return (
    <div className="min-h-screen">
      <AnimationObserver />
      <Header />
      <Hero />
      <Products />
      <About />
      <Contacts />
      <Footer />
      <OrderForm
        open={isOrderFormOpen}
        onOpenChange={setOrderFormOpen}
        productName={selectedProduct}
      />
      <Toaster />{" "}
      {/* Добавляем компонент Toaster для отображения уведомлений */}
    </div>
  );
};

export default Index;
