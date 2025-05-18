
import React, { useEffect } from 'react';

const AnimationObserver: React.FC = () => {
  useEffect(() => {
    const animateOnScroll = () => {
      const sections = document.querySelectorAll('.section-animate');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
          section.classList.add('visible');
        }
      });
    };

    // Initial check
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return null;
};

export default AnimationObserver;
