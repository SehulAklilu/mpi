import { getMatches, getPlayers } from "@/api/match.api";
import { useRole } from "@/RoleContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { extractDateTime } from "@/lib/utils";
import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaTruck,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import { MdOutlineSportsTennis } from "react-icons/md";
import { GiTennisCourt } from "react-icons/gi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  CalendarIcon,
  CirclePlus,
  LoaderCircle,
  Plus,
  Trash,
  Trash2,
} from "lucide-react";
import {
  createTodo,
  deleteTodo,
  getDashboard,
  getRecentTodos,
  updateTodo,
} from "@/api/dashboard.api";
import {
  DashboardResponseData,
  Todo,
  TodoPayload,
} from "@/types/dashboard.type";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { getAxiosErrorMessage, getAxiosSuccessMessage } from "@/api/axios";
import { toast } from "react-toastify";
import DashboardByPlayer from "./DashboardByPlayer";
import ProfileCard from "../PendingMatch/ProfileCard";

function CoachDashboard() {
  const { role } = useRole();
  const type =
    role === "coach" ? "players" : role === "parent" ? "children" : "";
  const [selectedPlayer, setSelectedPlayer] = useState<string | undefined>(
    undefined
  );

  const {
    data: players,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["player"],
    queryFn: () => getPlayers(type),
  });

  const { data } = useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });

  const { data: dashboard, isLoading: dashboardIsLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboard,
  });

  const onPlayerSeleted = (value: string) => {
    setSelectedPlayer(value);
  };
  if (!dashboard) {
    return <>No Data Avalable</>;
  }
  return (
    <div className="px-4 md:px-14 pt-10 rounded-lg pb-[8rem] bg-white ">
      <div className="flex gap-4 mt-4 ">
        <Select onValueChange={onPlayerSeleted}>
          <SelectTrigger className="!w-full flex-1 h-12 !py-4">
            <SelectValue placeholder="Select Player" />
          </SelectTrigger>
          <SelectContent>
            {players?.players.map((player) => (
              <SelectItem value={player._id} key={player._id}>
                <div className="flex items-center gap-x-2">
                  <img
                    src={player.avatar}
                    className="w-8 h-8 rounded-full object-cover"
                    alt={`${player.firstName} ${player.lastName}`}
                  />
                  <p>
                    {player.firstName} {player.lastName}
                  </p>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={onPlayerSeleted}>
          <SelectTrigger className="!w-full flex-1  h-12 !py-4">
            <SelectValue placeholder="Select Match" />
          </SelectTrigger>
          <SelectContent>
            {data?.matches
              ?.filter((match) => match.status === "completed")
              .map((match) => (
                <SelectItem value={match._id} key={match._id}>
                  <div className="flex items-center gap-x-2">
                    {extractDateTime(match.date)?.date}
                  </div>
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Time Range */}

      {selectedPlayer ? (
        <DashboardByPlayer playerId={selectedPlayer} />
      ) : (
        <>
          <div className="my-8">
            <TimeRangeSelector />
          </div>

          {/* status cards */}
          <div className="my-8">
            <StatsCards reportData={dashboard} />
          </div>

          {/* weekly sessions graph */}
          <div className="my-8">
            <WeeklySessions reportData={dashboard} />
          </div>

          {/* Todos */}
          <div className="my-8">
            <TodoList />
          </div>

          {/* Top players */}
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {dashboard?.topPlayer && (
              <Card className="p-6 shadow-lg flex items-center">
                <CardContent className="p-0 w-full">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <img
                        src={dashboard?.topPlayer.avatar}
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                        alt="Top Player"
                      />
                      <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                          Top Player
                        </h1>
                        <p className="text-xl text-gray-600">
                          {dashboard?.topPlayer.firstName}{" "}
                          {dashboard?.topPlayer.lastName}
                        </p>
                      </div>
                    </div>
                    <div className="text-primary font-bold flex items-center gap-2 text-lg">
                      <FaStar className="text-yellow-500" /> MVP
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col items-center md:items-start">
              {dashboard?.upcomingMatch ? (
                <Card className="p-6 shadow-lg w-full">
                  <CardTitle className="text-2xl font-semibold mb-4 text-gray-800">
                    Next Upcoming Match
                  </CardTitle>
                  <CardContent className="p-0 w-full">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                      <ProfileCard
                        name={dashboard?.upcomingMatch?.p1Name}
                        isObject={dashboard?.upcomingMatch?.p1IsObject}
                        player={dashboard?.upcomingMatch?.p1}
                        showBorder={false}
                      />
                      <div className="px-5 py-4 text-3xl text-white font-bold bg-gradient-to-b from-orange-400 to-orange-600 rounded-xl shadow-md">
                        VS
                      </div>
                      <ProfileCard
                        name={dashboard?.upcomingMatch?.p2Name}
                        isObject={dashboard?.upcomingMatch?.p2IsObject}
                        player={dashboard?.upcomingMatch?.p2}
                        showBorder={false}
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="mt-4 text-center md:text-left text-gray-600 text-lg">
                  <p>No Upcoming Match Scheduled</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CoachDashboard;

export const TimeRangeSelector = () => {
  const [selected, setSelected] = useState("ALL");
  const options = ["ALL", "1W", "1M", "3M", "6M", "1Y"];

  return (
    <div className="flex space-x-2 p-2 bg-gray-100 w-fit rounded-lg">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => setSelected(option)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${
              selected === option
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

const StatsCards = ({ reportData }: { reportData: DashboardResponseData }) => {
  const stats = [
    {
      label: "Total Students",
      value: reportData?.totalPlayers ?? 0,
      icon: <FaUserGraduate className="text-blue-500 text-3xl" />,
    },
    {
      label: "Total Matches",
      value: reportData?.totalMatches ?? 0,
      icon: <MdOutlineSportsTennis className="text-green-500 text-3xl" />,
    },
    {
      label: "Total Sessions",
      value: reportData?.totalSessions ?? 0,
      icon: <GiTennisCourt className="text-red-500 text-3xl" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 shadow-md flex items-center space-x-4">
          {stat.icon}
          <CardContent className="p-0">
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const WeeklySessions = ({
  reportData,
}: {
  reportData: DashboardResponseData;
}) => {
  const data = [
    { day: "Monday", value: reportData.weeklySession.Monday },
    { day: "Tuesday", value: reportData.weeklySession.Tuesday },
    { day: "Wednesday", value: reportData.weeklySession.Wednesday },
    { day: "Thursday", value: reportData.weeklySession.Thursday },
    { day: "Friday", value: reportData.weeklySession.Friday },
    { day: "Saturday", value: reportData.weeklySession.Saturday },
    { day: "Sunday", value: reportData.weeklySession.Sunday },
  ];

  return (
    <Card className="p-4 shadow-md">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-lg font-bold mb-4">Weekly Sessions</h2>
        <h2 className="text-lg font-bold mb-4 text-primary">
          Total: {reportData?.totalSessions ?? 0} Sessions
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

const TodoList = () => {
  const { data: recentTodos } = useQuery({
    queryKey: ["RecentTodos"],
    queryFn: getRecentTodos,
  });
  const queryClient = useQueryClient();

  const createTodoMutaion = useMutation({
    mutationKey: ["createTodo"],
    mutationFn: createTodo,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries("RecentTodos");
      setOpen(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const updateTodoMutation = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: (variables: { todoId: string; payload: any }) =>
      updateTodo(variables.todoId, variables.payload),
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries("RecentTodos");
      setOpen(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const deleteTodoMuation = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: deleteTodo,
    onSuccess: (response) => {
      const message = getAxiosSuccessMessage(response);
      toast.success(message);
      queryClient.invalidateQueries("RecentTodos");
      setOpen(false);
    },
    onError: (error: any) => {
      const message = getAxiosErrorMessage(error);
      toast.error(message);
    },
  });

  const [newTodo, setNewTodo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);

  const handleAddTodo = () => {
    if (newTodo.trim() && selectedDate) {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      const payload: TodoPayload = {
        title: newTodo,
        timezone: timeZone,
        dueDate: selectedDate,
      };
      createTodoMutaion.mutate(payload);
    }
  };

  const onCheckBoxChange = (todo: Todo) => {
    const payload = { isCompleted: !todo.isCompleted };
    updateTodoMutation.mutate({ todoId: todo._id, payload });
  };

  return (
    <div className="p-4  mx-auto rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Todo List</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <CirclePlus className="w-8 h-8 bg-primary text-white rounded-full" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Todo</DialogTitle>
            </DialogHeader>
            <Input
              type="text"
              placeholder="Enter todo..."
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex gap-2 justify-start text-left font-normal border border-[#E5E5E5] items-center px-4 rounded-lg shadow !h-10 "
                >
                  <CalendarIcon />
                  {selectedDate ? (
                    format(selectedDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  //   disabled={(date) => {
                  //     const maxDate = new Date();
                  //     maxDate.setMonth(maxDate.getMonth() - 1);
                  //     return (
                  //       date > new Date() ||
                  //       date < new Date("1900-01-01") ||
                  //       date > maxDate
                  //     );
                  //   }}
                />
              </PopoverContent>
            </Popover>

            <Button
              className="bg-primary flex gap-2 items-center justify-center py-2 px-4 text-white rounded-lg"
              onClick={handleAddTodo}
            >
              Add
              {createTodoMutaion.isLoading && (
                <LoaderCircle
                  style={{
                    animation: "spin 1s linear infinite",
                    fontSize: "2rem",
                    color: "#FFFFFF",
                  }}
                />
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <ul>
        {recentTodos?.todos.map((todo) => (
          <div className="flex justify-between items-center">
            <li key={todo._id} className="flex items-center gap-2 py-1">
              <Checkbox
                checked={todo.isCompleted}
                onCheckedChange={() => onCheckBoxChange(todo)}
              />
              <span
                className={todo.isCompleted ? "line-through text-gray-500" : ""}
              >
                {todo.title}
              </span>
            </li>
            <Trash
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => deleteTodoMuation.mutate(todo._id)}
            />
          </div>
        ))}
        <div className="text-center text-primary cursor-pointer">Load More</div>
      </ul>
    </div>
  );
};
