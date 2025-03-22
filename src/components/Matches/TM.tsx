import ProfileCard from "@/components/PendingMatch/ProfileCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { FaFlag, FaInfoCircle } from "react-icons/fa";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { FaBaseball, FaMinus, FaPlus, FaTrophy } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";
import { FaRegCalendarPlus } from "react-icons/fa";
import { MdOutlineWaves } from "react-icons/md";
import { ContentLayout } from "@/components/Sidebar/contenet-layout";
import { FiInfo } from "react-icons/fi";
import profile_img from "../../assets/user.jpeg";
import Report from "./Report";
import MatchProfile from "./MatchProfile";
import { Button } from "../ui/button";
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "@/api/axios.ts";
import OneGame from "./TOneGame";

interface TennisMatch {
  totalGameTime: number;
  sets: Set[];
}

interface Set {
  p1TotalScore: number;
  p2TotalScore: number;
  games: Game[];
  tieBreak?: TieBreak | null;
}

interface Game {
  gameNumber: number;
  server: "playerOne" | "playerTwo";
  scores: Score[];
}

interface Score {
  p1Score: string; // Changed from string to string
  p2Score: string; // Changed from string to string
  isSecondService: boolean;
  p1Reaction: string; // Example: "negativeResponse"
  p2Reaction: string; // Example: "negativeResponse"
  missedShot?: string; // Example: "net"
  placement?: string; // Example: "downTheLine"
  missedShotWay?: string; // Example: "forehand"
  betweenPointDuration: number;
  type: string; // Example: "ace"
  rallies: string; // Example: "oneToFour"
  servePlacement: string; // Example: "t"
}

interface TieBreak {
  winner: "playerOne" | "playerTwo" | null;
  scores: TieBreakScore[];
}

interface TieBreakScore {
  playerOnePoints: number;
  playerTwoPoints: number;
}
// --------------------------------------------

interface Player {
  id: number; // Unique identifier for the player
  name: string; // Player's name
  scores: number[]; // Array to track scores for each set
  matchScore: number; // Total match score
}

interface Events {
  rallyCount: number; // Current rally count
  aces: number; // Total number of aces
  faults: number; // Total number of faults
  serveReturns: {
    wins: number; // Number of serve return wins
    losses: number; // Number of serve return losses
  };
  hitTypes: {
    groundstroke: number; // Number of groundstroke hits
    approach: number; // Number of approach hits
    volley: number; // Number of volley hits
  };
  errors: {
    forced: number; // Number of forced errors
    unforced: number; // Number of unforced errors
  };
  ballPosition: {
    net: number; // Errors at the net
    backcourt: number; // Errors in the backcourt
    alley: number; // Errors in the alley
  };
}

interface GameState {
  players: Player[]; // List of players
  currentSet: number; // Current set number
  events: Events; // Tracks game events
}

type PointInf = number | "A";
interface ScoreInf {
  gameScore: {
    player1: PointInf;
    player2: PointInf;
  };
  setScore: {
    player1: number;
    player2: number;
  };
  matchScore: {
    player1: number;
    player2: number;
  };

  setScoreCur: number;
  matchScoreCur: number;
  serve: "player1" | "player2" | null;
}

type scoreTrackType =
  | "ace"
  | "serveReturnWin"
  | "scoreByServer"
  | "fault"
  | "serveReturnLoss"
  | "score";

interface dataTrackerType {
  goalType: scoreTrackType | "";
  serve: "player1" | "player2" | "";
  winner: "player1" | "player2" | "";
  handPosition: "Backhand" | "Forehand" | "";
  hitType: "Groundstroke" | "Approach" | "Volley" | "";
  errorType: "Forced" | "Unforced" | "";
  ballPosition: "Net" | "Backcourt" | "Alley" | "";
  rallyCount: number;

  missedShot: "net" | "long" | "wide" | "";
  missedShotWay:
    | "forehand"
    | "backhand"
    | "forhandvolley"
    | "backhandvolley"
    | "forehandSwingingVolley"
    | "backhandSwingingVolley"
    | "forehandSlice"
    | "backhandSlice"
    | "overhead"
    | "forehandDropShot"
    | "backhandDropShot"
    | "";
}

