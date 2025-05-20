import React, { createContext, useContext, useState } from "react";

interface Contact {
  name: string;
  phone: string;
  telegram?: string;
}

interface ContactsConfigContextType {
  contacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
  removeContact: (index: number) => void;
}

// Обновляем контакты по умолчанию, добавляем Юрия с Telegram
const defaultContacts: Contact[] = [
  { name: "Юрий", phone: "-", telegram: "https://t.me/molohka" },
  { name: "Михаил", phone: "89534187290" },
  { name: "Елена", phone: "89004856158" },
];

const ContactsConfigContext = createContext<
  ContactsConfigContextType | undefined
>(undefined);

export const ContactsConfigProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>(() => {
    // Пробуем загрузить контакты из localStorage, если они там есть
    const savedContacts = localStorage.getItem("contacts");
    return savedContacts ? JSON.parse(savedContacts) : defaultContacts;
  });

  // Сохраняем контакты в localStorage при изменении
  const updateContacts = (newContacts: Contact[]) => {
    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  const addContact = (contact: Contact) => {
    const newContacts = [...contacts, contact];
    updateContacts(newContacts);
  };

  const removeContact = (index: number) => {
    const newContacts = [...contacts];
    newContacts.splice(index, 1);
    updateContacts(newContacts);
  };

  return (
    <ContactsConfigContext.Provider
      value={{
        contacts,
        setContacts: updateContacts,
        addContact,
        removeContact,
      }}
    >
      {children}
    </ContactsConfigContext.Provider>
  );
};

export const useContactsConfig = () => {
  const context = useContext(ContactsConfigContext);
  if (context === undefined) {
    throw new Error(
      "useContactsConfig must be used within a ContactsConfigProvider",
    );
  }
  return context;
};
