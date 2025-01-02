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
import { JournalCardProps, journalColors } from "../Card/JournalCard";
import { LoaderCircle } from "lucide-react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const EditNoteSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1),
  content: z.string({ required_error: "Content is required" }).min(1),
});

const EditNote = ({ note }: { note: JournalCardProps }) => {
  const form = useForm<z.infer<typeof EditNoteSchema>>({
    resolver: zodResolver(EditNoteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  const [color, setColor] = useState(note.color);

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

  const onSubmit = (data: any) => {
    console.log(color);
    mutate({ ...data, color: color.toString() });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          className="bg-black p-1 rounded-xl"
          onClick={() => setOpen(true)}
        >
          <CiEdit className="text-white text-lg" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="min-h-[70vh]">
        <AlertDialogHeader>
          <div className="flex justify-between w-full">
            <AlertDialogTitle>Edit Your Note</AlertDialogTitle>
            <Button onClick={() => setOpen(false)}>
              <IoCloseSharp />
            </Button>
          </div>
          <AlertDialogDescription>
            Modify the details of your note and save your changes.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <Input
                id="title"
                placeholder="Enter title"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>
              <textarea
                id="content"
                placeholder="Enter content"
                rows={8}
                className="w-full border rounded-md p-2"
                {...form.register("content")}
              />
              {form.formState.errors.content && (
                <p className="text-red-500 text-sm">
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              {journalColors.map((col, ind) => (
                <div
                  role="button"
                  onClick={() => {
                    setColor(ind);
                  }}
                  style={{ backgroundColor: col.color }}
                  className={`${
                    ind == color && "border-2 border-black"
                  } w-6 h-6 rounded-full my-3`}
                ></div>
              ))}
            </div>
          </div>
          <Button
            type="submit"
            className="flex max-w-32 bg-primary py-2 shadow rounded-3xl px-12 items-center justify-center gap-2  text-white border border-gray-300 "
          >
            {isLoading ? (
              <LoaderCircle
                style={{
                  animation: "spin 1s linear infinite",
                }}
              />
            ) : (
              "Submit"
            )}
          </Button>
          {/* <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter> */}
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EditNote;
