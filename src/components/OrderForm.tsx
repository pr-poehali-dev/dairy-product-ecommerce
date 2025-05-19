import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { useEmailConfig } from "./EmailConfig";

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName?: string;
}

const OrderForm: React.FC<OrderFormProps> = ({
  open,
  onOpenChange,
  productName,
}) => {
  const { toast } = useToast();
  const { email } = useEmailConfig();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
    product: productName || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // FormSubmit автоматически отправит форму на указанный email при первой отправке
    // При последующих отправках используется тот же адрес
    const formElement = e.target as HTMLFormElement;
    const formAction = `https://formsubmit.co/${email}`;
    formElement.action = formAction;
    formElement.method = "POST";

    // Добавим скрытые поля для FormSubmit
    const hiddenFields = [
      { name: "_subject", value: `Новый заказ: ${formData.product}` },
      { name: "_template", value: "table" }, // Хорошее форматирование письма
      { name: "_captcha", value: "false" }, // Отключаем капчу
      { name: "_next", value: window.location.href }, // Редирект на текущую страницу после отправки
    ];

    hiddenFields.forEach((field) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = field.name;
      input.value = field.value;
      formElement.appendChild(input);
    });

    // Показываем уведомление об успешной отправке
    toast({
      title: "Заказ принят!",
      description:
        "Мы свяжемся с вами в ближайшее время для подтверждения заказа.",
      duration: 5000,
    });

    // Отправляем форму
    formElement.submit();

    // Закрываем форму и сбрасываем поля
    onOpenChange(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      comment: "",
      product: "",
    });
  };

  // Обновляем product при изменении productName
  React.useEffect(() => {
    if (productName) {
      setFormData((prev) => ({ ...prev, product: productName }));
    }
  }, [productName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Оформление заказа</DialogTitle>
          <DialogDescription>
            Заполните форму для заказа молочной продукции. Мы свяжемся с вами
            для подтверждения.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Имя
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Телефон
              </Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="col-span-3"
                required
                placeholder="+7 (___) ___-__-__"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address" className="text-right">
                Адрес
              </Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="product" className="text-right">
                Продукт
              </Label>
              <Input
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Укажите желаемый продукт"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="comment" className="text-right">
                Комментарий
              </Label>
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Детали заказа, пожелания"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-milk-500 hover:bg-milk-600">
              <Icon name="Send" className="mr-2 h-4 w-4" />
              Отправить заказ
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderForm;
