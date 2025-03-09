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
import { useRole } from "@/RoleContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaX } from "react-icons/fa6"
import { useMutation, useQuery } from "react-query"
import { z } from "zod"
import moment from "moment-timezone"

interface AddTrainingProps {
  close: () => void
}

export interface myPlayers {
  _id: string
  avatar: string
  emailAddress: {
    email: string
    verified: boolean
  }
  firstName: string
  lastName: string
  lastOnline: string
  phoneNumber: {
    countryCode: string
    number: string
  }
}

export interface ScheduleProps {
  coachId: myPlayers
  createdAt: string
  date: string
  playerNote: string
  userId: myPlayers
  status: string
  _id: string
}

const schema = z.object({
  player: z.string().min(1, "Player is required"),
  coach: z.string().min(1, "Coach is required"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  date: z.string().min(1, "Date is required"),
  timezone: z.string().min(1, "timezone is required"),
})

type FormValues = z.infer<typeof schema>

const AddTraining = ({ close }: AddTrainingProps) => {
  const [myPlayers, setMyPlayers] = useState<myPlayers[]>([])
  const { role }: any = useRole()
  const [coaches, setCoaches] = useState<myPlayers[]>([])
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const {} = useQuery(
    "parentChildren",
    () => {
      if (role == "parent") {
        return axiosInstance.get(`/api/v1/class-schedule/myChildren`)
      }
    },
    {
      onSuccess(data) {
        console.log(data?.data)
        setMyPlayers(data?.data)
      },
    }
  )

  const { data, isLoading, error } = useQuery(
    "childrenCoach",
    async () => {
      const studentId = form.getValues().player

      if (role === "parent" && studentId) {
        return axiosInstance.get(
          `/api/v1/class-schedule/child/${studentId}/coaches`
        )
      } else if (role == "player") {
        return axiosInstance.get(`/api/v1/class-schedule/myCoaches`)
      }

      return null
    },
    {
      enabled: !!role,
      onSuccess(response) {
        console.log("Coaches: ", response?.data)
        setCoaches(response?.data)
      },
    }
  )

  const AddTrainingMutation = useMutation({
    mutationFn: async (data_: FormValues) => {
      if (role != null) {
        let data
        let url

        const userTimezone = moment.tz.guess()

        console.log("TImezones: ", userTimezone)

        if (role === "parent") {
          data = {
            date: new Date(data_.date),
            playerNote: data_.description,
            timezone: userTimezone,
          }

          url = `/api/v1/class-schedule/${data_.player}/${data_.coach}/create`
        } else if (role === "player") {
          data = {
            date: new Date(data_.date),
            playerNote: data_.description,
            timezone: userTimezone,
          }
          url = `/api/v1/class-schedule/${data_.coach}/create`

          console.log(new Date(data_.date))
        } else {
          throw new Error("Unauthorized role")
        }

        try {
          const response = await axiosInstance.post(url, data)

          console.log("Response from API:", response.data)
        } catch (error) {
          console.error("Error during API call:", error)
          throw error
        }
      }
    },
    onSuccess(data) {
      console.log("API call successful:", data)
    },
    onError(error) {
      console.error("API call failed:", error)
    },
  })

  const onSubmit = (data: FormValues) => {
    AddTrainingMutation.mutate(data)
  }

  console.log("Role", role)

  return (
    <form
      className={`text-sm border rounded-lg m-1 px-2 py-1 flex flex-col gap-3`}
      onSubmit={(e) => {
        onSubmit(form.getValues())
        e.preventDefault()
      }}
    >
      <div className="flex flex-row w-full justify-between">
        <p className="font-semibold">Add Training</p>
        <Button onClick={close} className="bg-gray-200 p-1 rounded-full">
          <FaX size={10} className="text" />
        </Button>
      </div>
      {role != null && role == "parent" ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="block text-sm font-medium">
            Select Player
          </label>
          <Select
            value={form.getValues("player") || ""}
            onValueChange={(value: any) => form.setValue("player", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              {myPlayers?.map((child, index) => (
                <SelectItem
                  key={index}
                  className="capitalize"
                  value={child._id}
                >
                  {child.firstName} {child.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.player && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.player.message}
            </p>
          )}
        </div>
      ) : (
        ""
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="type" className="block text-sm font-medium">
          Select Coach
        </label>
        <Select
          value={form.getValues("coach") || ""}
          onValueChange={(value: any) => form.setValue("coach", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            {coaches.map((coach, index) => (
              <SelectItem key={index} className="capitalize" value={coach._id}>
                {coach.firstName} {coach.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.coach && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.coach.message}
          </p>
        )}
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Enter description"
          rows={4}
          className="w-full border rounded-md p-2"
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <div className="w-full">
          <label htmlFor="date" className="block text-sm font-medium">
            Due Date
          </label>
          <Input
            id="date"
            type="date"
            placeholder="Enter date"
            {...form.register("date")}
          />
          {form.formState.errors.date && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.date.message}
            </p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        onClick={() => {}}
        className="flex my-5  w-full bg-primary py-2 shadow rounded-3xl px-12 items-center justify-center gap-2 text-white border border-gray-300"
      >
        {AddTrainingMutation.isLoading ? (
          <LoaderCircle
            style={{
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          "Add Training"
        )}
      </Button>
    </form>
  )
}

export default AddTraining
