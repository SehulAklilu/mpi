import axiosInstance from "@/api/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useRole } from "@/RoleContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { FaX } from "react-icons/fa6"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { z } from "zod"
import moment from "moment-timezone"

interface EditTrainingProps {
  close: () => void
  isOpen: boolean
  initialData: ReminderInitialData
}

export interface ReminderInitialData {
  _id: string
  description: string
  date: string
  timezone: string
}

const schema = z.object({
  description: z.string().min(5, "Description must be at least 5 characters"),
  date: z.string().min(1, "Date is required"),
  timezone: z.string().min(1, "Timezone is required"),
})

const EditTraining = ({ close, isOpen, initialData }: EditTrainingProps) => {
  const { role }: any = useRole()
  const [coaches, setCoaches] = useState([])
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData,
  })

  useEffect(() => {
    form.reset(initialData)
  }, [initialData])

  const editTrainingMutation = useMutation({
    mutationFn: async (data_: any) => {
      const userTimezone = moment.tz.guess()

      let url = `/api/v1/class-schedule/${initialData._id}`
      const payload = {
        date: new Date(data_.date),
        playerNote: data_.description,
        timezone: userTimezone,
      }
      return axiosInstance.patch(url, payload)
    },
    onSuccess() {
      close()
      queryClient.invalidateQueries(["mySchedule"])
    },
  })

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Edit Training</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault()
            editTrainingMutation.mutate(form.getValues())
          }}
        >
          <label className="text-sm font-medium">Note</label>
          <textarea
            placeholder="Enter description"
            rows={4}
            className="border rounded-md p-2"
            {...form.register("description")}
          />
          <label className="text-sm font-medium">Due Date</label>
          <Input type="date" {...form.register("date")} />

          <div className="flex justify-between gap-2 mt-4 w-full">
            <Button
              onClick={close}
              variant={"outline"}
              className="bg-gray-200 w-1/2 rounded-md text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary w-1/2 py-2 rounded-md text-white"
            >
              {editTrainingMutation.isLoading ? (
                <LoaderCircle />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default EditTraining
