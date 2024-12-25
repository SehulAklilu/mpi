import { useState } from "react";
import IconButton from "../Button/IconButton";
import IconButton2 from "../Button/IconButton2";
import CloseClickOutside from "../Additionals/ClickOutside";
import MaterialIcon from "../Icon/MaterialIcon";

interface JournalCardProps {
  title: string;
  content: string;
  date: string;
}

const colors = [
  {
    id: 1,
    color: "#F4A578",
  },
  {
    id: 1,
    color: "#7D9CE7",
  },
  {
    id: 1,
    color: "#F4F66F",
  },
  {
    id: 1,
    color: "#44626626",
  },
  {
    id: 1,
    color: "#FD8585",
  },
  {
    id: 1,
    color: "#ABF798",
  },
];

const JournalCard: React.FC<JournalCardProps> = ({ title, content, date }) => {
  const [openPalette, setOpenPalette] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>(colors[0].color);

  return (
    <div
      className={`bg-[${
        bgColor ?? "#F4A578"
      }] w-[22%] px-4 py-4 rounded-lg flex flex-col gap-7 justify-between`}
    >
      <h2 className="font-semibold text-black-75">{title}</h2>
      <p>{content}</p>
      <div className="flex flex-row justify-between">
        <p className="my-auto text-xs text-black-65 font-semibold ">{date}</p>
        <div className="flex flex-row gap-4 items-center relative ">
          <div className="relative ">
            <div className="my-auto flex justify-center items-center">
              <IconButton
                type={"button"}
                buttonText={"palette"}
                backgroundStyleOn={false}
                onclick={() => setOpenPalette(true)}
                iconColor="black"
              />
            </div>
            {openPalette && (
              <CloseClickOutside onClose={() => setOpenPalette(false)}>
                <div className="absolute top-8 left-0 z-20 bg-background w-52 h-11 p-2 rounded-xl shadow-md flex flex-row gap-3 ">
                  {colors.map((color) => (
                    <>
                      <div
                        onClick={() => setBgColor(color.color)}
                        key={color.id}
                        className={`h-5 w-5 rounded-full bg-[${color.color}] my-auto cursor-pointer`}
                      />
                    </>
                  ))}
                </div>
              </CloseClickOutside>
            )}
          </div>
          <IconButton2
            type={"button"}
            buttonText={"edit"}
            backgroundStyleOn={false}
            onclick={() => {}}
            bgColor="black"
            iconColor="white"
          />
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
