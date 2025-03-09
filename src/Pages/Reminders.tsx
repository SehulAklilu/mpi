import { useEffect, useState, useRef } from "react"
// import Button from "../components/Button/Button"; // Reuse your Button component
import AddReminder from "@/components/Reminder/AddReminder"
import AddReminderAlert from "@/components/Reminder/AddReminderAlert"
import { Mutation, useMutation, useQuery, useQueryClient } from "react-query"
import axios from "@/api/axios"
import { toast } from "react-toastify"
import { Skeleton } from "@/components/ui/skeleton"
// import { Calendar } from "react-calendar";
import { FaCalendar, FaCheck, FaEdit, FaPlus } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { FaDeleteLeft, FaX } from "react-icons/fa6"
import DeleteReminder from "@/components/Reminder/DeleteReminder"
import Editreminder from "@/components/Reminder/EditReminder"
import { Clock, Loader, LoaderCircle, User } from "lucide-react"
import Calendar from "@/components/Reminder/MyCalendar/Calendar"
import { IoIosArrowForward } from "react-icons/io"
import { Input } from "@/components/ui/input"
import { ContentLayout } from "@/components/Sidebar/contenet-layout"
import { useRole } from "@/RoleContext"
import AddTraining, {
  ScheduleProps,
} from "@/components/Reminder/MyCalendar/AddTraining"
import axiosInstance from "@/api/axios"
import Cookies from "js-cookie"
import { RiDeleteBin6Line } from "react-icons/ri"
import DeleteSchedule from "@/components/Reminder/ScheduleReminder"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import EditTraining, {
  ReminderInitialData,
} from "@/components/Reminder/MyCalendar/EditTraining"
export interface ReminderInf {
  _id?: string
  isCompleted?: boolean
  title: string // The title of the reminder
  description: string // A description of the task or reminder
  date: string // The date in YYYY-MM-DD format
  type: "reminder" | "match" // The type of the reminder (can be "reminder" or "match")
  timezone: string // The timezone or time in HH:mm format
  time: string // The timezone or time in HH:mm format
}

export const formatDateAndTimeAMPM = (date: string) => {
  const dateObj = new Date(date)

  let hours = dateObj.getHours()
  let period = hours >= 12 ? "PM" : "AM"

  hours = hours % 12 || 12

  return `${hours}${period}`
}

