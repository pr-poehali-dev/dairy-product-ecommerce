
import React from "react";
import SectionHeader from "./SectionHeader";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

const ContactsSection: React.FC = () => {
  return (
    <section id="contacts" className="py-20 bg-milk-50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Свяжитесь с нами"
          description="Есть вопросы о нашей продукции или хотите сделать заказ? Свяжитесь с
          нами любым удобным способом."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactsSection;
