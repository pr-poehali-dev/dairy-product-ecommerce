
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Products from '@/components/Products';
import About from '@/components/About';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import AnimationObserver from '@/components/AnimationObserver';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen">
      <AnimationObserver />
      <Header />
      <Hero />
      <Products />
      <About />
      <Contacts />
      <Footer />
    </div>
  );
};

export default Index;
