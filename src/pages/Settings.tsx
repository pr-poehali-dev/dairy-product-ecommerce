import { useWhatsAppConfig } from "../components/WhatsAppConfig";
import { useEmailConfig } from "../components/EmailConfig";
import { useContactsConfig } from "../components/ContactsConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Settings = () => {
  const { whatsappNumber, setWhatsappNumber } = useWhatsAppConfig();
  const { email, setEmail } = useEmailConfig();
  const { contacts, setContacts, addContact, removeContact } =
    useContactsConfig();

  const [whatsappInput, setWhatsappInput] = useState(whatsappNumber);
  const [emailInput, setEmailInput] = useState(email);

  // Новые состояния для добавления контакта
  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");

  const handleWhatsappSave = () => {
    setWhatsappNumber(whatsappInput);
    alert("Номер WhatsApp успешно сохранен!");
  };

  const handleEmailSave = () => {
    setEmail(emailInput);
    alert("Email для уведомлений успешно сохранен!");
  };

  const handleAddContact = () => {
    if (!newContactName || !newContactPhone) {
      alert("Пожалуйста, введите имя и телефон контакта");
      return;
    }

    addContact({ name: newContactName, phone: newContactPhone });
    setNewContactName("");
    setNewContactPhone("");
    alert("Контакт успешно добавлен!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Настройки</h1>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Email для уведомлений</CardTitle>
              <CardDescription>
                Укажите email, на который будут приходить уведомления о заказах
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="example@example.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                <Button onClick={handleEmailSave}>Сохранить</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Номер WhatsApp</CardTitle>
              <CardDescription>
                Укажите номер WhatsApp в международном формате для отправки
                уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="79991234567"
                  value={whatsappInput}
                  onChange={(e) => setWhatsappInput(e.target.value)}
                />
                <Button onClick={handleWhatsappSave}>Сохранить</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контактные лица</CardTitle>
              <CardDescription>
                Укажите контактные лица, которые будут отображаться в
                уведомлениях
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.phone}</p>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeContact(index)}
                    >
                      Удалить
                    </Button>
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="space-y-3">
                  <h3 className="text-sm font-medium">
                    Добавить новый контакт
                  </h3>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Имя</Label>
                      <Input
                        id="contactName"
                        placeholder="Имя"
                        value={newContactName}
                        onChange={(e) => setNewContactName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Телефон</Label>
                      <Input
                        id="contactPhone"
                        placeholder="Телефон"
                        value={newContactPhone}
                        onChange={(e) => setNewContactPhone(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button
                    className="w-full sm:w-auto"
                    onClick={handleAddContact}
                  >
                    Добавить контакт
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
