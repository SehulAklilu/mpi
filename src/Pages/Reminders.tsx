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
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { useRole } from "@/RoleContext";
import { Session } from "@/types/classes.type";
import SessionCard from "@/components/Reminder/ClassesCard";
import { extractDateTime, formatDate } from "@/lib/utils";
export interface ReminderInf {
  _id?: string;
  isCompleted?: boolean;
  title: string; // The title of the reminder
  description: string; // A description of the task or reminder
  date: string; // The date in YYYY-MM-DD format
  type: "reminder" | "match" | "session"; // The type of the reminder (can be "reminder" or "match")
  timezone: string; // The timezone or time in HH:mm format
  time: string; // The timezone or time in HH:mm format
}

const Reminders = () => {
  const tomorrow = new Date();
  const dateChecker = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  tomorrow.setDate(tomorrow.getDate() + 1);

  const { role } = useRole();

  const [date, setDate] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<Date>(new Date());
  const [onEdit, setEdit] = useState(false);
  const [initialClassData, setInitialClassData] = useState<Session | undefined>(
    undefined
  );
  const [defaultType, setDefaultType] = useState("reminder");

  const [search, setSearch] = useState<string>("");
  const [reminders, setReminders] = useState<ReminderInf[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [allReminders, setAllReminder] = useState<ReminderInf[]>([]);
  const {
    isLoading,
    data: result,
    isSuccess,
  } = useQuery("reminders", () => axios.get("/api/v1/reminders"), {
    onSuccess(data) {
      const m = data.data.map((a: any) => ({ ...a, time: "12AM" }));
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

  const onEditClicked = () => {
    setDate("");
    setDefaultType("session");
  };

  const {
    isLoading: isClassLoading,
    data: classes,
    isSuccess: isClassesSuccess,
    isFetching,
  } = useQuery("classes", () => axios.get<Session[]>("/api/v1/classes"), {
    onSuccess(data) {
      // setSessions(data.data);
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
        if (search.length > 0) {
          return d.title.toLowerCase().includes(search.toLowerCase());
        } else {
          const reminderDate = extractDateTime(d.date).date;
          const filterDate = formatDate(dateFilter);

          return reminderDate == filterDate;
        }
      });
      setReminders(a);
      ref && ref.current?.scrollIntoView({ behavior: "smooth" });
    };
    fun();
    return () => {};
  }, [dateFilter, allReminders, search]);

  useEffect(() => {
    const filterSessions = () => {
      const filteredSessions = classes?.data.filter((session: Session) => {
        if (search.length > 0) {
          return session.levelPlan.toLowerCase().includes(search.toLowerCase());
        } else {
          const sessionDate = extractDateTime(session.date).date;
          const filterDate = formatDate(dateFilter);

          return sessionDate == filterDate;
        }
      });

      filteredSessions && setSessions(filteredSessions);
    };

    filterSessions();

    return () => {};
  }, [search, dateFilter, isClassLoading, isFetching]);

  const ref = useRef<any>(null);
  const timeMap: any = {};

  [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
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

  const combinedData = [
    ...reminders.map((reminder) => ({ type: "reminder", data: reminder })),
    ...sessions.map((session) => ({ type: "session", data: session })),
  ];

  combinedData.map(({ type, data }, ind) => {
    if (type === "session" && role !== "parent") {
      const session = data as Session;
      const timeObj = extractDateTime(session.date);
      const time =
        timeObj && timeObj.hours !== 0
          ? (timeObj.hours % 12) + timeObj.period
          : "12AM";
      timeMap[time].push(
        <SessionCard
          key={session._id}
          session={session}
          onEditClicked={onEditClicked}
          setInitialClassData={setInitialClassData}
        />
      );
    } else if (type === "reminder") {
      const reminder = data as ReminderInf;
      timeMap[reminder.time].push(
        <ReminderCard
          key={ind}
          ind={ind}
          setDate={setDate}
          reminder={reminder}
        />
      );
    }
  });

  return (
    <ContentLayout>
      <div className="font-raleway bg-white  overflow-auto   min-h-[80vh] flex-1 ">
        <div className="w-full px-2 pt-3 ">
          <Input
            value={search}
            onChange={({ target }) => setSearch(target.value)}
            className="bg-white mx-auto w-[10%] mt-4"
            placeholder="search here"
            type="search"
          />
        </div>
        <WeekShow dateFilter={dateFilter} setDateFilter={setDateFilter} />
        <div className="flex max-md:flex-col-reverse px-1 rounded-xl">
          <div className="md:basis-5/6 border rounded-xl  p-1 ">
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
                  isClassesSuccess &&
                  Object.keys(timeMap).map((k) => {
                    return timeMap[k].map((rem: any, ind: number) => {
                      return search.length > 0 && ind == 0 ? <></> : rem;
                    });
                  })}
                {isLoading &&
                  isClassLoading &&
                  [1, 2, 3, 4, 4, 4, 4, 4, 4, 4].map(() => {
                    return (
                      <Skeleton className="w-full py-12 h-44 bg-primary" />
                    );
                  })}
              </div>
            </div>
          </div>
          <div
            className={`md:basis-1/6 max-md:py-2 max-md:my-5 p-2 flex flex-col max-md:${
              search.length > 0 && "hidden"
            }  `}
          >
            <div className="w-full bg--300 md:px-2 md:mb-5 ">
              <Calendar
                setDateFilter={setDateFilter}
                reminders={allReminders}
                dateFilter={dateFilter}
                classes={classes?.data}
              />
            </div>

            {date == null ? (
              <div className="md:min-h-[30vh] w-full flex">
                <div
                  onClick={() => setDate("")}
                  className=" bg-gradient-to-b text-white z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
                >
                  <FaCalendar />
                </div>
              </div>
            ) : (
              <AddReminder
                ref={ref}
                setDate={setDate}
                date={date ?? ""}
                initialClassData={initialClassData}
                defaultType={defaultType}
              />
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

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
          className="ml-auto"
          // className="absolute left-5 top-1/2 transform -translate-y-1/2"
          onClick={handlePrevWeek}
        >
          <IoIosArrowForward className="rotate-180" />
        </button>

        <div className="flex flex- gap-5 max-md:gap-1 overflow-auto mx-auto">
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
        <button
          className="me-auto"
          // className="absolute right-5 top-1/2 transform -translate-y-1/2"
          onClick={handleNextWeek}
        >
          <IoIosArrowForward />
        </button>
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
  const isValid = (): boolean => {
    return new Date() < date;
  };
  return (
    <div className="w-full flex my-2">
      <div className="w-[10%] text-sm capitalize">{time}</div>
      <div className="flex w-[90%]">
        <div className="w-full border-b my-auto"></div>
        {isValid() && (
          <div
            role="button"
            onClick={() => setDate(getDateString())}
            className="text-gray-500 border rounded-full min-w-5 max-w-5 min-h-5 max-h-5  flex"
          >
            <FaPlus className="m-auto p-1" />
          </div>
        )}
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
  const date = new Date(reminder.date);
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
      <div
        className={`max-md:w-full w-[90%] ml-auto text-sm px-2 py-3 rounded-lg bg-blue-100/20  hover:shadow duration-200 border border-gray-200 flex flex-col`}
      >
        <div className="flex justify-between">
          <div className="font-semibold">{reminder.title}</div>
          <div className="text-xs">
            {date.getMonth() + 1}-{date.getDate()}-{date.getFullYear()}
          </div>
        </div>
        <div className="mt-1 ">{reminder.description}</div>
        <div className="flex text-sm flex-wrap gap-3 mt-4 font-[500]">
          {reminder.isCompleted ? (
            <Button
              onClick={() => mutate()}
              className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-primary/70 flex gap-2 rounded text-white"
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
              className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-primary/10 flex gap-2 rounded text-primary"
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
            className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-white text-blue-500 flex gap-2 rounded "
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