// {
//   p1TotalScore: 0,
//   p2TotalScore: 0,
//   games: [
//
//       ]
// }
// }

// {
//       gameNumber: 1,
//       server: "playerOne",
//       scores: [
//         {
//           p1Score: 0,
//           p2Score: 0,
//           isSecondService: false,
//           p1Reaction: "",
//           p2Reaction: "",
//           missedShot: "",
//           placement: "",
//           missedShotWay: "",
//           betweenPointDuration: 0,
//           type: "",
//           rallies: "",
//           servePlacement: ""
//         }

const getAgainest = (
  player: "player1" | "player2" | null
): "player1" | "player2" => {
  return player == "player1" ? "player2" : "player1";
};

function TrackingMatch() {
  const { isLoading, mutate } = useMutation(
    (data: any) =>
      axios.post("/api/v1/matches/67bea425112e80c58f7861ec/submit", data),
    {
      onSuccess(data) {
        toast.success("Added Successfuly");
      },
      onError(err: any) {
        toast.error(
          typeof err.response.data === "string"
            ? err.response.data
            : "Something goes wrong!"
        );
      },
    }
  );
  const [apiData, setApiData] = useState<TennisMatch>({
    totalGameTime: 0,
    sets: [],
  });
  const apiSetDataInitial: Set = {
    p1TotalScore: 0,
    p2TotalScore: 0,
    games: [],
    tieBreak: null,
  };
  const [apiSetData, setApiSetData] = useState<Set>(apiSetDataInitial);

  const apiGameDataInitial: Game = {
    gameNumber: 1,
    server: "playerOne",
    scores: [],
  };
  const [apiGameData, setApiGameData] = useState<Game>(apiGameDataInitial);
  const apiScoreDataInitial = {
    p1Score: "0",
    p2Score: "0",
    isSecondService: false,
    p1Reaction: "negativeResponse",
    p2Reaction: "positiveResponse",
    missedShot: "wide",
    placement: "downTheLine",
    missedShotWay: "forehand",
    betweenPointDuration: 0,
    type: "ace",
    rallies: "oneToFour",
    servePlacement: "t",
  };
  const [apiScoreData, setApiScoreData] = useState<Score>(apiScoreDataInitial);

  const [dataTracker, setDataTracker] = useState<dataTrackerType[]>([]);
  const [isTieBreak, setIsTieBreak] = useState(false);
  const [score, setScore] = useState<ScoreInf>({
    matchScore: {
      player1: 1,
      player2: 0,
    },
    setScore: {
      player1: 5,
      player2: 0,
    },
    gameScore: {
      player1: 0,
      player2: 0,
    },
    serve: null,
    setScoreCur: 0,
    matchScoreCur: 0,
  });

  const getNextPoint = (score: PointInf): PointInf => {
    if (score == 0) return 15;
    if (score == 15) return 30;
    if (score == 30) return 40;
    return "A";
  };

  const getPrevPoint = (score: PointInf): PointInf => {
    if (score == 0) return 0;
    if (score == 15) return 0;
    if (score == 30) return 15;
    if (score == 40) return 30;
    if (score == "A") return 40;
    return "A";
  };

  const updateMatch = (winner: "player1" | "player2") => {
    const winnerMatchPoint = score.matchScore[winner];
    const otherMatchPoint = score.matchScore[getAgainest(winner)];
    const newPoint = winnerMatchPoint + 1;
    setApiData((d) => {
      const x = {
        ...d,
        sets: [
          ...d.sets,
          {
            ...apiSetData,
            p1TotalScore: winner == "player1" ? newPoint : otherMatchPoint,
            p2TotalScore: winner == "player2" ? newPoint : otherMatchPoint,
          },
        ],
      };
      console.log("IIIII-I-IIIIIII", x);
      if (newPoint == 2) {
        mutate(x);
      }
      return x;
    });
    setApiSetData(apiSetDataInitial);

    setScore((data) => {
      const a = {
        ...data,
        matchScore: { ...data["matchScore"], [winner]: newPoint },
      };
      console.log(
        "Check it",
        a,
        data,
        winner,
        winnerMatchPoint,
        newPoint,
        otherMatchPoint
      );
      return a;
    });
    if (newPoint == 2) {
      alert(winner + " Winnes");
      setScore((data) => ({
        ...data,
        serve: null,
      }));
    }
  };

  const updateSet = (winner: "player1" | "player2") => {
    const winnerSetPoint = score.setScore[winner];
    const againest = getAgainest(winner);
    const againestSetPoint = score.setScore[againest];
    const newPoint = winnerSetPoint + 1;
    setApiSetData((d) => {
      const x = { ...d, games: [...d.games, apiGameData] };
      console.log(x, "ZZZZZZZZ");
      return x;
    });
    setApiGameData(apiGameDataInitial);
    if (isTieBreak) {
      resetScore("setScore");
      setIsTieBreak(false);
      updateMatch(winner);
      return;
    }
    setScore((data) => ({
      ...data,
      setScore: { ...data["setScore"], [winner]: newPoint, serve: againest },
      serve: getAgainest(data.serve!),
    }));
    if (newPoint == 6 && 6 == againestSetPoint) {
      setIsTieBreak(true);
    }
    if (newPoint > 5 && newPoint - againestSetPoint > 1) {
      resetScore("setScore");
      updateMatch(winner);
    }
  };

  const addPoint = (winner: "player1" | "player2", singleScoreData: Score) => {
    const winnerPoint = score.gameScore[winner];
    const againest = getAgainest(winner);
    const againestPoint = score.gameScore[againest];
    let newApiScoreData: Score = {
      ...singleScoreData,
      missedShot: "net",
      rallies:
        singleScoreData.rallies == "" ? "oneToFour" : singleScoreData.rallies,
      type: singleScoreData.type == "" ? "doubleFault" : singleScoreData.type,
    };

    // if (newApiScoreData.missedShot == "") delete newApiScoreData["missedShot"];
    // if (newApiScoreData.missedShotWay == "")
    //   delete newApiScoreData["missedShotWay"];
    // if (newApiScoreData.placement == "") delete newApiScoreData["placement"];

    if (isTieBreak && winnerPoint != "A" && againestPoint != "A") {
      const nextpoint = winnerPoint + 1;
      newApiScoreData = {
        ...newApiScoreData,
        p1Score: nextpoint.toString(),
        p2Score: againestPoint.toString(),
      };
      setScore((data) => ({
        ...data,
        gameScore: {
          ...data.gameScore,
          [winner]: nextpoint,
          serve: getAgainest(data.serve!),
        },
      }));

      setApiGameData((d) => ({ ...d, scores: [...d.scores, newApiScoreData] }));
      if (nextpoint > 6 && nextpoint - againestPoint > 1) {
        resetScore("gameScore");
        updateSet(winner);
      }
      return;
    }
    if (winnerPoint != 40 && winnerPoint != "A") {
      const nextpoint = getNextPoint(winnerPoint);
      newApiScoreData = {
        ...newApiScoreData,
        p1Score: nextpoint.toString(),
        p2Score: againestPoint.toString(),
      };
      setApiGameData((d) => ({ ...d, scores: [...d.scores, newApiScoreData] }));
      setScore((data) => ({
        ...data,
        gameScore: { ...data.gameScore, [winner]: nextpoint },
      }));
      return;
    }

    if (winnerPoint == 40) {
      if (againestPoint == "A") {
        newApiScoreData = {
          ...newApiScoreData,
          p1Score: "40",
          p2Score: "40",
        };
        setApiGameData((d) => ({
          ...d,
          scores: [...d.scores, newApiScoreData],
        }));
        setScore((data) => ({
          ...data,
          gameScore: { ...data.gameScore, [againest]: 40 },
        }));
        return;
      }
      if (againestPoint == 40) {
        newApiScoreData = {
          ...newApiScoreData,
          p1Score: "A",
          p2Score: "40",
        };
        setApiGameData((d) => ({
          ...d,
          scores: [...d.scores, newApiScoreData],
        }));
        const nextpoint = getNextPoint(winnerPoint);
        setScore((data) => ({
          ...data,
          gameScore: { ...data.gameScore, [winner]: nextpoint },
        }));
      } else {
        resetScore("gameScore");
        updateSet(winner);
      }
      return;
    }
    if (winnerPoint == "A") {
      resetScore("gameScore");
      updateSet(winner);
    }
  };

  const undoPoint = (losser: "player1" | "player2") => {
    const losserPoint = score.gameScore[losser];
    const againest = getAgainest(losser);
    const againestPoint = score.gameScore[againest];
    if (losserPoint == "A" || losserPoint > 0) {
      setScore((data) => ({
        ...data,
        gameScore: { ...data.gameScore, [losser]: getPrevPoint(losserPoint) },
      }));
    } else {
      undoSet(losser);
    }
  };

  const undoSet = (losser: "player1" | "player2") => {
    const losserSetPoint = score.setScore[losser];
    const againest = getAgainest(losser);
    const againestSetPoint = score.setScore[againest];
    const newPoint = losserSetPoint - 1;
    setScore((data) => ({
      ...data,
      setScore: { ...data["setScore"], [losser]: newPoint, serve: againest },
      serve: getAgainest(data.serve!),
    }));
  };

  const resetScore = (type: "gameScore" | "setScore") => {
    setScore((data) => ({
      ...data,
      [type]: { player1: 0, player2: 0 },
    }));
  };

  return (
    <ContentLayout name="Tracking Match">
      <div className="bg-white pt-10 min-h-[100vh] overflow-auto pb-12">
        <div className="w-full mx-auto mt-4">
          <div className="flex gap-x-6 flex-col gap-y-2 sm:flex-row items-center justify-center">
            <MatchProfile
              server={score.serve == "player1"}
              name="Candace"
              ranking={49}
            />
            <div className="px-4 py-6 text-4xl text-white bg-gradient-to-b from-[#F8B570] font-bold rounded-xl to-[#F38C28] ">
              VS
            </div>
            <MatchProfile
              server={score.serve == "player2"}
              vs
              name="Jene"
              ranking={19}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center pt-12 mx-auto">Loadaing...</div>
        ) : score.serve == null ? (
          <div className="flex flex-col gap-2 mt-12">
            <div className="text-center mb-8">Start Serve</div>
            <div className="w-full justify-center flex gap-10">
              <Button
                onClick={() => setScore((d) => ({ ...d, serve: "player1" }))}
                className="w-44 py-6 rounded-lg bg-white text-primary border border-primary"
              >
                Candace
              </Button>
              <Button
                onClick={() => setScore((d) => ({ ...d, serve: "player2" }))}
                className="w-44 py-6 rounded-lg bg-primary text-white"
              >
                Jane
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col">
            <Table score={score} />
            <OneGame
              score={score}
              undoPoint={undoPoint}
              addPoint={addPoint}
              setDataTracker={setDataTracker}
            />
          </div>
        )}
      </div>
    </ContentLayout>
  );
}

