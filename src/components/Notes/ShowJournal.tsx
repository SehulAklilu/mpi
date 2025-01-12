import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { JournalCardProps, journalColors } from "./JournalCard";
import { IoCloseSharp } from "react-icons/io5";

import "react-quill/dist/quill.snow.css";

const ShowNote = ({
  note,
  open,
  setOpen,
}: {
  note: JournalCardProps;
  open: boolean;
  setOpen: Function;
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="min-h-[90vh] bg-gray-100 h-[90vh] min-w-[70%] overflow-auto flex flex-col">
        <AlertDialogHeader className=" h-fit">
          <div className="flex justify-between w-full">
            <AlertDialogTitle>{note.title}</AlertDialogTitle>
            <Button
              onClick={(event) => {
                setOpen(false);
                event.stopPropagation();
              }}
            >
              <IoCloseSharp />
            </Button>
          </div>
        </AlertDialogHeader>
        <div className="bg-white w-full flex-1 px-3 py-4  rounded-xl shadow-xl">
          <div
            className=""
            dangerouslySetInnerHTML={{ __html: note.content }}
          ></div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShowNote;
