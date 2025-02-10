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
}

const getAgainest = (
  player: "player1" | "player2" | null
): "player1" | "player2" => {
  return player == "player1" ? "player2" : "player1";
};

function TrackingMatch() {
  const [dataTracker, setDataTracker] = useState<dataTrackerType[]>([]);
  const [isTieBreak, setIsTieBreak] = useState(false);
  const [score, setScore] = useState<ScoreInf>({
    matchScore: {
      player1: 0,
      player2: 0,
    },
    setScore: {
      player1: 4,
      player2: 4,
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

  const updateMatch = (winner: "player1" | "player2") => {
    const winnerMatchPoint = score.matchScore[winner];
    const newPoint = winnerMatchPoint + 1;
    setScore((data) => ({
      ...data,
      matchScore: { ...data["setScore"], [winner]: newPoint },
    }));
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
  const resetScore = (type: "gameScore" | "setScore") => {
    setScore((data) => ({
      ...data,
      [type]: { player1: 0, player2: 0 },
    }));
  };

  const addPoint = (winner: "player1" | "player2") => {
    const winnerPoint = score.gameScore[winner];
    const againest = getAgainest(winner);
    const againestPoint = score.gameScore[againest];
    if (isTieBreak && winnerPoint != "A" && againestPoint != "A") {
      const nextpoint = winnerPoint + 1;
      setScore((data) => ({
        ...data,
        gameScore: {
          ...data.gameScore,
          [winner]: nextpoint,
          serve: getAgainest(data.serve!),
        },
      }));

      if (nextpoint > 6 && nextpoint - againestPoint > 1) {
        resetScore("gameScore");
        updateSet(winner);
      }
      return;
    }
    if (winnerPoint != 40 && winnerPoint != "A") {
      const nextpoint = getNextPoint(winnerPoint);
      setScore((data) => ({
        ...data,
        gameScore: { ...data.gameScore, [winner]: nextpoint },
      }));
      return;
    }
    if (winnerPoint == 40) {
      if (againestPoint == "A") {
        setScore((data) => ({
          ...data,
          gameScore: { ...data.gameScore, [againest]: 40 },
        }));
        return;
      }
      if (againestPoint == 40) {
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
        {score.serve == null ? (
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
              addPoint={addPoint}
              setDataTracker={setDataTracker}
            />
          </div>
        )}
      </div>
    </ContentLayout>
  );
}

const OneGame = ({
  addPoint,
  setDataTracker,
  score,
}: {
  addPoint: Function;
  setDataTracker: Function;
  score: ScoreInf;
}) => {
  const initialData: dataTrackerType = {
    goalType: "",
    serve: "",
    winner: "",
    handPosition: "",
    hitType: "",
    errorType: "",
    ballPosition: "",
    rallyCount: 1,
  };

  const [singleData, setSingleData] = useState<dataTrackerType>(initialData);

  const reset = () => {
    setDataTracker((d: any) => [...d, singleData]);
    setSingleData({ ...initialData });
  };
  const againest = getAgainest(score.serve);
  const [isOnFault, setIsOnFault] = useState(false);
  const leftData = [
    {
      name: "ACE(+1)",
      onClick: () =>
        setSingleData((d) => ({
          ...d,
          goalType: "ace",
          winner: score.serve ?? "player1",
        })),
      disabled: singleData.rallyCount > 1,
      isActive: singleData.goalType == "ace",
    },
    {
      name: "SERVE RETURN WIN(+1)",
      onClick: () =>
        setSingleData((d) => ({
          ...initialData,
          rallyCount: d.rallyCount,
          goalType: "serveReturnWin",
          winner: score.serve ?? "player1",
        })),
      disabled: false,
      isActive: singleData.goalType == "serveReturnWin",
    },
    {
      name: "SCORE (+1)",
      onClick: () =>
        setSingleData((d) => ({
          ...initialData,
          rallyCount: d.rallyCount,
          goalType: "scoreByServer",
          winner: score.serve ?? "player1",
        })),
      disabled: false,
      isActive: singleData.goalType == "scoreByServer",
    },
  ];
  const rightData = [
    {
      name: isOnFault ? "Double Fault" : "FAULT",
      onClick: () =>
        setSingleData((d) => ({
          ...initialData,
          rallyCount: d.rallyCount,
          goalType: "fault",
          winner: againest,
        })),
      disabled: singleData.rallyCount > 1,
      isActive: singleData.goalType == "fault",
    },
    {
      name: "SERVE RETURN LOSS(+1)",
      onClick: () =>
        setSingleData((d) => ({
          ...initialData,
          rallyCount: d.rallyCount,
          goalType: "serveReturnLoss",
          winner: againest,
        })),
      disabled: false,
      isActive: singleData.goalType == "serveReturnLoss",
    },
    {
      name: "SCORE(+1)",
      onClick: () =>
        setSingleData((d) => ({
          ...initialData,
          rallyCount: d.rallyCount,
          goalType: "score",
          winner: againest,
        })),
      disabled: false,
      isActive: singleData.goalType == "score",
    },
  ];

  const backhand = () => {
    return ["ace", "serveReturnWin", "fault"].includes(singleData.goalType);
  };
  const GroundstrokeCheck = () => {
    return ["ace", "serveReturnWin", "fault"].includes(singleData.goalType);
  };
  const ApproachCheck = () => {
    return ["ace", "serveReturnWin", "fault"].includes(singleData.goalType);
  };
  const VolleyCheck = () => {
    return ["ace", "serveReturnWin", "fault"].includes(singleData.goalType);
  };
  const ForcedCheck = () => {
    return ["ace", "fault"].includes(singleData.goalType);
  };
  const UnforcedCheck = () => {
    return ["ace", "serveReturnWin", "serveReturnLoss"].includes(
      singleData.goalType
    );
  };
  const NetCheck = () => {
    return ["ace"].includes(singleData.goalType);
  };
  const BackcourtCheck = () => {
    return ["ace"].includes(singleData.goalType);
  };
  const AlleyCheck = () => {
    return ["ace"].includes(singleData.goalType);
  };

  const getDisabled = (name: string) => {
    if (name == "Backhand") return backhand();
    if (name == "Forehand") return backhand();
    if (name == "Groundstroke") return GroundstrokeCheck();
    if (name == "Approach") return ApproachCheck();
    if (name == "Volley") return VolleyCheck();
    if (name == "Forced") return ForcedCheck();
    if (name == "Unforced") return UnforcedCheck();
    if (name == "Net") return NetCheck();
    if (name == "Backcourt") return BackcourtCheck();
    if (name == "Alley") return AlleyCheck();

    return false;
  };

  useEffect(() => {
    const func = () => {
      if (
        singleData.rallyCount > 0 &&
        (singleData.goalType == "ace" || singleData.goalType == "fault")
      ) {
        setSingleData((d) => ({ ...d, goalType: "" }));
      }
    };
    func();
  }, [singleData.goalType, singleData.rallyCount]);
  return (
    <div className="flex flex-col">
      <div className="mx-auto mt-8">
        <div className="text-center mb-1">Rally Count</div>
        <div className="border rounded-lg flex">
          <Button
            onClick={() => {
              setSingleData((d) => ({ ...d, rallyCount: d.rallyCount - 1 }));
            }}
            disabled={singleData.rallyCount ==1}
            className={`px-12 py-6 rounded-l-lg bg-primary ${
              singleData.rallyCount ==1 && "bg-primary/50"
            } text-white flex justify-center items-center`}
          >
            <FaMinus />
          </Button>
          <div className="px-12 py-6 bg-white flex justify-center items-center">
            <div className="w-6 flex justify-center ">
              {singleData.rallyCount}
            </div>
          </div>
          <Button
            onClick={() => {
              setSingleData((d) => ({ ...d, rallyCount: d.rallyCount + 1 }));
            }}
            className="px-12 py-6 rounded-r-lg bg-primary text-white flex justify-center items-center"
          >
            <FaPlus />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-8 px-1 mt-4">
        <div className="flex flex-col items-center gap-3 text-sm">
          {leftData.map((data) => (
            <GamePointButtons
              onClick={() => {
                data.onClick();
              }}
              isActive={data.isActive}
              disabled={data.disabled}
              name={data.name}
              type={score.serve == "player1" ? "server" : "againest"}
            />
          ))}
        </div>
        {singleData.goalType == "" ? (
          <>
            <div></div>
            <div></div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-1 text-sm my-auto">
              <div className="text-center">Hand Position</div>
              <div className="flex flex-wrap justify-center gap-5">
                <InnerButton
                  name="Backhand"
                  isActive={singleData.handPosition == "Backhand"}
                  disabled={getDisabled("Backhand")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, handPosition: "Backhand" }));
                  }}
                />
                <InnerButton
                  name="Forehand"
                  isActive={singleData.handPosition == "Forehand"}
                  disabled={getDisabled("Forehand")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, handPosition: "Forehand" }));
                  }}
                />
              </div>
              <div className="text-center mt-4">Hit Type</div>
              <div className="flex flex-wrap justify-center gap-3 content-center ">
                <InnerButton
                  name="Groundstroke"
                  isActive={singleData.hitType == "Groundstroke"}
                  disabled={getDisabled("Groundstroke")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, hitType: "Groundstroke" }));
                  }}
                />
                <InnerButton
                  name="Approach"
                  isActive={singleData.hitType == "Approach"}
                  disabled={getDisabled("Approach")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, hitType: "Approach" }));
                  }}
                />
                <InnerButton
                  name="Volley"
                  isActive={singleData.hitType == "Volley"}
                  disabled={getDisabled("Volley")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, hitType: "Volley" }));
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 text-sm my-auto">
              <div className="text-center">Error Type</div>
              <div className="flex flex-wrap justify-center gap-5">
                <InnerButton
                  name="Forced"
                  isActive={
                    singleData.errorType == "Forced" ||
                    singleData.goalType == "serveReturnLoss" ||
                    singleData.goalType == "serveReturnWin"
                  }
                  disabled={getDisabled("Forced")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, errorType: "Forced" }));
                  }}
                />
                <InnerButton
                  name="Unforced"
                  isActive={
                    singleData.errorType == "Unforced" ||
                    singleData.goalType == "fault"
                  }
                  disabled={getDisabled("Unforced")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, errorType: "Unforced" }));
                  }}
                />
              </div>
              <div className="text-center mt-4">
                Error/Outside Ball Position
              </div>
              <div className="flex flex-wrap justify-center gap-3 content-center ">
                <InnerButton
                  name="Net"
                  isActive={singleData.ballPosition == "Net"}
                  disabled={getDisabled("Net")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, ballPosition: "Net" }));
                  }}
                />
                <InnerButton
                  name="Backcourt"
                  isActive={singleData.ballPosition == "Backcourt"}
                  disabled={getDisabled("Backcourt")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, ballPosition: "Backcourt" }));
                  }}
                />
                <InnerButton
                  name="Alley"
                  isActive={singleData.ballPosition == "Alley"}
                  disabled={getDisabled("Alley")}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, ballPosition: "Alley" }));
                  }}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex flex-col gap-3 text-sm items-center">
          {rightData.map((data, ind) => (
            <GamePointButtons
              key={ind}
              onClick={() => {
                data.onClick();
              }}
              isActive={data.isActive}
              disabled={data.disabled}
              name={data.name}
              type={score.serve == "player2" ? "server" : "againest"}
            />
          ))}
        </div>
      </div>

      <Button
        // disabled={player == null}
        onClick={() => {
          if (singleData.goalType != "") {
            if (singleData.goalType == "fault") {
              if (isOnFault) {
                addPoint(singleData.winner);
              }
              setIsOnFault((d) => !d);
            } else {
              isOnFault && setIsOnFault(false);
              addPoint(singleData.winner);
            }
            reset();
          }
        }}
        className={`px-8 py-2 rounded-full ${
          singleData.winner != "" ? "bg-primary" : "bg-primary/70"
        }  text-white w-fit mx-auto mt-2 mb-12`}
      >
        Register Score
      </Button>
    </div>
  );
};

