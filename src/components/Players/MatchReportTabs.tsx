import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Match, Player } from "@/types/match.type";
import avater from "../../assets/avater.jpg";
interface MatchReportProps {
  match: Match;
}

const TABS = ["Service", "Points", "Rallies", "Conversion", "Response"];

const LABELS: Record<string, string> = {
  totalServices: "Total Services",
  firstServicePercentage: "First Service %",
  secondServicePercentage: "Second Service %",
  aces: "Aces",
  doubleFaults: "Double Faults",
  firstServices: "First Services",
  secondServices: "Second Services",
  totalPointsWon: "Total Points Won",
  winners: "Winners",
  unforcedErrors: "Unforced Errors",
  forcedErrors: "Forced Errors",
  oneToFour: "1-4 Shots",
  fiveToEight: "5-8 Shots",
  nineToTwelve: "9-12 Shots",
  thirteenToTwenty: "13-20 Shots",
  twentyOnePlus: "21+ Shots",
  firstServicePointsWon: "1st Serve Points Won",
  secondServicePointsWon: "2nd Serve Points Won",
  receivingPointsWon: "Receiving Points Won",
  breakPoints: "Break Points",
  gamePoints: "Game Points",
  negativeResponses: "Negative Responses",
  positiveResponses: "Positive Responses",
  negativeSelfTalks: "Negative Self Talks",
  positiveSelfTalks: "Positive Self Talks",
  noResponses: "No Responses",
};

export default function MatchReportTabs({ match }: MatchReportProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const reports = [
    match.p1MatchReport.service,
    match.p1MatchReport.points,
    match.p1MatchReport.rallies,
    match.p1MatchReport.conversion,
    match.p1MatchReport.response,
  ];

  const p2Reports = [
    match.p2MatchReport.service,
    match.p2MatchReport.points,
    match.p2MatchReport.rallies,
    match.p2MatchReport.conversion,
    match.p2MatchReport.response,
  ];

  function isPlayer(player: string | Player): player is Player {
    return player !== null && typeof player === "object";
  }

  const playerOne: string | Player = match.p1IsObject
    ? match.p1 ?? match.p1Name
    : match.p1Name;
  const playerTwo: string | Player = match.p2IsObject
    ? match.p2 ?? match.p2Name
    : match.p2Name;

  const getPlayerDetail = (key: string): JSX.Element | null => {
    const player: string | Player | undefined =
      key === "playerOne"
        ? playerOne
        : key === "playerTwo"
        ? playerTwo
        : undefined;

    if (!player) {
      return null;
    }

    return (
      <div className="flex items-center gap-2">
        <img
          className="w-10 h-10 rounded-full"
          src={isPlayer(player) ? player.avatar : avater}
          alt={isPlayer(player) ? player.firstName : "image"}
        />
        <div>
          <p className="">
            {isPlayer(player)
              ? `${player.firstName} ${player.lastName}`
              : player}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Tabs defaultValue={TABS[0]}>
        <TabsList className="flex space-x-2 bg-transparent">
          {TABS.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={tab}
              className="px-4 py-2 text-sm font-medium"
            >
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map((tab, index) => (
          <TabsContent key={index} value={tab} className="p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-lg font-semibold text-primary underline mb-2">
                  {tab} Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-gray-700 font-semibold pb-2 border-b">
                  {getPlayerDetail("playerOne")}
                  <span className="w-1/2 text-center"></span>
                  {getPlayerDetail("playerTwo")}
                </div>
                {Object.keys(reports[index] as object).map((key) => {
                  const p1Value =
                    reports[index][key as keyof (typeof reports)[number]];
                  const p2Value =
                    p2Reports[index][key as keyof (typeof p2Reports)[number]];
                  const maxValue = Math.max(
                    Number(p1Value),
                    Number(p2Value),
                    1
                  );

                  return (
                    <div
                      key={key}
                      className="flex flex-col space-y-2 bg-gray-50 p-4 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-center text-gray-700 font-semibold">
                        <span>{LABELS[key] || key}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-blue-600 font-bold w-6 text-right">
                          {p1Value}
                        </span>
                        <Progress
                          value={(Number(p1Value) / maxValue) * 100}
                          className="flex-1 h-2 bg-gray-200"
                        />
                        <Progress
                          value={(Number(p2Value) / maxValue) * 100}
                          className="flex-1 h-2 bg-gray-200"
                        />
                        <span className="text-red-600 font-bold w-6 text-left">
                          {p2Value}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
