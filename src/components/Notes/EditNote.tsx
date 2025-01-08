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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CiEdit } from "react-icons/ci";
import { JournalCardProps, journalColors } from "./JournalCard";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

// const EditNoteSchema = z.object({
//   title: z.string({ required_error: "Title is required" }).min(1),
//   content: z.string({ required_error: "Content is required" }).min(1),
// });

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditNote = ({ note }: { note: JournalCardProps }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = useMutation(
    (data: any) => axios.patch(`/api/v1/journals/${note._id}`, data),
    {
      onSuccess(data) {
        console.log(data, "Journals");
        toast.success("Journal Added Successfuly");
        queryClient.invalidateQueries("journals");
        setOpen(false);
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to update this journal"
        );
      },
    }
  );

  const handleSave = () => {
    mutate({ title, content });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          className="text-semibold p-1 rounded-xl"
          onClick={(event) => {
            setOpen(true);
            event.stopPropagation();
          }}
        >
          Edit
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[90vh] bg-gray-100 h-[90vh] min-w-[70%] overflow-auto">
        <AlertDialogHeader>
          <div className="flex justify-between w-full">
            <AlertDialogTitle>Edit Your Note</AlertDialogTitle>
            <Button
              onClick={(event) => {
                setOpen(false);
                event.stopPropagation();
              }}
            >
              <IoCloseSharp />
            </Button>
          </div>
          <AlertDialogDescription>
            Modify the details of your note and save your changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="bg-white  rounded-xl shadow-xl">
          <div className="py-3 px-4 w-full flex justify-between">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 text-xl font-semibold placeholder-gray-600 placeholder:font-bold appearance-none bg-transparent border-none focus:outline-none"
              placeholder="Title..."
            />
            <Button
              onClick={() => handleSave()}
              className="font-bold text-primary"
            >
              {isLoading ? (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
              ) : (
                "Safe"
              )}
            </Button>
          </div>
          <ReactQuill
            className="h-[66vh]  border-none"
            theme="snow"
            value={content}
            onChange={setContent}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditNote;