const Reminders = () => {
  const { role } = useRole()
  const tomorrow = new Date()
  const dateChecker = (date1: Date, date2: Date) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [date, setDate] = useState<string | null>(null)
  const [dateFilter, setDateFilter] = useState<Date>(new Date())
  const [openOptions, setOpenOptions] = useState<boolean>(false)
  const [openTraining, setOpenTraining] = useState<boolean>(false)
  const [schedules, setSchedules] = useState<ScheduleProps[]>([])

  const [search, setSearch] = useState<string>("")
  const [reminders, setReminders] = useState<ReminderInf[]>([])
  const [allReminders, setAllReminder] = useState<ReminderInf[]>([])
  const {
    isLoading,
    data: result,
    isSuccess,
  } = useQuery("reminders", () => axios.get("/api/v1/reminders"), {
    onSuccess(data) {
      setAllReminder(data.data)
      console.log("Remainders", data.data)
    },
    onError(err: any) {
      toast.error(
        typeof err.response.data === "string"
          ? err.response.data
          : "Error loading reminders"
      )
    },
  })

  const {} = useQuery(
    "mySchedule",
    () => {
      if (role === "coach") {
        return axiosInstance.get(`/api/v1/class-schedule/coach`)
      } else {
        return axiosInstance.get(`/api/v1/class-schedule/`)
      }
    },
    {
      onSuccess(data) {
        setSchedules(data.data)
        console.log("Here: ", data?.data)
      },
    }
  )

  useEffect(() => {
    const fun = () => {
      if (!result || typeof result !== "object") return
      const a = allReminders.filter((d: any) => {
        return search.length > 0
          ? d.title.toLowerCase().includes(search.toLowerCase())
          : new Date(d.date).getDate() == dateFilter.getDate()
      })
      setReminders(a)
      ref && ref.current?.scrollIntoView({ behavior: "smooth" })
    }
    fun()
    return () => {}
  }, [dateFilter, allReminders, search])

  const ref = useRef<any>(null)
  const timeMap: any = {}

  ;[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (val) =>
      (timeMap[val + "AM"] = [
        <TimeShow time={`${val}AM`} setDate={setDate} date={dateFilter} />,
      ])
  )
  ;[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
    (val) =>
      (timeMap[val + "PM"] = [
        <TimeShow time={`${val}PM`} setDate={setDate} date={dateFilter} />,
      ])
  )

  reminders.map((reminder, ind) =>
    timeMap[formatDateAndTimeAMPM(reminder.date)].push(
      <ReminderCard ind={ind} setDate={setDate} reminder={reminder} />
    )
  )

  schedules.map((sched, ind) => {
    timeMap[formatDateAndTimeAMPM(sched.date)].push(
      <ScheduleCard key={ind} data={sched} />
    )
  })

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
                  Object.keys(timeMap).map((k) => {
                    return timeMap[k].map((rem: any, ind: number) => {
                      return search.length > 0 && ind == 0 ? <></> : rem
                    })
                  })}
                {isLoading &&
                  [1, 2, 3, 4, 4, 4, 4, 4, 4, 4].map(() => {
                    return <Skeleton className="w-full py-12 h-44 bg-primary" />
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
                reminders={[allReminders, ...schedules]}
                dateFilter={dateFilter}
              />
            </div>

            {date == null && !openTraining ? (
              <div className="md:min-h-[30vh] w-full flex flex-col gap-2">
                {openOptions ? (
                  <div
                    className={`flex flex-col gap-3 w-fit fixed bottom-16 right-0 mb-12 mr-12 z-50 
        transition-all duration-300 ease-in-out scale-100 opacity-100`}
                  >
                    <div
                      onClick={() => {
                        setDate("")
                        setOpenTraining(false)
                        setOpenOptions(false)
                      }}
                      className="bg-primary cursor-pointer w-40 rounded-lg text-white items-center flex justify-center p-1"
                    >
                      Create Reminder
                    </div>
                    {(role == "parent" || role == "player") && (
                      <div
                        onClick={() => {
                          setOpenTraining(true)
                          setDate(null)
                        }}
                        className="bg-primary cursor-pointer w-40 rounded-lg text-white items-center flex justify-center p-1"
                      >
                        Training
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="fixed bottom-16 right-0 mb-12 mr-12 z-50 transition-all duration-300 ease-in-out scale-0 opacity-0"></div>
                )}

                <div
                  onClick={() => setOpenOptions((prev) => !prev)}
                  className="bg-gradient-to-b text-white z-20 hover:scale-105 duration-200 from-[#F8B672] to-[#F2851C] rounded-full shadow-lg shadow-primary p-5 w-fit fixed bottom-0 right-0 mb-12 mr-12"
                >
                  {openOptions ? (
                    <FaX size={15} className="text" />
                  ) : (
                    <FaCalendar />
                  )}
                </div>
              </div>
            ) : openTraining ? (
              <AddTraining
                close={() => {
                  setOpenTraining(false)
                  setOpenOptions(false)
                }}
              />
            ) : (
              <AddReminder ref={ref} setDate={setDate} date={date ?? ""} />
            )}
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}

const WeekShow = ({
  setDateFilter,
  dateFilter,
}: {
  setDateFilter: Function
  dateFilter: Date
}) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  // Get the start of the week (Sunday)
  const getStartOfWeek = (date: Date): Date => {
    const startOfWeek = new Date(date)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day
    startOfWeek.setDate(diff)
    return startOfWeek
  }

  // Generate an array of dates for the week (Sunday to Saturday)
  const generateWeekDates = (date: Date): Date[] => {
    const startOfWeek = getStartOfWeek(date)
    const weekDates = []
    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek)
      dayDate.setDate(startOfWeek.getDate() + i)
      weekDates.push(dayDate)
    }
    return weekDates
  }

  const handlePrevWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() - 7) // Go back by 7 days
      return newDate
    })
  }

  const handleNextWeek = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate)
      newDate.setDate(prevDate.getDate() + 7) // Go forward by 7 days
      return newDate
    })
  }

  const weekDates = generateWeekDates(currentDate)
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const isToday = (date: Date) => {
    return date.getDate() === new Date().getDate()
  }
  const isSelected = (curr: Date) => {
    return curr.getDate() === dateFilter.getDate()
  }
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
                setDateFilter(date)
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
  )
}

const TimeShow = ({
  setDate,
  date,
  time,
}: {
  setDate: Function
  date: Date
  time: string
}) => {
  function getDateString() {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    // const date = new Date(`${currentYear}-${currentMonth + 1}-${day}`);
  }
  const isValid = (): boolean => {
    return new Date() < date
  }
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
  )
}

const ReminderCard = ({
  reminder,
  setDate,
  ind,
}: {
  reminder: ReminderInf
  setDate: Function
  ind: number
}) => {
  const queryClient = useQueryClient()
  const date = new Date(reminder.date)
  const [open, setOpen] = useState(false)

  const { isLoading, mutate } = useMutation(
    () =>
      axios.patch(`/api/v1/reminders/${reminder._id}`, {
        isCompleted: !reminder.isCompleted,
      }),
    {
      onSuccess() {
        toast.success("Reminder Updated successfully")
        queryClient.invalidateQueries("reminders")
      },
      onError(err: any) {
        toast.error(
          typeof err.response?.data === "string"
            ? err.response.data
            : err.response?.data.message ?? "Unable to Udate reminder"
        )
      },
    }
  )
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
              setOpen(true)
              event.stopPropagation()
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
  )
}

interface ScheduleCardProps {
  data: ScheduleProps
}

