import React from "react";

type DetailItem = {
  icon: React.ReactNode;
  label: string;
};

type DetailCardProps = {
  title: string;
  details: DetailItem[];
};

const DetailCard: React.FC<DetailCardProps> = ({ title, details }) => {
  return (
    <div className="w-[60%] my-2">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="grid grid-cols-2 gap-y-2">
        {details.map((detail, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-[#ff9328]">{detail.icon}</span>
            <p className="font-medium text-sm">{detail.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCard;
