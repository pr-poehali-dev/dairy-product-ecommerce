
import React from "react";
import Icon from "@/components/ui/icon";

interface SocialLink {
  name: string;
  icon: string;
  url: string;
  hoverColor: string;
  title: string;
}

interface SocialLinksProps {
  links: SocialLink[];
}

const SocialLinks: React.FC<SocialLinksProps> = ({ links }) => {
  return (
    <div className="flex items-center mt-2 space-x-3">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.url}
          className={`text-gray-600 hover:${link.hoverColor} transition-colors`}
        >
          <Icon
            name={link.icon}
            className="h-6 w-6"
            title={link.title}
          />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
