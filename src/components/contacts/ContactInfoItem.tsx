
import React from "react";
import Icon from "@/components/ui/icon";
import { LucideIcon } from "lucide-react";

interface ContactInfoItemProps {
  icon: string;
  title: string;
  children: React.ReactNode;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ 
  icon, 
  title, 
  children 
}) => {
  return (
    <div className="flex items-start">
      <div className="bg-milk-500 rounded-full p-3 mr-4 text-white shrink-0">
        <Icon name={icon} className="h-5 w-5" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        {children}
      </div>
    </div>
  );
};

export default ContactInfoItem;
