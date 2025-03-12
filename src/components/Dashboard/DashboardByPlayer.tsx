import React, { useEffect, useMemo } from "react";
import { useState } from "react";
import { Check, TrendingUp } from "lucide-react";
import {
  Label,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TiDelete } from "react-icons/ti";
import { FaRegCheckCircle } from "react-icons/fa";
import { useQuery } from "react-query";
import {
  getDashboardByMatchId,
  getDashboardByPlayerId,
} from "@/api/dashboard.api";
import { TennisMatchStats } from "@/types/dashboard.type";
import { Skeleton } from "../ui/skeleton";

function DashboardByPlayer({
  playerId,
  matchId,
}: {
  playerId?: string;
  matchId?: string;
}) {
  const [selected, setSelected] = useState("Overview");
  const [selectedType, setSelectedType] = useState<
    "practice" | "tournament" | "all"
  >("all");
  const [returnPlacementFirstServe, setReturnPlacementFirstServe] =
    useState("First Serve");

  const [selectedMonth, setSelectedMonth] = useState(1);
  const options = [
    { label: "ALL", value: 12 },
    { label: "1M", value: 1 },
    { label: "3M", value: 3 },
    { label: "6M", value: 6 },
    { label: "1Y", value: 12 },
  ];

  const typeOptions: {
    label: string;
    value: "practice" | "tournament" | "all";
  }[] = [
    { label: "All", value: "all" },
    { label: "Practice", value: "practice" },
    { label: "Match", value: "tournament" },
  ];

  // const {
  //   data,
  //   isLoading: dashboardIsLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["getDashboardByPlayerId", playerId, selectedType, selectedMonth], // Include dependencies
  //   queryFn: () =>
  //     getDashboardByPlayerId(playerId, selectedMonth.toString(), selectedType),
  //   enabled: !!playerId,
  // });

  const {
    data,
    isLoading: dashboardIsLoading,
    refetch,
  } = useQuery({
    queryKey: ["getDashboard", playerId, matchId, selectedType, selectedMonth], // Updated key
    queryFn: () => {
      if (matchId && playerId) {
        return getDashboardByMatchId(
          playerId,
          matchId,
          selectedMonth.toString(),
          selectedType
        );
      }
      if (playerId) {
        return getDashboardByPlayerId(
          playerId,
          selectedMonth.toString(),
          selectedType
        );
      }
      return Promise.resolve(null);
    },
    enabled: !!playerId,
  });

  useEffect(() => {
    refetch();
  }, [selectedType, selectedMonth]);

  if (dashboardIsLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="flex flex-col space-y-4 min-h-[30rem] w-[80%] max-w-xl">
          <Skeleton className="h-full mt-6 w-full" />
        </div>
      </div>
    );
  }

  if (!data) {
    return <p>Data Not Avalable</p>;
  }
  return (
    <div>
      <div className="mt-6 flex justify-between flex-wrap items-center mb-2">
        <div className="flex space-x-2 sm:space-x-6 p-4">
          {typeOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="radio"
                value={option.value}
                checked={selectedType === option.value}
                onChange={() => setSelectedType(option.value)}
                className="hidden"
              />
              <div
                className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all
              ${
                selectedType === option.value
                  ? "border-primary bg-primary"
                  : "border-gray-400 bg-white"
              }`}
              >
                {selectedType === option.value && (
                  <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                )}
              </div>
              <span
                className={`text-sm font-medium transition-all ${
                  selectedType === option.value
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {option.label}
              </span>
            </label>
          ))}
        </div>
        <div className="flex space-x-2 overflow-x-auto p-2 w-fit rounded-lg">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelectedMonth(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
            ${
              selectedMonth === option.value
                ? "bg-primary text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="my-6">
        <div className="flex items-center overflow-x-auto gap-y-2 space-x-4 bg-gray-100 p-4 rounded-xl shadow-md">
          {["Overview", "Serves", "Points", "Return", "Rally"].map((option) => (
            <label
              key={option}
              className={`flex items-center justify-center cursor-pointer px-4 py-2 rounded-lg transition-all
            ${
              selected === option
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            >
              <input
                type="radio"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="hidden"
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {selected === "Overview" && (
        <>
          <div className="my-6 grid grid-cols-1  md:grid-cols-2 gap-4">
            <ChartComponent data={data} />
            <WinnersChart data={data} />
          </div>
          <div className="my-6">
            <ErrorsChart data={data} />
          </div>
          <div className="my-6">
            <LastShotAnalysis data={data} />
            {/* <BrakingPoints /> */}
          </div>
        </>
      )}
      {selected === "Serves" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FirstServePlacement data={data} type="first" />
            <FirstServePlacement data={data} type="second" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FirstServePlacement data={data} type="ace" />
            <ServeStats data={data} type="serve" />
          </div>
        </div>
      )}
      {selected === "Points" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <BrakingPoints data={data} />
            <FirstServePlacement data={data} type="gamePoint" />
          </div>
        </div>
      )}

      {selected === "Return" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <ServeStats data={data} type="return" />
          </div>
          <div className="flex items-center space-x-4 p-4 ">
            {["First Serve", "Second Serve"].map((option) => (
              <label
                key={option}
                className={`flex items-center justify-center cursor-pointer px-4 py-2 rounded-lg transition-all
            ${
              returnPlacementFirstServe === option
                ? "bg-primary text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
              >
                <input
                  type="radio"
                  value={option}
                  checked={returnPlacementFirstServe === option}
                  onChange={() => setReturnPlacementFirstServe(option)}
                  className="hidden"
                />
                {option}
              </label>
            ))}
          </div>
          <hr />
          <h1 className="text-2xl font-bold my-2">Return Placement</h1>
          {returnPlacementFirstServe === "First Serve" ? (
            <div className="grid grid-cols-1 md:grid-cols-3">
              <ReturnPlacement data={data} type="firstServe" />
              <ReturnPlacement data={data} type="firstServeForehand" />
              <ReturnPlacement data={data} type="firstServeBackhand" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3">
              <ReturnPlacement data={data} type="secondServe" />
              <ReturnPlacement data={data} type="secondServeForehand" />
              <ReturnPlacement data={data} type="secondServeBackhand" />
            </div>
          )}
        </div>
      )}

      {selected === "Rally" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <FirstServePlacement data={data} type="rally" />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardByPlayer;

const ChartComponent = ({ data }: { data: TennisMatchStats }) => {
  const [selected, setSelected] = useState("Points");

  const chartData = [
    {
      browser: "pointsWon",
      totalPoint:
        selected === "Percentage"
          ? data?.points.p1.wonPercentage * 100
          : data?.points.p1.won,
      fill: "#8884d8",
    },
    {
      browser: "pointsLost",
      totalPoint:
        selected === "Percentage"
          ? data?.points.p2.wonPercentage * 100
          : data?.points.p2.won,

      fill: "#F8B36D",
    },
  ];
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalPoint, 0);
  }, [selected, data]);

  const chartConfig = {
    totalPoint: {
      label: "Total Point",
    },
    pointsWon: {
      label: "Points Won",
      color: "hsl(var(--chart-1))",
    },
    pointsLost: {
      label: "Points Lost",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col justify-center flex-1 border p-4 rounded-3xl bg-white shadow-lg">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold my-2">
          Point Distribution
        </CardTitle>
        <CardTitle className="text-sm text-green-500 text-center font-semibold">
          Total Points
        </CardTitle>
        <CardDescription className="text-xl text-green-700 text-center font-bold">
          Total : {data?.points.total}
        </CardDescription>

        <div className="flex text-center justify-center">
          <button
            className={`px-4 py-2 border ${
              selected === "Percentage"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            } border-r-0 rounded-l-3xl`}
            onClick={() => setSelected("Percentage")}
          >
            Percentage
          </button>
          <button
            className={`px-4 py-2 border ${
              selected === "Points"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            } rounded-r-3xl`}
            onClick={() => setSelected("Points")}
          >
            Points
          </button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 w-full mx-auto  pb-0">
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer
              config={chartConfig}
              className=" aspect-square min-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="totalPoint"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {totalVisitors.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Total Points
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 text-sm shadow-md rounded-md border">
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center bg-green-50 rounded-md">
              <FaRegCheckCircle className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-800 text-lg">Won</p>
              <p className="text-600">{data?.points.p1.won} Points</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-50 rounded-md flex items-center justify-center ">
              <TiDelete className="text-red-600" size={30} />
            </div>
            <div>
              <p className="text-gray-800 text-lg">Lost</p>
              <p className="text-600">{data?.points.p2.won} Points</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const WinnersChart = ({ data: dashboard }: { data: TennisMatchStats }) => {
  const data = [
    {
      name: "Forehand",
      value: dashboard?.winners.p1.forehand,
      color: "#8884d8",
    },
    {
      name: "Return Forehand",
      value: dashboard?.winners.p1.returnForehand,
      color: "#e3e3fd",
    },
    {
      name: "Backhand",
      value: dashboard?.winners.p1.backhand,
      color: "#F2851C",
    },
    {
      name: "Return Backhand",
      value: dashboard?.winners.p1.returnBackhand,
      color: "#F2851C",
    },
  ];
  const totalWinners = useMemo(
    () => data.reduce((acc, curr) => acc + curr.value, 0),
    [data]
  );
  const [selected, setSelected] = useState("Percentage");

  return (
    <Card className="flex flex-col flex-1 justify-around border px-4 rounded-3xl bg-white shadow-lg">
      <h1 className="text-2xl font-bold">Winners</h1>
      <CardHeader className="space-y-2 text-center">
        <CardTitle className="text-sm text-blue-500 font-semibold">
          Total Winners
        </CardTitle>
        <p className="text-2xl font-bold text-blue-700">
          Total: {dashboard?.winners.total}
        </p>
        {/* <p className="text-sm text-blue-400">Win Rate: 213%</p> */}
      </CardHeader>

      <CardContent className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col w-full sm:flex-row items-center space-x-4">
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  strokeWidth={5}
                  outerRadius={100}
                  fill="#82ca9d"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-left text-sm">
            <p className="font-semibold">Shot Types</p>
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <p>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full text-sm">
          {data.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg p-2 flex justify-between items-center"
            >
              <span className="flex items-center space-x-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></span>
                <p>{item.name}</p>
              </span>
              <p className="font-bold">{item.value} points</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const ErrorsChart = ({ data }: { data: TennisMatchStats }) => {
  const chartDataForced = [
    {
      type: "Forced Errors",
      count: data.errorss.p1.forced.percentage,
      fill: "#FF6B6B",
    },
  ];

  const chartDataUnforced = [
    {
      type: "Unforced Errors",
      count: data.errorss.p1.unforced.percentage,
      fill: "#FF6B6B",
    },
  ];

  const totalErrorsForced = useMemo(() => {
    return chartDataForced.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartDataForced]);

  const totalErrorsUnForced = useMemo(() => {
    return chartDataUnforced.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartDataUnforced]);
  return (
    <div className="flex flex-col w-full items-center space-y-4  ">
      <Card className="w-full  p-4 shadow-lg rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold my-2">Errors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col w-full  items-center">
          <div className="grid grid-cols-1 w-full  md:grid-cols-2">
            <div>
              <h1 className="text-xl text-center font-semibold my-2">
                Forced Error
              </h1>
              <div className="w-full  h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartDataForced}
                      dataKey="count"
                      nameKey="type"
                      innerRadius={60}
                      strokeWidth={5}
                      outerRadius={100}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox?.cx}
                                y={viewBox?.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-3xl font-bold"
                              >
                                {totalErrorsForced}
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div>
              <h1 className="text-xl text-center font-semibold my-2">
                Unforced Error
              </h1>
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartDataUnforced}
                      dataKey="count"
                      nameKey="type"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text
                                x={viewBox?.cx}
                                y={viewBox?.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-3xl font-bold"
                              >
                                {totalErrorsUnForced}
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full text-xs">
            <Card className="p-4 bg-blue-100 border border-blue-300 rounded-xl">
              <CardTitle className="text-blue-500 font-bold">
                Forehand Details
              </CardTitle>
              <CardContent>
                <p>Volley: {data.errorss.p1.forced.forehand.volley}</p>
                <p>Slice: {data.errorss.p1.forced.forehand.slice}</p>
                <p>
                  Swinging Volley:{" "}
                  {data.errorss.p1.forced.forehand?.swingingVolley ?? 0}
                </p>
                <p>
                  Drop Shot: {data.errorss.p1.forced.forehand?.dropShot ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-green-100 border border-green-300 rounded-xl">
              <CardTitle className="text-green-500 font-bold">
                Backhand Details
              </CardTitle>
              <CardContent>
                <p>Volley: {data.errorss.p1.forced.backhand.volley}</p>
                <p>Slice: {data.errorss.p1.forced.backhand.slice}</p>
                <p>
                  Swinging Volley:{" "}
                  {data.errorss.p1.forced.backhand?.swingingVolley ?? 0}
                </p>
                <p>
                  Drop Shot: {data.errorss.p1.forced.backhand?.dropShot ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-red-100 border border-red-300 rounded-xl">
              <CardTitle className="text-red-500 font-bold">
                Forehand Details
              </CardTitle>
              <CardContent>
                <p>Volley: {data.errorss.p1.unforced.forehand.volley}</p>
                <p>Slice: {data.errorss.p1.unforced.forehand.slice}</p>
                <p>
                  Swinging Volley:{" "}
                  {data.errorss.p1.unforced.forehand?.swingingVolley ?? 0}
                </p>
                <p>
                  Drop Shot: {data.errorss.p1.unforced.forehand?.dropShot ?? 0}
                </p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-yellow-100 border border-yellow-300 rounded-xl">
              <CardTitle className="text-yellow-500 font-bold">
                Backhand Details
              </CardTitle>
              <CardContent>
                <p>Volley: {data.errorss.p1.unforced.backhand.volley}</p>
                <p>Slice: {data.errorss.p1.unforced.backhand.slice}</p>
                <p>
                  Swinging Volley:{" "}
                  {data.errorss.p1.unforced.backhand?.swingingVolley ?? 0}
                </p>
                <p>
                  Drop Shot: {data.errorss.p1.unforced.backhand?.dropShot ?? 0}
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LastShotAnalysis = ({ data }: { data: TennisMatchStats }) => {
  const chartData = [
    {
      browser: "win",
      visitors: data.lastShot.p1.winPercentage,
      fill: "#8884d8",
    },
    {
      browser: "lose",
      visitors: data.lastShot.p1.losePercentage,
      fill: "#82ca9d",
    },
  ];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    win: {
      label: "Win",
      color: "hsl(var(--chart-1))",
    },
    lose: {
      label: "Lose",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col flex-1 justify-around  border px-4 rounded-xl bg-white shadow-lg">
      <h1 className="text-2xl font-bold">Last Shot Analysis</h1>
      <CardHeader className="space-y-2 text-center"></CardHeader>

      <CardContent className=" gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

const BrakingPoints = ({ data }: { data: TennisMatchStats }) => {
  const chartData = [
    { browser: "saved", visitors: data.breakPoints.p1.saved, fill: "#F28822" },
    {
      browser: "converted",
      visitors: data.breakPoints.p1.converted,
      fill: "#8884d8",
    },
  ];

  const savedPercentage = data.breakPoints.p1.total
    ? ((data.breakPoints.p1.saved / data.breakPoints.p1.total) * 100).toFixed(2)
    : "0";

  const convertedPercentage = data.breakPoints.p1.total
    ? (
        (data.breakPoints.p1.converted / data.breakPoints.p1.total) *
        100
      ).toFixed(2)
    : "0";
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    saved: {
      label: "Saved",
      color: "hsl(var(--chart-1))",
    },
    converted: {
      label: "Converted",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="flex flex-col flex-1 justify-around ">
      <h1 className="text-2xl font-bold">Average Rally</h1>
      <CardHeader className="space-y-2 text-center"></CardHeader>

      <CardContent className=" gap-4">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie data={chartData} dataKey="visitors" />
            <ChartLegend
              content={<ChartLegendContent nameKey="browser" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div>
          <h1 className="font-semibold my-1 px-4">Statistics</h1>
          <p className="text-sm px-4 py-1 text-[#F28822] bg-[#fff2e6] font-semibold my-1 rounded-lg w-fit">
            Break Points Saved:{" "}
            <span className="font-semibold">{savedPercentage}%</span>
          </p>
          <p className="text-sm px-4 py-1 text-[#8884d8] bg-[rgb(234,233,255)] font-semibold my-1 rounded-lg w-fit">
            Break Points Converted:{" "}
            <span className="font-semibold">{convertedPercentage}%</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export function FirstServePlacement({
  data,
  type,
}: {
  data: TennisMatchStats;
  type: "first" | "second" | "ace" | "gamePoint" | "rally";
}) {
  const total =
    type === "first"
      ? data.firstServePlacement.p1.wide +
        data.firstServePlacement.p1.body +
        data.firstServePlacement.p1.t +
        data.firstServePlacement.p1.net
      : type === "second"
      ? data.secondServePlacement.p1.wide +
        data.secondServePlacement.p1.body +
        data.secondServePlacement.p1.t +
        data.secondServePlacement.p1.net
      : type === "ace"
      ? data.acesPlacement.p1.wide +
        data.acesPlacement.p1.body +
        data.acesPlacement.p1.t +
        data.acesPlacement.p1.net
      : type === "gamePoint"
      ? data.gamePoints.p1.total
      : data.rallyLengthFrequency.oneToFour +
        data.rallyLengthFrequency.fiveToEight +
        data.rallyLengthFrequency.nineToTwelve +
        data.rallyLengthFrequency.thirteenToTwenty +
        data.rallyLengthFrequency.twentyOnePlus;

  const serveData =
    type === "first"
      ? [
          {
            category: "Wide",
            percentage: (data.firstServePlacement.p1.wide / total) * 100,
          },
          {
            category: "Body",
            percentage: (data.firstServePlacement.p1.body / total) * 100,
          },
          {
            category: "T",
            percentage: (data.firstServePlacement.p1.t / total) * 100,
          },
          {
            category: "Net",
            percentage: (data.firstServePlacement.p1.net / total) * 100,
          },
        ]
      : type === "second"
      ? [
          {
            category: "Wide",
            percentage: (data.secondServePlacement.p1.wide / total) * 100,
          },
          {
            category: "Body",
            percentage: (data.secondServePlacement.p1.body / total) * 100,
          },
          {
            category: "T",
            percentage: (data.secondServePlacement.p1.t / total) * 100,
          },
          {
            category: "Net",
            percentage: (data.secondServePlacement.p1.net / total) * 100,
          },
        ]
      : type === "ace"
      ? [
          {
            category: "Wide",
            percentage: (data.acesPlacement.p1.wide / total) * 100,
          },
          {
            category: "Body",
            percentage: (data.acesPlacement.p1.body / total) * 100,
          },
          {
            category: "T",
            percentage: (data.acesPlacement.p1.t / total) * 100,
          },
          {
            category: "Net",
            percentage: (data.acesPlacement.p1.net / total) * 100,
          },
        ]
      : type === "gamePoint"
      ? [
          {
            category: "Saved",
            percentage: (data.gamePoints.p1.saved / total) * 100,
          },
          {
            category: "Converted",
            percentage: (data.gamePoints.p1.converted / total) * 100,
          },
        ]
      : [
          {
            category: "1 - 4",
            percentage: (data.rallyLengthFrequency.oneToFour / total) * 100,
          },
          {
            category: "5 - 8",
            percentage: (data.rallyLengthFrequency.fiveToEight / total) * 100,
          },
          {
            category: "9 - 12",
            percentage: (data.rallyLengthFrequency.nineToTwelve / total) * 100,
          },
          {
            category: "13 - 20",
            percentage:
              (data.rallyLengthFrequency.thirteenToTwenty / total) * 100,
          },
          {
            category: "20+",
            percentage: (data.rallyLengthFrequency.twentyOnePlus / total) * 100,
          },
        ];

  const chartConfig = {
    totalPoint: {
      label: "Total Point",
      color: "hsl(var(--chart-2))",
    },
    pointsWon: {
      label: "Points Won",
      color: "hsl(var(--chart-1))",
    },
    pointsLost: {
      label: "Points Lost",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold my-2">
          {type === "first"
            ? "First Serve Placement"
            : type === "second"
            ? "Second Serve Placement"
            : type === "ace"
            ? "Aces Placement"
            : type === "gamePoint"
            ? "Game Points"
            : "Rally Length"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={serveData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="category" tickLine={false} axisLine={false} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(tick) => `${tick}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="percentage" fill="hsl(var(--chart-1))" radius={1} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ServeStats({
  data,
  type,
}: {
  data: TennisMatchStats;
  type: "return" | "serve";
}) {
  const chartData =
    type === "serve"
      ? [
          { serveType: "First Serve", count: data?.serves.p1?.firstServe ?? 0 },
          {
            serveType: "First Serve Won",
            count: data?.serves.p1.firstServesWon,
          },
          {
            serveType: "First Serve Lost",
            count: data?.serves.p1.firstServesLost,
          },
          {
            serveType: "Second Serve",
            count: data?.serves.p1?.secondServe ?? 0,
          },
          {
            serveType: "Second Serve Won",
            count: data?.serves.p1.secondServesWon,
          },
          {
            serveType: "Second Serve Lost",
            count: data?.serves.p1.secondServesLost,
          },
        ]
      : [
          {
            serveType: "First Serve",
            count: data?.returnStats.p1?.firstServe ?? 0,
          },
          {
            serveType: "First Serve Won",
            count: data?.returnStats.p1?.firstServeWon ?? 0,
          },
          {
            serveType: "First Serve Lost",
            count: data?.returnStats.p1?.firstServeLost ?? 0,
          },
          {
            serveType: "Second Serve",
            count: data?.returnStats.p1?.secondServe ?? 0,
          },
          {
            serveType: "Second Serve Won",
            count: data?.returnStats.p1?.secondServeWon ?? 0,
          },
          {
            serveType: "Second Serve Lost",
            count: data?.returnStats.p1?.secondServeLost ?? 0,
          },
        ];

  const chartConfig = {
    serveType: {
      label: "Serve Type",
      color: "hsl(var(--chart-1))",
    },
    count: {
      label: "Count",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;
  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-2xl font-bold my-2">
          {type === "serve" ? "Serves Chart" : "Return Stats"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="serveType"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              type="number"
              domain={[0, 100]} // Range from 0 to 100 as requested
              tickCount={6} // To show tick marks from 0, 20, 40, ... 100
              tickFormatter={(tick) => `${tick}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="#F28822"
              strokeWidth={2}
              dot={false} // No dots for each data point
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing serve stats for Player 1
        </div>
      </CardFooter> */}
    </Card>
  );
}

export function ReturnPlacement({
  data,
  type,
}: {
  data: TennisMatchStats;
  type:
    | "firstServe"
    | "firstServeForehand"
    | "firstServeBackhand"
    | "secondServe"
    | "secondServeForehand"
    | "secondServeBackhand";
}) {
  const total =
    type === "firstServe"
      ? data.returnPlacement.p1.firstServe.wide +
        data.returnPlacement.p1.firstServe.body +
        data.returnPlacement.p1.firstServe.t +
        data.returnPlacement.p1.firstServe.net
      : type === "firstServeForehand"
      ? data.returnPlacement.p1.firstServeForehand.wide +
        data.returnPlacement.p1.firstServeForehand.body +
        data.returnPlacement.p1.firstServeForehand.t +
        data.returnPlacement.p1.firstServeForehand.net
      : type === "firstServeBackhand"
      ? data.returnPlacement.p1.firstServeBackhand.wide +
        data.returnPlacement.p1.firstServeBackhand.body +
        data.returnPlacement.p1.firstServeBackhand.t +
        data.returnPlacement.p1.firstServeBackhand.net
      : type === "secondServe"
      ? data.returnPlacement.p1.secondServe.wide +
        data.returnPlacement.p1.secondServe.body +
        data.returnPlacement.p1.secondServe.t +
        data.returnPlacement.p1.secondServe.net
      : type === "secondServeForehand"
      ? data.returnPlacement.p1.secondServeForehand.wide +
        data.returnPlacement.p1.secondServeForehand.body +
        data.returnPlacement.p1.secondServeForehand.t +
        data.returnPlacement.p1.secondServeForehand.net
      : data.returnPlacement.p1.secondServeBackhand.wide +
        data.returnPlacement.p1.secondServeBackhand.body +
        data.returnPlacement.p1.secondServeBackhand.t +
        data.returnPlacement.p1.secondServeBackhand.net;

  const serveData =
    type === "firstServe"
      ? [
          {
            category: "Wide",
            percentage: (data.returnPlacement.p1.firstServe.wide / total) * 100,
          },
          {
            category: "Body",
            percentage: (data.returnPlacement.p1.firstServe.body / total) * 100,
          },
          {
            category: "T",
            percentage: (data.returnPlacement.p1.firstServe.t / total) * 100,
          },
          {
            category: "Net",
            percentage: (data.returnPlacement.p1.firstServe.net / total) * 100,
          },
        ]
      : type === "firstServeForehand"
      ? [
          {
            category: "Wide",
            percentage:
              (data.returnPlacement.p1.firstServeForehand.wide / total) * 100,
          },
          {
            category: "Body",
            percentage:
              (data.returnPlacement.p1.firstServeForehand.body / total) * 100,
          },
          {
            category: "T",
            percentage:
              (data.returnPlacement.p1.firstServeForehand.t / total) * 100,
          },
          {
            category: "Net",
            percentage:
              (data.returnPlacement.p1.firstServeForehand.net / total) * 100,
          },
        ]
      : type === "firstServeBackhand"
      ? [
          {
            category: "Wide",
            percentage:
              (data.returnPlacement.p1.firstServeBackhand.wide / total) * 100,
          },
          {
            category: "Body",
            percentage:
              (data.returnPlacement.p1.firstServeBackhand.body / total) * 100,
          },
          {
            category: "T",
            percentage:
              (data.returnPlacement.p1.firstServeBackhand.t / total) * 100,
          },
          {
            category: "Net",
            percentage:
              (data.returnPlacement.p1.firstServeBackhand.net / total) * 100,
          },
        ]
      : type === "secondServe"
      ? [
          {
            category: "Wide",
            percentage:
              (data.returnPlacement.p1.secondServe.wide / total) * 100,
          },
          {
            category: "Body",
            percentage:
              (data.returnPlacement.p1.secondServe.body / total) * 100,
          },
          {
            category: "T",
            percentage: (data.returnPlacement.p1.secondServe.t / total) * 100,
          },
          {
            category: "Net",
            percentage: (data.returnPlacement.p1.secondServe.net / total) * 100,
          },
        ]
      : type === "secondServeForehand"
      ? [
          {
            category: "Wide",
            percentage:
              (data.returnPlacement.p1.secondServeForehand.wide / total) * 100,
          },
          {
            category: "Body",
            percentage:
              (data.returnPlacement.p1.secondServeForehand.body / total) * 100,
          },
          {
            category: "T",
            percentage:
              (data.returnPlacement.p1.secondServeForehand.t / total) * 100,
          },
          {
            category: "Net",
            percentage:
              (data.returnPlacement.p1.secondServeForehand.net / total) * 100,
          },
        ]
      : [
          {
            category: "Wide",
            percentage:
              (data.returnPlacement.p1.secondServeBackhand.wide / total) * 100,
          },
          {
            category: "Body",
            percentage:
              (data.returnPlacement.p1.secondServeBackhand.body / total) * 100,
          },
          {
            category: "T",
            percentage:
              (data.returnPlacement.p1.secondServeBackhand.t / total) * 100,
          },
          {
            category: "Net",
            percentage:
              (data.returnPlacement.p1.secondServeBackhand.net / total) * 100,
          },
        ];

  const chartConfig = {
    totalPoint: {
      label: "Total Point",
      color: "hsl(var(--chart-2))",
    },
    pointsWon: {
      label: "Points Won",
      color: "hsl(var(--chart-1))",
    },
    pointsLost: {
      label: "Points Lost",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  return (
    <Card className="">
      <CardHeader>
        <CardTitle className="text-xl font-medium my-2">
          {type === "firstServe"
            ? "First Serve"
            : type === "firstServeForehand"
            ? "First Serve Forehand"
            : type === "firstServeBackhand"
            ? "First Serve Backhand"
            : type === "secondServe"
            ? "Second Serve"
            : type === "secondServeForehand"
            ? "Second Serve Forehand"
            : "Second Serve Backhand"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={serveData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="category" tickLine={false} axisLine={false} />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              tickFormatter={(tick) => `${tick}%`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="percentage" fill="hsl(var(--chart-1))" radius={1} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