const ScheduleCard = ({ data }: ScheduleCardProps) => {
  const { role } = useRole()
  const queryClient = useQueryClient()
  const [openApprova, setOpenApproval] = useState<boolean>(false)
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")
  const [schId_, setschId] = useState<string>("")
  const [approved, setApproved] = useState<boolean>(false)
  const [isDeny, setIsDeny] = useState<boolean>(false)
  const [editComment, setEditComment] = useState<string>("")
  const [initialData, setInitalData] = useState<ReminderInitialData>({
    _id: "",
    description: "",
    date: "",
    timezone: "",
  })

  const formatDateandTime = (date: string) => {
    const dateObj = new Date(date)

    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`
    const formattedTime = `${dateObj
      .getHours()
      .toString()
      .padStart(2, "0")}:${dateObj.getMinutes().toString().padStart(2, "0")}`

    return `${formattedDate} ${formattedTime}`
  }

  const approveMutation = useMutation({
    mutationFn: async () => {
      const data = {
        status: "accepted",
        coachNote: comment,
      }

      console.log(data)

      await axiosInstance.patch(
        `/api/v1/class-schedule/${schId_}/coach-response`,
        data
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mySchedule"])
      setOpenApproval(false)
      setApproved(true)
    },
  })

  const denyMutation = useMutation({
    mutationFn: async () => {
      const data = {
        status: "rejected",
        coachNote: comment,
      }

      console.log(data)

      await axiosInstance.patch(
        `/api/v1/class-schedule/${schId_}/coach-response`,
        data
      )
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["mySchedule"])
      setOpenApproval(false)
      setApproved(true)
    },
  })

  const handleApprove = (schId: string) => {
    setschId(schId)
    setOpenApproval(true)
    setIsDeny(false)
  }

  const handleDeny = (schId_: string) => {
    setschId(schId_)
    setOpenApproval(true)
    setIsDeny(true)
  }

  const handleEdit = (schedule: ScheduleProps) => {
    const data__ = {
      _id: schedule._id,
      description: schedule.playerNote,
      date: new Date(schedule.date).toISOString(),
      timezone: "-",
    }
    setOpenEdit(true)
    setInitalData(data__)
  }

  console.log(comment)

  return (
    <div
      className={`max-md:w-full w-[90%] ml-auto text-sm px-4 py-3 rounded-lg bg-yellow-100/20  hover:shadow duration-200 border border-gray-200 flex flex-col gap-4`}
    >
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-1 items-center">
          <User className="text-primary" size={20} />
          <p>{`${data.coachId.firstName} ${data.coachId.lastName}`}</p>
        </div>
        <div className="flex flex-row gap-2">
          <p>{data.status}</p>
          <div className="flex flex-row gap-1 items-center">
            <Clock className="text-primary" size={20} />

            <p>{formatDateandTime(data.date)}</p>
          </div>
        </div>
      </div>
      <div>{data.playerNote}</div>
      {role == "coach" && !approved ? (
        <div className="flex flex-row gap-5">
          <Button
            onClick={() => handleApprove(data._id)}
            className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-green-300 text-white flex gap-2 rounded "
          >
            <div className="w-5 h-5 rounded-full flex">
              <FaEdit className="m-auto" />
            </div>
            <div className="my-auto">Approve</div>
          </Button>

          <Button
            onClick={() => handleDeny(data._id)}
            className="px-3 py-2 text-red-800 bg-red-500/20 flex gap-2 rounded "
          >
            <div className="w-5 h-5 rounded-full flex">
              <RiDeleteBin6Line className="m-auto" />
            </div>
            <div className="my-auto">Deny</div>
          </Button>
        </div>
      ) : (
        <div className="flex flex-row gap-5">
          <Button
            onClick={() => handleEdit(data)}
            className="px-3 py-2 max-md:px-2 max-md:py-1 max-md:gap-1 bg-white text-blue-500 flex gap-2 rounded "
          >
            <div className="w-5 h-5 rounded-full flex">
              <FaEdit className="m-auto" />
            </div>
            <div className="my-auto">Edit</div>
          </Button>
          <DeleteSchedule id={data._id} />
        </div>
      )}

      <Dialog open={openApprova} onOpenChange={() => setOpenApproval(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isDeny ? "Deny Schedule" : "Approve Schedule"}
            </DialogTitle>
          </DialogHeader>
          <Textarea
            placeholder="Enter your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              className={`${
                isDeny ? "border text-white" : "bg-red-400"
              } px-4 py-2 rounded-sm `}
              variant="outline"
              onClick={() => setOpenEdit(false)}
            >
              Cancel
            </Button>

            <Button
              variant={"default"}
              className={`${
                isDeny ? "bg-red-400" : "bg-green-400"
              }  px-4 py-2 rounded-sm text-white`}
              onClick={() => {
                isDeny ? denyMutation.mutate() : approveMutation.mutate()
              }}
            >
              {isDeny ? (
                denyMutation.isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Deny"
                )
              ) : approveMutation.isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Approve"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <EditTraining
        close={() => setOpenEdit(false)}
        isOpen={openEdit}
        initialData={initialData}
      />
    </div>
  )
}

export default Reminders
