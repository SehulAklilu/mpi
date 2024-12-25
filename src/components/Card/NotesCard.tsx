import { FC } from "react";

interface NotesCardpros {
  color: "#F2851C" | "#2D63E3";
  notesTitle: string;
  notesDesc: string;
}

const NotesCard: FC<NotesCardpros> = ({ color, notesTitle, notesDesc }) => {
  return (
    <div className="flex flex-row gap-2 rounded-lg h-32 w-[98%] bg-white ">
      <div className={`w-14 bg-[${color}]  rounded-bl-lg rounded-tl-lg `} />
      <div className="flex flex-col gap-2 py-1 px-2 my-auto ">
        <h2>{notesTitle}</h2>
        <p className="pr-1 text-sm">{notesDesc}</p>
      </div>
    </div>
  );
};

export default NotesCard;
