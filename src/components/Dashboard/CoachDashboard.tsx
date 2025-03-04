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
import { Card, CardContent } from "@/components/ui/card";
import {
  FaUserGraduate,
  FaUsers,
  FaChalkboardTeacher,
  FaTruck,
  FaTrash,
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
  getRecentTodos,
  updateTodo,
} from "@/api/dashboard.api";
import { Todo, TodoPayload } from "@/types/dashboard.type";
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

  const onPlayerSeleted = (value: string) => {
    setSelectedPlayer(value);
  };
  return (
    <div className="px-14 mb-[8rem]">
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
          <div className="mt-2">
            <TimeRangeSelector />
          </div>

          {/* status cards */}
          <div className="mt-2">
            <StatsCards />
          </div>

          {/* weekly sessions graph */}
          <div className="mt-2">
            <WeeklySessions />
          </div>

          {/* Todos */}
          <div className="mt-2">
            <TodoList />
          </div>

          <div className="mt-2">
            <p>No Upcoming Match Scheduled</p>
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

const StatsCards = () => {
  const stats = [
    {
      label: "Total Students",
      value: 1200,
      icon: <FaUserGraduate className="text-blue-500 text-3xl" />,
    },
    {
      label: "Total Matches",
      value: 450,
      icon: <MdOutlineSportsTennis className="text-green-500 text-3xl" />,
    },
    {
      label: "Total Sessions",
      value: 320,
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

const WeeklySessions = () => {
  const data = [
    { day: "Monday", value: 30 },
    { day: "Tuesday", value: 50 },
    { day: "Wednesday", value: 40 },
    { day: "Thursday", value: 70 },
    { day: "Friday", value: 60 },
    { day: "Saturday", value: 90 },
    { day: "Sunday", value: 80 },
  ];

  return (
    <Card className="p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Weekly Sessions</h2>
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
