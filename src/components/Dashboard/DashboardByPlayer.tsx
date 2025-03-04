import React, { useMemo } from "react";
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
import { getDashboardByPlayerId } from "@/api/dashboard.api";
import { TennisMatchStats } from "@/types/dashboard.type";

function DashboardByPlayer({ playerId }: { playerId: string }) {
  const [selected, setSelected] = useState("Overview");

  const { data, isLoading: dashboardIsLoading } = useQuery({
    queryKey: ["getDashboardByPlayerId", playerId],
    queryFn: () => getDashboardByPlayerId(playerId),
  });
  if (!data) {
    return <p>Data Not Avalable</p>;
  }
  return (
    <div>
      <div className="my-6">
        <RadioButtonGroup />
      </div>
      {/* <div className="mt-2">
        <TimeRangeSelector />
      </div> */}
      <div className="my-6">
        <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl shadow-md">
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
          <div className="my-6 flex  gap-4">
            <ChartComponent data={data} />
            <WinnersChart data={data} />
          </div>
          <div className="my-6 flex gap-4">
            <ErrorsChart data={data} />
          </div>
          <div className="my-6 flex gap-4">
            <LastShotAnalysis data={data} />
            {/* <BrakingPoints /> */}
          </div>
        </>
      )}
      {selected === "Serves" && (
        <div>
          <div className="grid grid-cols-2">
            <FirstServePlacement data={data} type="first" />
            <FirstServePlacement data={data} type="second" />
          </div>
          <div className="grid grid-cols-2">
            <FirstServePlacement data={data} type="ace" />
            <ServeStats data={data} />
          </div>
        </div>
      )}
      {selected === "Points" && (
        <div>
          <div className="grid grid-cols-2">
            <BrakingPoints data={data} />
            <FirstServePlacement data={data} type="gamePoint" />
          </div>
        </div>
      )}

      {selected === "Rally" && (
        <div>
          <div className="grid grid-cols-2">
            <FirstServePlacement data={data} type="rally" />
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardByPlayer;

const MenuGroup = () => {
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-xl shadow-md">
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
  );
};

const RadioButtonGroup = () => {
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex space-x-6 p-4">
      {["All", "Practice", "Match"].map((option) => (
        <label
          key={option}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <input
            type="radio"
            value={option}
            checked={selected === option}
            onChange={() => setSelected(option)}
            className="hidden"
          />
          <div
            className={`w-5 h-5 flex items-center justify-center rounded-full border-2 transition-all
              ${
                selected === option
                  ? "border-primary bg-primary"
                  : "border-gray-400 bg-white"
              }`}
          >
            {selected === option && (
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            )}
          </div>
          <span
            className={`text-sm font-medium transition-all ${
              selected === option ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  );
};

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
      <CardContent className="flex-1 mx-auto  pb-0">
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
    { name: "Total", value: dashboard?.winners.total, color: "#F8B36D" },
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
        <p className="text-sm text-blue-400">Win Rate: 213%</p>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-4">
        <div className="flex items-center space-x-4">
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

          <PieChart width={250} height={250}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              fill="#82ca9d"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full text-sm">
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
  const chartData = [
    {
      type: "Forced Errors",
      count: data.errorss.p1.forced.percentage,
      fill: "#FF6B6B",
    },
    {
      type: "Unforced Errors",
      count: data.errorss.p1.unforced.percentage,
      fill: "#FFD93D",
    },
  ];

  const totalErrors = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <div className="flex flex-col w-full items-center space-y-4  ">
      <Card className="w-full  p-4 shadow-lg rounded-xl bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold my-2">Errors</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="flex justify-around">
            <div>
              <h1 className="text-xl text-center font-semibold my-2">
                Forced Error
              </h1>
              <PieChart width={350} height={350}>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="type"
                  innerRadius={60}
                  strokeWidth={5}
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
                            {totalErrors}
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </div>
            <div>
              <h1 className="text-xl text-center font-semibold my-2">
                Unforced Error
              </h1>
              <PieChart width={350} height={350}>
                <Pie
                  data={chartData}
                  dataKey="count"
                  nameKey="type"
                  innerRadius={60}
                  strokeWidth={5}
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
                            {totalErrors}
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 w-full text-xs">
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
    <Card className="flex flex-col flex-1 justify-around  border px-4 rounded-xl bg-white shadow-lg">
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
          <h1 className="text-lg">Statistics</h1>
          <p className="text-sm">
            Break Points Saved:{" "}
            <span className="font-semibold">{savedPercentage}%</span>
          </p>
          <p className="text-sm">
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

export function ServeStats({ data }: { data: TennisMatchStats }) {
  const chartData = [
    // { serveType: "First Serve", count: data?.serves.p1. },
    { serveType: "First Serve Won", count: data?.serves.p1.firstServesWon },
    { serveType: "First Serve Lost", count: data?.serves.p1.firstServesLost },
    // { serveType: "Second Serve", count: 0 },
    { serveType: "Second Serve Won", count: data?.serves.p1.secondServesWon },
    { serveType: "Second Serve Lost", count: data?.serves.p1.secondServesLost },
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
        <CardTitle>Serves Chart</CardTitle>
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
