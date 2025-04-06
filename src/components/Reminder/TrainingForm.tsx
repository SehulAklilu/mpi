import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Coach } from "@/types/user.types";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axiosInstance from "@/api/axios";
import { toast } from "react-toastify";
import { LoaderCircle } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Player } from "@/types/children.type";
import { useRole } from "@/RoleContext";

interface Availability {
  time: string;
  available: boolean;
}

interface AvailabilityNew {
  time: string;
  label: string;
  available: boolean;
}
function TrainingForm({
  date,
  setDate,
  setDateFilter,
}: {
  date: string;
  setDate: Function;
  setDateFilter: Function;
}) {
  const [coachs, setCoachs] = useState<Coach[]>([]);
  const [availabilitys, setAvailabilitys] = useState<AvailabilityNew[]>([]);
  const [selectedCoach, setSelectedCoach] = useState<string | undefined>(
    undefined
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(
    undefined
  );
  const { role } = useRole();
  const [childrens, setChildrens] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>(
    undefined
  );
  const queryClient = useQueryClient();

  const FormSchema = z.object({
    coach: z.string().min(3),
    date: z
      .string({ required_error: "Date is required" })
      .min(1, { message: "Required" }),
    playerNote: z.string(),
    player: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function convertTo12HourFormat(schedule: Availability[]) {
    return schedule.map((slot) => {
      let [hour, minute] = slot.time.split(":").map(Number);
      let period = hour < 12 ? "AM" : "PM";

      // Convert hour to 12-hour format
      hour = hour % 12 || 12;

      return {
        time: slot.time,
        label: `${hour}:${minute.toString().padStart(2, "0")} ${period}`,
        available: slot.available,
      };
    });
  }

  type FormSchemaType = z.infer<typeof FormSchema>;

  const { data: result } = useQuery<Coach[]>(
    "mycoaches",
    () =>
      axiosInstance
        .get<Coach[]>("/api/v1/class-schedule/mycoaches")
        .then((res) => res.data),
    {
      enabled: role !== "parent",
      onSuccess(data) {
        if (data) {
          setCoachs(data);
        }
      },
    }
  );

  const { data: coatchs_data } = useQuery<Coach[]>(
    ["coatchs_data", selectedPlayer],
    () =>
      axiosInstance
        .get(`/api/v1/class-schedule/child/${selectedPlayer}/coaches`)
        .then((res) => res.data),
    {
      enabled: !!selectedPlayer,
      onSuccess(data) {
        setCoachs(data);
      },
    }
  );

  const { data: coach_avaliablity } = useQuery<Availability[]>(
    ["coach_avaliablity", selectedCoach],
    () =>
      axiosInstance
        .get(`/api/v1/class-schedule/${selectedCoach}/availability`)
        .then((res) => res.data),
    {
      enabled: !!selectedCoach,
      onSuccess(data) {
        const result = convertTo12HourFormat(data);
        setAvailabilitys(result);
      },
    }
  );

  const { data: myChildren } = useQuery<Player[]>(
    ["children"],
    () =>
      axiosInstance
        .get(`/api/v1/class-schedule/myChildren`)
        .then((res) => res.data),
    {
      enabled: role === "parent",
      onSuccess(data) {
        setChildrens(data);
      },
    }
  );

  const { isLoading, mutate } = useMutation(
    async (data: { date: string; playerNote: string; timezone: string }) => {
      const url =
        role === "parent"
          ? `/api/v1/class-schedule/${selectedPlayer}/${selectedCoach}/create`
          : `/api/v1/class-schedule/${selectedCoach}/create`;

      return axiosInstance.post(url, data);
    },
    {
      onSuccess: (response) => {
        toast.success("Class scheduled successfully!");
        const newReminder = response?.data?.[response.data.length - 1];
        const newRemindeDater = new Date(newReminder?.date);
        newRemindeDater && setDateFilter(newRemindeDater);
        queryClient.invalidateQueries("classes-schedule");
      },
      onError: (err: any) => {
        console.error("Error:", err);
        toast.error(err.response?.data?.message || "Something went wrong!");
      },
    }
  );

  const onSubmit = (data: FormSchemaType) => {
    if (!selectedCoach) {
      toast.error("Please select a coach before submitting.");
      return;
    }

    if (!selectedTimeSlot) {
      toast.error("Please select a time slot before submitting.");
      return;
    }

    // Combine `data.date` with the selected time slot
    const fullDateTime = `${data.date}T${selectedTimeSlot}:00.000Z`;

    const payload = {
      date: fullDateTime, // Single datetime string
      playerNote: data.playerNote,
      timezone: "AA",
    };

    mutate(payload);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full">
            {role === "parent" && (
              <FormField
                control={form.control}
                name="player"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Players</FormLabel>
                    <Select
                      value={field.value || ""}
                      onValueChange={(value: string) => {
                        field.onChange(value);
                        setSelectedPlayer(value);
                      }}
                    >
                      <SelectTrigger className="shadow !py-4 !px-4 w-full">
                        <SelectValue placeholder="Select Players" />
                      </SelectTrigger>
                      <SelectContent>
                        {childrens.map((child) => (
                          <SelectItem key={child._id} value={child._id}>
                            {child.firstName} {child.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="coach"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coach</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: any) => {
                      field.onChange(value);
                      setSelectedCoach(value);
                    }}
                  >
                    <SelectTrigger className={" shadow !py-4 !px-4 w-full"}>
                      <SelectValue placeholder="Select Coach" />
                    </SelectTrigger>
                    <SelectContent>
                      {coachs.map((coach) => (
                        <SelectItem key={coach._id} value={coach._id}>
                          {coach.firstName} {coach.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Date
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

            <FormField
              control={form.control}
              name="playerNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description..."
                      className="resize-none !bg-white w-full border rounded-md p-2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="my-2 font-medium">Available Time Slots</div>
            <div className="max-h-[30vh] overflow-auto">
              {availabilitys?.map((availability) => (
                <div
                  key={availability.time}
                  className={`w-full border rounded-md flex items-center justify-center py-2 my-1 
                        ${
                          availability.available
                            ? "cursor-pointer hover:border-primary"
                            : "bg-gray-200 cursor-not-allowed"
                        }
                        ${
                          selectedTimeSlot === availability.time
                            ? "bg-primary/80 text-white"
                            : "bg-white"
                        }
                        ${
                          !availability.available && "bg-gray-200 text-gray-500"
                        }
                    `}
                  onClick={() =>
                    availability.available &&
                    setSelectedTimeSlot(availability.time)
                  }
                >
                  {availability.label}
                </div>
              ))}
            </div>
          </div>
          <button className="py-2 w-full flex items-center justify-center gap-2 bg-primary text-white my-2 rounded-md">
            Save Event
            {isLoading && (
              <LoaderCircle
                style={{
                  animation: "spin 1s linear infinite",
                  fontSize: "2rem",
                  color: "#FFFFFF",
                }}
              />
            )}
          </button>
        </form>
      </Form>
    </div>
  );
}

export default TrainingForm;