const Table = ({ score }: { score: ScoreInf }) => {
  return (
    <table className="w-2/3 my-3 rounded-l ms-6 border-collapse border border-gray-300">
      <thead>
        <tr className="text-left">
          <th className="border px-4 py-2 w-[400px]">Players</th>
          <th className="border px-4 py-2 w-[200px] whitespace-nowrap">
            Match Score
          </th>
          <th className="border px-4 py-2 w-[200px] whitespace-nowrap">Set</th>
          <th className="border px-4 py-2 w-[200px] whitespace-nowrap">
            Points
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-gray-50">
          <td className="border justify-between border-gray-300 px-4 py-2 flex gap-2">
            <div>
              <p className="text-sm font-semibold">Candace Flynn</p>
              <p className="text-gray-700 text-xs">USDTA 123</p>
            </div>
            {score.serve == "player1" && (
              <FaBaseball className="text-primary" size={25} />
            )}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {score.matchScore.player1}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {score.setScore.player1}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {score.gameScore.player1}
          </td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="border flex justify-between border-gray-300 bg-primary text-white px-4 py-2  gap-2">
            <div>
              <p className="text-sm font-semibold">Jene</p>
              <p className="text-gray-300 text-xs">USDTA 123</p>
            </div>
            {score.serve == "player2" && <FaBaseball size={25} />}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {score.matchScore.player2}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {score.setScore.player2}
          </td>
          <td className="border border-gray-300 px-4 py-2 text-center">
            {score.gameScore.player2}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TrackingMatch;