const GamePointButtons = ({
  name,
  isActive = false,
  onClick = () => {},
  type = "server",
  disabled = false,
}: {
  name: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: Function;
  type?: "server" | "againest";
}) => {
  const css = isActive
    ? "bg-[#FBC15D] text-black border-2 border-[#FDB332FF]"
    : type == "againest"
    ? "text-white bg-primary"
    : "";
  return (
    <Button
      disabled={disabled}
      onClick={() => onClick()}
      className={`px-1 w-40 h-24  shadow rounded-xl  ${css} ${
        disabled
          ? "cursor-not-allowed bg-white text-gray-400 border border-gray-300 "
          : "shadow-primary"
      }`}
    >
      {name}
    </Button>
  );
};

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

const InnerButton = ({
  name,
  isActive = false,
  disabled = false,
  onClick = () => {},
}: {
  name: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: Function;
}) => {
  return (
    <Button
      disabled={disabled}
      onClick={() => onClick()}
      className={`py-1 px-3 min-w-20 shadow rounded ${
        disabled
          ? "bg-gray-300 text-gray-700 border-none shadow-none"
          : isActive
          ? " bg-[#FBC15D]"
          : "bg-white "
      } shadow-primary border border-primary `}
    >
      {name}
    </Button>
  );
};

export default TrackingMatch;
