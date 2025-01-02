import { useState } from "react";
import IconButton from "../Button/IconButton";
import IconButton2 from "../Button/IconButton2";
import CloseClickOutside from "../Additionals/ClickOutside";
import MaterialIcon from "../Icon/MaterialIcon";
import EditNote from "../Notes/EditNote";
import DeleteNote from "../Notes/DeleteNote";
import EditColor from "../Notes/EditColor";

export interface JournalCardProps {
  _id: string;
  userId: string;
  title: string;
  content: string;
  isFavorite: boolean;
  color: number;
  document: string;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export const journalColors = [
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

const JournalCard = ({ journal }: { journal: JournalCardProps }) => {
  const [openPalette, setOpenPalette] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>(journalColors[0].color);

  return (
    <div
      style={{
        backgroundColor: journalColors[journal.color].color,
      }}
      className={`w-full px-4 py-4 rounded-lg flex flex-col gap-7 justify-between`}
    >
      <h2 className="font-semibold text-black-75">{journal.title}</h2>
      <p>{journal.content}</p>
      <div className="flex flex-row justify-between">
        <p className="my-auto text-xs text-black-65 font-semibold ">
          {journal.createdAt}
        </p>
        <div className="flex flex-row gap-4 items-center relative ">
          <div className="relative  ">
            <div className="my-auto flex gap-3 justify-center items-center">
              <EditNote note={journal} />
              {/* <IconButton
                type={"button"}
                buttonText={"palette"}
                backgroundStyleOn={false}
                onclick={() => setOpenPalette(true)}
                iconColor="black"
              /> */}
              {/* <EditColor note={journal} /> */}
              <DeleteNote note={journal} />
            </div>
            {/* {openPalette && (
              <CloseClickOutside onClose={() => setOpenPalette(false)}>
                <div className="absolute top-8 left-0 z-20 bg-background w-52 h-11 p-2 rounded-xl shadow-md flex flex-row gap-3 ">
                  {journalColors.map((color) => (
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
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;
