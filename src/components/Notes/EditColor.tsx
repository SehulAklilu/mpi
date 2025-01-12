import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaArrowLeft } from "react-icons/fa6";
import { LoaderCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  JournalCardProps,
  journalColors,
} from "@/components/Notes/JournalCard";
import { useState } from "react";

const EditColor = ({ note }: { note: JournalCardProps }) => {
  const [color, setColor] = useState(note.color);
  const { isLoading, mutate } = useMutation(
    (color: { color: string }) =>
      axios.patch(`/api/v1/journals/${note._id}`, color),
    {
      onSuccess(data) {
        console.log(data, "Journals");
        toast.success("Journal Edited Successfuly");
        setColor(0);
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error Editing journal"
        );
      },
    }
  );
  const handleSave = async (num: any) => {
    mutate({
      color: num.toString(),
    });
  };

  return (
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <div className="flex gap-4">
          {journalColors.map((col, ind) => (
            <div
              role="button"
              onClick={() => {
                setColor(ind);
                handleSave(ind);
              }}
              style={{ backgroundColor: col.color }}
              className={`w-6 h-6 rounded-full ${
                color == ind && "border-2 border-primary"
              }`}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditColor;
