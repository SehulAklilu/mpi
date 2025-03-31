import axiosInstance from "@/api/axios";
import { getDateString } from "@/lib/utils";
import { ReminderInf } from "@/Pages/Reminders";
import React, { useEffect, useState } from "react";
import { FaCheckDouble, FaSquare } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

function DashboardReminder() {
  //   const [showMore, setShowMore] = useState(false);
  const [filterDate, setFilterDate] = useState(new Date());
  const queryClient = useQueryClient();
  const {
    isLoading,
    data: reminders,
    isSuccess,
    isFetched,
  } = useQuery<ReminderInf[]>(
    "reminders",
    () =>
      axiosInstance
        .get<ReminderInf[]>("/api/v1/reminders")
        .then((res) => res.data),
    {
      onSuccess(data) {},
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Error loading reminders"
        );
      },
    }
  );

  const { mutate } = useMutation(
    (id: string) =>
      axiosInstance.patch(`/api/v1/reminders/${id}`, {
        isCompleted: true,
      }),
    {
      onSuccess() {
        toast.success("Reminder Updated successfully");
        queryClient.invalidateQueries("reminders");
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data.message ?? "Unable to Udate reminder"
        );
      },
    }
  );

  const [reminderToShow, setReminderToShow] = useState<ReminderInf[]>([]);

  useEffect(() => {
    if (reminders) {
      const filteredReminders = reminders
        ?.filter((reminder) => {
          const reminderDate = new Date(reminder.date); // Convert string to Date object

          return (
            reminderDate.getFullYear() === filterDate.getFullYear() &&
            reminderDate.getMonth() === filterDate.getMonth() &&
            reminderDate.getDate() === filterDate.getDate()
          );
        })
        .slice()
        .reverse();

      setReminderToShow(filteredReminders);
    } else {
      setReminderToShow([]);
    }
  }, [reminders, filterDate]);

  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Reminders</h2>
        <div className="flex items-center gap-1">
          <div className="whitespace-nowrap">Filter By Date</div>
          <Input
            type="date"
            placeholder="Filter By date"
            className="!flex-none"
            value={filterDate.toISOString().split("T")[0]}
            onChange={(e) => setFilterDate(new Date(e.target.value))}
          />
        </div>
      </div>

      <div className="mt-6">
        {reminderToShow?.length > 0 ? (
          reminderToShow?.map((reminder) => (
            <div className="space-y-3 my-4 flex justify-between items-start bg-white rounded-lg shadow-lg p-4 transition-all duration-200 hover:shadow-xl">
              <div>
                <h1 className="font-semibold text-xl text-primary/80 underline">
                  {reminder.title}
                </h1>
                <p className="text-gray-600">{reminder.description}</p>
                <small className="text-sm text-gray-500">
                  {getDateString(new Date(reminder.date))}
                </small>
              </div>
              <div className="flex items-center space-x-2">
                {reminder?.isCompleted ? (
                  <FaCheckSquare className="text-xl text-primary transition-transform transform hover:scale-110" />
                ) : (
                  <div className="flex items-end flex-col">
                    <FaRegSquare
                      className="cursor-pointer text-xl text-gray-600 hover:text-primary transition-transform transform hover:scale-110"
                      onClick={() => reminder._id && mutate(reminder._id)}
                    />
                    <p className="text-xs whitespace-nowrap">
                      Mark as Complete
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center font-medium text-gray-600">
            No Reminder For
            <span className="text-primary pl-2">
              {getDateString(filterDate)}.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardReminder;
