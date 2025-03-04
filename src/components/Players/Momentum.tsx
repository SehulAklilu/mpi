import { Game, Match, Set } from "@/types/match.type";
import * as Tabs from "@radix-ui/react-tabs";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SetsTabsProps {
  sets: Set[];
  onSetChange: (setIndex: number | "all") => void;
}

export const SetsTabs: React.FC<SetsTabsProps> = ({ sets, onSetChange }) => {
  return (
    <Tabs.Root
      defaultValue="all"
      onValueChange={(value) =>
        onSetChange(value === "all" ? "all" : Number(value))
      }
    >
      <Tabs.List className="flex space-x-2 mb-4">
        <Tabs.Trigger
          value="all"
          className="px-4 py-2 bg-gray-200 rounded-lg data-[state=active]:bg-[#F2851C] data-[state=active]:text-white"
        >
          All Sets
        </Tabs.Trigger>
        {sets.map((set, index) => (
          <Tabs.Trigger
            key={set._id}
            value={index.toString()}
            className="px-4 py-2 bg-gray-200 rounded-lg data-[state=active]:bg-[#F2851C] data-[state=active]:text-white"
          >
            Set {index + 1}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

interface GamesTabsProps {
  games: Game[];
  onGameChange: (gameIndex: number | "all") => void;
}

export const GamesTabs: React.FC<GamesTabsProps> = ({
  games,
  onGameChange,
}) => {
  return (
    <Tabs.Root
      defaultValue="all"
      onValueChange={(value) =>
        onGameChange(value === "all" ? "all" : Number(value))
      }
    >
      <Tabs.List className="flex space-x-2 mb-4">
        <Tabs.Trigger
          value="all"
          className="px-4 py-2 bg-gray-200 rounded-lg data-[state=active]:bg-[#F2851C] data-[state=active]:text-white"
        >
          All Games
        </Tabs.Trigger>
        {games.map((game, index) => (
          <Tabs.Trigger
            key={game._id}
            value={index.toString()}
            className="px-4 py-2 bg-gray-200 rounded-lg data-[state=active]:bg-[#F2851C] data-[state=active]:text-white"
          >
            Game {index + 1}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
};

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface LineChartProps {
  data: { name: string; p1Score: number; p2Score: number }[];
}

export const ScoreLineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <LineChart width={1000} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis ticks={[0, 15, 30, 40]} />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="p1Score"
        stroke="#8884d8"
        name="Player 1"
      />
      <Line
        type="monotone"
        dataKey="p2Score"
        stroke="#82ca9d"
        name="Player 2"
      />
    </LineChart>
  );
};

import React, { useState } from "react";

interface MatchDetailsProps {
  match: Match;
}

export const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
  const [selectedSetIndex, setSelectedSetIndex] = useState<"all" | number>(
    "all"
  );
  //   const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const [selectedGameIndex, setSelectedGameIndex] = useState<number | "all">(
    "all"
  );

  // Get the selected set or all sets
  const selectedSet =
    selectedSetIndex === "all" ? match.sets : [match.sets[selectedSetIndex]];

  // Get the selected game or all games
  const selectedGames =
    selectedSetIndex === "all"
      ? selectedSet.flatMap((set) => set.games)
      : selectedSet[0].games;

  // Prepare chart data
  const chartData =
    selectedSetIndex === "all"
      ? selectedSet.flatMap((set, setIndex) =>
          set.games.flatMap((game, gameIndex) =>
            game.scores.map((score, scoreIndex) => ({
              name: `Set ${setIndex + 1} - Game ${gameIndex + 1} - Score ${
                scoreIndex + 1
              }`,
              p1Score: parseInt(score.p1Score, 10),
              p2Score: parseInt(score.p2Score, 10),
            }))
          )
        )
      : selectedGameIndex === "all"
      ? selectedSet[0].games.flatMap((game, gameIndex) =>
          game.scores.map((score, scoreIndex) => ({
            name: `Game ${gameIndex + 1} - Score ${scoreIndex + 1}`,
            p1Score: parseInt(score.p1Score, 10),
            p2Score: parseInt(score.p2Score, 10),
          }))
        )
      : selectedGames[selectedGameIndex].scores.map((score, scoreIndex) => ({
          name: `Game ${selectedGameIndex + 1} - Score ${scoreIndex + 1}`,
          p1Score: parseInt(score.p1Score, 10),
          p2Score: parseInt(score.p2Score, 10),
        }));

  return (
    <div className="p-4 w-full">
      {/* Tabs for All Sets | Set 1 | Set 2 */}
      <SetsTabs sets={match.sets} onSetChange={setSelectedSetIndex} />

      {/* Tabs for Games within a Set (only shown when a specific set is selected) */}
      {selectedSetIndex !== "all" && (
        <GamesTabs
          games={selectedSet[0].games}
          onGameChange={setSelectedGameIndex}
        />
      )}

      {/* Line Chart to display scores */}
      <ScoreLineChart data={chartData} />
    </div>
  );
};
