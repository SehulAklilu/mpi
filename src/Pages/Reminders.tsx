import { useState } from "react";
// import Button from "../components/Button/Button"; // Reuse your Button component
import AddReminder from "@/components/Reminder/AddReminder";
import AddReminderAlert from "@/components/Reminder/AddReminderAlert";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from "@/components/ui/calendar";
export interface ReminderInf {
  title: string; // The title of the reminder
  description: string; // A description of the task or reminder
  date: string; // The date in YYYY-MM-DD format
  type: "reminder" | "match"; // The type of the reminder (can be "reminder" or "match")
  timezone: string; // The timezone or time in HH:mm format
}

const Reminders = () => {
  const today = new Date();
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [values, setValues] = useState<any>([today, tomorrow]);

  const [open, setOpen] = useState<null | string>(null);
  const [reminders, setReminders] = useState<ReminderInf[]>([]);

  const { isLoading, data: result } = useQuery(
    "reminders",
    () => axios.get("/api/v1/reminders"),
    {
      onSuccess(data) {
        console.log(data, "Reminders");
        setReminders(data.data || []);
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading reminders"
        );
      },
    }
  );
  return (
    <div className="flex  font-raleway bg-white  overflow-auto   min-h-[80vh] flex-1 rounded-xl">
      <div className="basis-2/3 border rounded-xl  p-1">
        <div className="flex justify-between p-1 py-2 border-b">
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              Schedules for Feb 10, 2025
            </div>
            <div className="text-xs">
              Create and complete tasks using boards
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-600"></div>
        </div>
        <div>
          <div className="w-full flex-1 flex flex-col gap-4 mt-8 px-4 ">
            {reminders.map((reminder) => (
              <ReminderCard reminder={reminder} />
            ))}
            {isLoading &&
              [1, 2, 3, 4, 4, 4, 4, 4, 4, 4].map(() => {
                return <Skeleton className="w-full py-12 h-44 bg-primary" />;
              })}
          </div>
        </div>
      </div>
      <div className="basis-1/3 p-2 flex flex-col ">
        <Calendar className="mx-auto" />
        <AddReminder />
      </div>
    </div>
  );
};
// {open && <AddReminderAlert open={open} setOpen={setOpen} date={open} />}
//

const ReminderCard = ({ reminder }: { reminder: ReminderInf }) => {
  const date = new Date(reminder.date);
  return (
    <div className="w-full text-sm px-2 py-3 rounded-lg bg-gray-100  hover:shadow duration-200 border border-gray-200 flex flex-col">
      <div className="font-semibold">{reminder.title}</div>
      <div className="mt-1 ">{reminder.description}</div>
      <div className="flex justify-between mt-2">
        <div className="px-2 py-1 rounded-full border-primary border text-primary text-xs">
          {reminder.type}
        </div>
        <div className="">
          {date.getDay()}-{date.getMonth() + 1}-{date.getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
