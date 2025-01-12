import { useEffect, useState, useRef } from "react";
// import Button from "../components/Button/Button"; // Reuse your Button component
import AddReminder from "@/components/Reminder/AddReminder";
import AddReminderAlert from "@/components/Reminder/AddReminderAlert";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "@/api/axios";
import { toast } from "react-toastify";
import { Skeleton } from "@/components/ui/skeleton";
// import { Calendar } from "react-calendar";
import { FaCalendar, FaCheck, FaEdit, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { FaDeleteLeft } from "react-icons/fa6";
import DeleteReminder from "@/components/Reminder/DeleteReminder";
import Editreminder from "@/components/Reminder/EditReminder";
import { LoaderCircle } from "lucide-react";
import Calendar from "@/components/Reminder/MyCalendar/Calendar";
import { IoIosArrowForward } from "react-icons/io";
import { Input } from "@/components/ui/input";
export interface ReminderInf {
  _id?: string;
  isCompleted?: boolean;
  title: string; // The title of the reminder
  description: string; // A description of the task or reminder
  date: string; // The date in YYYY-MM-DD format
  type: "reminder" | "match"; // The type of the reminder (can be "reminder" or "match")
  timezone: string; // The timezone or time in HH:mm format
  time: string; // The timezone or time in HH:mm format
}

const Reminders = () => {
  const today = new Date();
  const tomorrow = new Date();
  const dateChecker = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  tomorrow.setDate(tomorrow.getDate() + 1);

  const [date, setDate] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<Date>(new Date());

  const [search, setSearch] = useState<string>("");
  const [reminders, setReminders] = useState<ReminderInf[]>([]);
  const [allReminders, setAllReminder] = useState<ReminderInf[]>([]);
  const {
    isLoading,
    data: result,
    isSuccess,
  } = useQuery("reminders", () => axios.get("/api/v1/reminders"), {
    onSuccess(data) {
      const m = data.data.map((a: any) => ({ ...a, time: "4AM" }));
      setAllReminder(m);
    },
    onError(err: any) {
      toast.error(
        typeof err.response.data === "string"
          ? err.response.data
          : "Error loading reminders"
      );
    },
  });

  useEffect(() => {
    const fun = () => {
      if (!result || typeof result !== "object") return;
      const a = allReminders.filter((d: any) => {
        return search.length > 0
          ? d.title.toLowerCase().includes(search.toLowerCase())
          : new Date(d.date).getDate() == dateFilter.getDate();
      });
      setReminders(a);
      ref && ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    fun();
    return () => {};
  }, [dateFilter, allReminders, search]);

  const ref = useRef<any>(null);
  const timeMap: any = {};

  [12,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (val) =>
      (timeMap[val + "AM"] = [
        <TimeShow time={`${val}AM`} setDate={setDate} date={dateFilter} />,
      ])
  );
  [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (val) =>
      (timeMap[val + "PM"] = [
        <TimeShow time={`${val}PM`} setDate={setDate} date={dateFilter} />,
      ])
  );
  // <TimeShow time={`${val} AM`} setDate={setDate} date={dateFilter} />
  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,12].map((val) =>
  //   reminderWithTime.push(
  //     <TimeShow time={`${val} PM`} setDate={setDate} date={dateFilter} />
  //   )
  // );

  reminders.map(
    (reminder, ind) =>
      timeMap[reminder.time].push(
        <ReminderCard ind={ind} setDate={setDate} reminder={reminder} />
      )
    // reminderWithTime.push(
    //   <ReminderCard ind={ind} setDate={setDate} reminder={reminder} />
    // )
  );

  return (
    <div className="  font-raleway bg-white  overflow-auto   min-h-[80vh] flex-1 ">
      <div className="w-full px-2">
        <Input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          className="bg-white mx-auto w-[10%] mt-4"
          placeholder="search here"
        />
      </div>
      <WeekShow dateFilter={dateFilter} setDateFilter={setDateFilter} />
      <div className="flex px-1 rounded-xl">
        <div className="basis-2/3 border rounded-xl  p-1">
          <div className="flex justify-between p-1 py-2 border-b">
            <div className="flex flex-col">
              <div className="text-sm font-semibold">
                Schedules for{" "}
                {dateChecker(dateFilter, new Date())
                  ? "Today"
                  : `${dateFilter.getFullYear()}-${
                      dateFilter.getMonth() + 1
                    }-${dateFilter.getDate()}`}
              </div>
              <div className="text-xs">
                Create and complete tasks using boards
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
          </div>
          <div>
            <div className="w-full flex-1 flex flex-col gap-4 mt-8 px-4 ">
              {isSuccess &&
                Object.keys(timeMap).map((k) => {
                  return  timeMap[k].map((rem: any,ind : number) => {
                    return search.length > 0 && ind == 0 ? <></> : rem
                  });
                })}
              {isLoading &&
                [1, 2, 3, 4, 4, 4, 4, 4, 4, 4].map(() => {
                  return <Skeleton className="w-full py-12 h-44 bg-primary" />;
                })}
            </div>
          </div>
        </div>
        <div className="basis-1/3 p-2 flex flex-col ">
          <div className="w-full px-2 mb-5">
            <Calendar
              // onChange={(date: any) => setDate(date.toString())}
              // className="mx-auto"
              // value={[new Date(2025, 0, 1), new Date(2025, 0, 4)]}
              // allowPartialRange
              setDateFilter={setDateFilter}
              reminders={allReminders}
              dateFilter={dateFilter}
            />
          </div>
          {date == null ? (
            <div className="min-h-[30vh] w-full flex">
              <div
                onClick={() => setDate("")}
                className="bg-gradient-to-b text-white z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
              >
                <FaCalendar />
              </div>
            </div>
          ) : (
            <AddReminder ref={ref} setDate={setDate} date={date ?? ""} />
          )}
        </div>
      </div>
    </div>
  );
};
// {open && <AddReminderAlert open={open} setOpen={setOpen} date={open} />}
//

const WeekShow = ({
  setDateFilter,
  dateFilter,
}: {
  setDateFilter: Function;
  dateFilter: Date;
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get the start of the week (Sunday)
  const getStartOfWeek = (date: Date): Date => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day;
    startOfWeek.setDate(diff);
    return startOfWeek;
  };

  // Generate an array of dates for the week (Sunday to Saturday)
  const generateWeekDates = (date: Date): Date[] => {
    const startOfWeek = getStartOfWeek(date);
    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(dayDate);
    }
    return weekDates;
  };

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 7); // Go back by 7 days
      return newDate;
    });
  };

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 7); // Go forward by 7 days
      return newDate;
    });
  };

  const weekDates = generateWeekDates(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const isToday = (date: Date) => {
    return date.getDate() === new Date().getDate();
  };
  const isSelected = (curr: Date) => {
    return curr.getDate() === dateFilter.getDate();
  };
  return (
    <div className="w-full  flex-col  px-1  relative  flex">
      <div className="relative flex w-fullflex gap-5 my-2 bg-[#FFF8F4]">
        <button
          className="absolute left-5 top-1/2 transform -translate-y-1/2"
          onClick={handlePrevWeek}
        >
          <IoIosArrowForward className="rotate-180" />
        </button>
        <button
          className="absolute right-5 top-1/2 transform -translate-y-1/2"
          onClick={handleNextWeek}
        >
          <IoIosArrowForward />
        </button>

        <div className="flex gap-5 mx-auto">
          {weekDates.map((date, index) => (
            <div
              role="button"
              onClick={() => {
                setDateFilter(date);
              }}
              key={index}
              className={`${
                isSelected(date)
                  ? "bg-gradient-to-b from-[#F8B672] to-[#F2851C] text-white shadow"
                  : isToday(date)
                  ? "border border-primary"
                  : ""
              } w-fit px-5  py-1 text-center p-3 flex gap-1`}
            >
              <div className="font-semibold">{date.getDate()}</div>
              <div className="text-sm m-auto">{weekdays[date.getDay()]}</div>
              <div>{date.getMonth() + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TimeShow = ({
  setDate,
  date,
  time,
}: {
  setDate: Function;
  date: Date;
  time: string;
}) => {
  function getDateString() {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    // const date = new Date(`${currentYear}-${currentMonth + 1}-${day}`);
  }
  return (
    <div className="w-full flex my-2">
      <div className="w-[10%] text-sm capitalize">{time}</div>
      <div className="flex w-[90%]">
        <div className="w-full border-b my-auto"></div>
        { 
          <div
            role="button"
            onClick={() => setDate(getDateString())}
            className="text-gray-500 border rounded-full min-w-5 max-w-5 min-h-5 max-h-5  flex"
          >
            <FaPlus className="m-auto p-1" />
          </div>
        }
        <div className="w-full border-b my-auto"></div>
      </div>
    </div>
  );
};

const ReminderCard = ({
  reminder,
  setDate,
  ind,
}: {
  reminder: ReminderInf;
  setDate: Function;
  ind: number;
}) => {
  const queryClient = useQueryClient();
  const  date  = new Date(reminder.date);
  const [open, setOpen] = useState(false);

  const { isLoading, mutate } = useMutation(
    () =>
      axios.patch(`/api/v1/reminders/${reminder._id}`, {
        isCompleted: !reminder.isCompleted,
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
  return (
    <>
      <div className="w-[90%] ml-auto text-sm px-2 py-3 rounded-lg bg-blue-100/20  hover:shadow duration-200 border border-gray-200 flex flex-col">
        <div className="flex justify-between">

        <div className="font-semibold">{reminder.title}</div>
        <div className="text-xs">
        {date.getMonth() + 1  }-{date.getDate()}-{date.getFullYear()}
        </div>
        </div>
        <div className="mt-1 ">{reminder.description}</div>
        <div className="flex gap-3 mt-4 font-[500]">
          {reminder.isCompleted ? (
            <Button
              onClick={() => mutate()}
              className="px-3 py-2 bg-primary/70 flex gap-2 rounded text-white"
            >
              <div className="bg-primary  w-5 h-5 rounded-full flex">
                <FaCheck className="m-auto" />
              </div>
              <div className="my-auto">
                {isLoading ? (
                  <LoaderCircle
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                ) : (
                  "Completed"
                )}
              </div>
            </Button>
          ) : (
            <Button
              onClick={() => mutate()}
              className="px-3 py-2 bg-primary/10 flex gap-2 rounded text-primary"
            >
              <div className=" w-5 h-5 rounded-full flex">
                <FaCheck className="m-auto" />
              </div>
              <div className="my-auto">
                {isLoading ? (
                  <LoaderCircle
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                ) : (
                  "Mark Complete"
                )}
              </div>
            </Button>
          )}
          <Button
            onClick={(event) => {
              setOpen(true);
              event.stopPropagation();
            }}
            className="px-3 py-2 bg-white text-blue-500 flex gap-2 rounded "
          >
            <div className="w-5 h-5 rounded-full flex">
              <FaEdit className="m-auto" />
            </div>
            <div className="my-auto">Edit</div>
          </Button>
          {open && (
            <Editreminder
              initialValue={reminder}
              open={open}
              setOpen={setOpen}
            />
          )}
          <DeleteReminder id={reminder._id ?? ""} />
        </div>
      </div>
    </>
  );
};

export default Reminders;
