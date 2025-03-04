import React, { useMemo } from "react";
import { useState } from "react";
import { Check, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Tooltip, Cell } from "recharts";

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

function DashboardByPlayer({ playerId }: { playerId: string }) {
  console.log("ddddddddd", playerId);
  return (
    <div>
      <div className="my-6">
        <RadioButtonGroup />
      </div>
      {/* <div className="mt-2">
        <TimeRangeSelector />
      </div> */}
      <div className="my-6">
        <MenuGroup />
      </div>

      <div className="my-6 flex  gap-4">
        <ChartComponent />
        <WinnersChart />
      </div>

      <div className="my-6 flex gap-4">
        <ErrorsChart />
      </div>

      <div className="my-6 flex gap-4">
        <LastShotAnalysis />
        <AverageRally />
      </div>
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

const ChartComponent = () => {
  const chartData = [
    { browser: "pointsWon", visitors: 275, fill: "#8884d8" },
    { browser: "pointsLost", visitors: 200, fill: "#F8B36D" },
  ];
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
  }, []);

  const chartConfig = {
    visitors: {
      label: "Visitors",
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
  const [selected, setSelected] = useState("Percentage");

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
          Total : 1000
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
              dataKey="visitors"
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
                          Visitors
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
              <p className="text-600">478 Points</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-red-50 rounded-md flex items-center justify-center ">
              <TiDelete className="text-red-600" size={30} />
            </div>
            <div>
              <p className="text-gray-800 text-lg">Lost</p>
              <p className="text-600">78 Points</p>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const WinnersChart = () => {
  const data = [
    { name: "Forehand", value: 1, color: "#8884d8" },
    { name: "Total", value: 1, color: "#F8B36D" },
    { name: "Return Forehand", value: 1, color: "#e3e3fd" },
    { name: "Backhand", value: 1, color: "#F2851C" },
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
          Total: {totalWinners}
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

const ErrorsChart = () => {
  const chartData = [
    { type: "Forced Errors", count: 150, fill: "#FF6B6B" },
    { type: "Unforced Errors", count: 100, fill: "#FFD93D" },
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
                <p>Volley: 0</p>
                <p>Slice: 0</p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-red-100 border border-red-300 rounded-xl">
              <CardTitle className="text-red-500 font-bold">
                Forehand Details
              </CardTitle>
              <CardContent>
                <p>Volley: 0</p>
                <p>Slice: 0</p>
                <p>Swinging Volley: 0</p>
                <p>Drop Shot: 0</p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-green-100 border border-green-300 rounded-xl">
              <CardTitle className="text-green-500 font-bold">
                Backhand Details
              </CardTitle>
              <CardContent>
                <p>Volley: 0</p>
                <p>Slice: 0</p>
              </CardContent>
            </Card>

            <Card className="p-4 bg-yellow-100 border border-yellow-300 rounded-xl">
              <CardTitle className="text-yellow-500 font-bold">
                Backhand Details
              </CardTitle>
              <CardContent>
                <p>Volley: 0</p>
                <p>Slice: 0</p>
                <p>Swinging Volley: 0</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const LastShotAnalysis = () => {
  const chartData = [{ browser: "win", visitors: 275, fill: "#8884d8" }];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    win: {
      label: "Win",
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

const AverageRally = () => {
  const chartData = [{ browser: "win", visitors: 275, fill: "#F28822" }];
  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    win: {
      label: "Win",
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
    </Card>
  );
};
