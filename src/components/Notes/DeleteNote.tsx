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
import { JournalCardProps } from "./JournalCard";
import { MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import axios from "@/api/axios.ts";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";

function DeleteNote({ note }: { note: JournalCardProps }) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = useMutation(
    () => axios.delete(`/api/v1/journals/${note._id}`),
    {
      onSuccess(data) {
        console.log(data, "Journals");
        toast.success("Journal Deleted Successfuly");
        queryClient.invalidateQueries("journals");
        setOpen(false);
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to Delete this journal"
        );
      },
    }
  );

  const onSubmit = () => {
    mutate();
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
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(event) => {
              setOpen(false);
              event.stopPropagation();
            }}
            className="px-3 py-1 rounded bg-gray-400"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              onSubmit();
              event.stopPropagation();
            }}
            className="px-3 py-1 rounded bg-red-500 text-white"
          >
            {isLoading ? (
              <LoaderCircle
                style={{
                  animation: "spin 1s linear infinite",
                }}
              />
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteNote;
