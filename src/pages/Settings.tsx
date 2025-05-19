
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { useWhatsAppConfig } from '@/components/WhatsAppConfig';
import { useToast } from '@/hooks/use-toast';

const Settings: React.FC = () => {
  const { whatsappNumber, setWhatsappNumber } = useWhatsAppConfig();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState(whatsappNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Проверяем, что номер не пустой и содержит только цифры
    if (!phoneNumber.trim() || !/^\d+$/.test(phoneNumber.trim())) {
      toast({
        title: "Ошибка",
        description: "Введите корректный номер телефона (только цифры)",
        variant: "destructive",
      });
      return;
    }
    
    // Сохраняем номер
    setWhatsappNumber(phoneNumber.trim());
    
    toast({
      title: "Настройки сохранены",
      description: "Номер WhatsApp успешно обновлен",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Настройки уведомлений</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Настройка уведомлений WhatsApp</CardTitle>
          <CardDescription>
            Укажите номер телефона WhatsApp, на который будут приходить уведомления о новых заказах
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <Icon name="Info" className="h-4 w-4" />
            <AlertTitle>Важно!</AlertTitle>
            <AlertDescription>
              Введите номер телефона в международном формате (только цифры), например: 79991234567
            </AlertDescription>
          </Alert>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="whatsapp-number">Номер WhatsApp</Label>
              <Input
                id="whatsapp-number"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="79991234567"
              />
            </div>
            
            <Button type="submit" className="w-full">
              <Icon name="Save" className="mr-2 h-4 w-4" />
              Сохранить настройки
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-gray-500">
          Номер используется только для отправки уведомлений о заказах
        </CardFooter>
      </Card>
    </div>
  );
};

export default Settings;
