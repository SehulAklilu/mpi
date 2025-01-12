import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
import { PiDotsThreeOutlineVertical } from "react-icons/pi";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import ShowNote from "./ShowJournal";

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
  const date = new Date(journal.createdAt);
  let content = journal.content.slice(0, 280);
  if (content.length < journal.content.length) {
    content += "...";
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      <ShowNote open={open} setOpen={setOpen} note={journal} />
      <div
        className={`w-full shadow group  hover:shadow-lg duration-150 bg-white rounded-lg min-h-[40vh] h-[40vh] overflow-hidden  flex flex-col pb-2 `}
      >
        <h2
          onClick={() => setOpen(true)}
          className="font-semibold text-white group-hover:underline  cursor-pointer capitalize text-lg rounded-t-lg bg-gradient-to-b from-[#F8B672] to-[#F2851C] py-2 px-3 text-black-75"
        >
          {journal.title}
        </h2>

        <div className="flex flex-col gap-7 flex-1 px-2 pt-2 pb-2">
          <div
            className="flex-1 basis-1 flex-grow text-sm h-[30vh] overflow-hidden"
            dangerouslySetInnerHTML={{ __html: journal.content }}
          ></div>
          <div className="flex flex-row justify-between mt-auto ">
            <p className="my-auto text-xs text-black-65 font-semibold ">
              {date.getMonth() + 1}-{date.getDate()}-{date.getFullYear()}
            </p>
            <JournalOptions journal={journal} />
          </div>
        </div>
      </div>
    </>
  );
};

const JournalOptions = ({ journal }: { journal: JournalCardProps }) => {
  return (
    <Popover>
      <PopoverTrigger
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <Button>
          <PiDotsThreeOutlineVertical />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit ">
        <div className="flex flex-col gap-2 ">
          <EditNote note={journal} />
          <DeleteNote note={journal} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default JournalCard;
