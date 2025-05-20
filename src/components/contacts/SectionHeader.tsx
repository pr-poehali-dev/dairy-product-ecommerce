
import React from "react";

interface SectionHeaderProps {
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  return (
    <div className="max-w-3xl mx-auto text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
        {title}
      </h2>
      <p className="text-lg text-gray-600 mb-6">
        {description}
      </p>
      <div className="w-24 h-1 bg-nature-400 mx-auto"></div>
    </div>
  );
};

export default SectionHeader;
