import React from "react";
import { PiHandWaving } from "react-icons/pi";
import { BsQuestionCircle } from "react-icons/bs";
import { GiTennisCourt } from "react-icons/gi";
import { BsFillQuestionCircleFill } from "react-icons/bs";

const Card = ({
  title,
  content,
  Icon,
}: {
  title: string;
  content: string;
  Icon: any;
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden  shadow-xl drop-shadow-xl border-t border-gray-100 px-6 py-10 bg-white">
      <div className="flex flex-col items-center  md:items-start text-center md:text-left">
        <div className="w-12 h-12 flex items-center justify-center bg-primary ">
          <Icon className="text-white text-3xl" />
        </div>
        <h2 className="text-2xl md:text-3xl font-medium my-4">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

function PlayTennis() {
  const cardData = [
    {
      title: "All Ages Are Welcome",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: PiHandWaving,
    },
    {
      title: "We Assist All Our Players",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: BsFillQuestionCircleFill,
    },
    {
      title: "Many Professional Courts",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
      icon: GiTennisCourt,
    },
  ];

  return (
    <div className="container mx-auto my-10 md:my-24 px-4">
      {/* Heading Section */}
      <div className="flex flex-col items-center text-center md:text-left md:flex-row md:justify-between">
        <h1 className="text-2xl md:text-4xl font-semibold">
          You Can Play Tennis!
        </h1>
        <p className="text-sm md:text-base max-w-xl mx-auto md:mx-0 leading-relaxed">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere omnis
          consequuntur praesentium magni alias, consectetur quis iusto
          doloremque odit itaque pariatur ipsa accusamus accusantium porro
          obcaecati aliquid earum dolores fuga?
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 mt-12 justify-items-center mx-1 sm:mx-10">
        {cardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            content={card.content}
            Icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayTennis;
