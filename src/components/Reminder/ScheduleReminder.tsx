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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MdDelete } from "react-icons/md"
import { useMutation, useQueryClient } from "react-query"
import { useState } from "react"
import axios from "@/api/axios.ts"
import { toast } from "react-toastify"
import { LoaderCircle } from "lucide-react"
import { FaDeleteLeft } from "react-icons/fa6"
import { RiDeleteBin6Line } from "react-icons/ri"

function DeleteSchedule({ id }: { id: string }) {
  const queryClient = useQueryClient()

  const [open, setOpen] = useState(false)

  const { isLoading, mutate } = useMutation(
    () => axios.delete(`/api/v1/class-schedule/${id}`),
    {
      onSuccess(data) {
        toast.success("Schedule Deleted Successfuly")
        queryClient.invalidateQueries("mySchedule")
        setOpen(false)
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Unable to Delete this reminder"
        )
      },
    }
  )

  const onSubmit = () => {
    mutate()
  }
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={(event) => {
            setOpen(true)
            event.stopPropagation()
          }}
          className="px-3 py-2 text-red-800 bg-red-500/20 flex gap-2 rounded "
        >
          <div className="w-5 h-5 rounded-full flex">
            <RiDeleteBin6Line className="m-auto" />
          </div>
          <div className="my-auto">Delete</div>
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
              setOpen(false)
              event.stopPropagation()
            }}
            className="px-3 py-1 rounded bg-gray-400"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              onSubmit()
              event.stopPropagation()
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
  )
}

export default DeleteSchedule
