import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { useEmailConfig } from "@/components/EmailConfig";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Settings: React.FC = () => {
  const { toast } = useToast();
  const { email, setEmail } = useEmailConfig();
  const [emailInput, setEmailInput] = useState(email);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверяем, что email не пустой и имеет правильный формат
    if (!emailInput.trim() || !emailInput.includes("@")) {
      toast({
        title: "Ошибка",
        description: "Введите корректный email адрес",
        variant: "destructive",
      });
      return;
    }

    // Сохраняем email
    setEmail(emailInput.trim());

    toast({
      title: "Настройки сохранены",
      description: "Email для уведомлений успешно обновлен",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Настройки уведомлений</h1>

      <Tabs defaultValue="email" className="max-w-md mx-auto">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="email">Настройки Email</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Настройка уведомлений по Email</CardTitle>
              <CardDescription>
                Укажите email, на который будут приходить уведомления о новых
                заказах
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <Icon name="Info" className="h-4 w-4" />
                <AlertTitle>Важно!</AlertTitle>
                <AlertDescription>
                  Введите корректный email адрес для получения уведомлений
                </AlertDescription>
              </Alert>

              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-address">Email адрес</Label>
                  <Input
                    id="email-address"
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="example@example.com"
                  />
                </div>

                <Button type="submit" className="w-full">
                  <Icon name="Save" className="mr-2 h-4 w-4" />
                  Сохранить настройки
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-500">
              Email используется только для отправки уведомлений о заказах
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
