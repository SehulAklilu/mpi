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
import Report from "../Report";
import MatchProfile from "../MatchProfile";
import { Button } from "../../ui/button";
import { BsArrow90DegLeft, BsArrow90DegRight } from "react-icons/bs";

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

const OneGame = ({
  addPoint,
  setDataTracker,
  score,
  undoPoint,
}: {
  addPoint: Function;
  setDataTracker: Function;
  score: ScoreInf;
  undoPoint: Function;
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
    missedShot: "",
    missedShotWay: "",
  };

  const iniTempScore: Score = {
    p1Score: "",
    p2Score: "",
    isSecondService: false,
    p1Reaction: "",
    p2Reaction: "",
    betweenPointDuration: 0,
    type: "",
    rallies: "",
    placement: "",
    missedShotWay: "",
    missedShot: "",
    servePlacement: "",
  };

  const [tempScore, setTempScore] = useState<Score>(iniTempScore);
  const [singleData, setSingleData] = useState<dataTrackerType>(initialData);

  const reset = () => {
    setTempScore({ ...iniTempScore });
    setDataTracker((d: any) => [...d, singleData]);
    setSingleData({ ...initialData });
  };
  const againest = getAgainest(score.serve);
  const [isOnFault, setIsOnFault] = useState(false);
  const typeData = [
    {
      name: "ace",
      disabled: singleData.rallyCount > 1,
      isActive: true,
    },
    {
      name: "returnWinner",
      disabled: false,
      isActive: true,
    },
    {
      name: "returnError",
      disabled: false,
      isActive: true,
    },
    {
      name: "forcedReturnError",
      disabled: false,
      isActive: true,
    },
    {
      name: "ballInCourt",
      disabled: false,
      isActive: true,
    },
  ];
  const winner1Data = [
    {
      name: "Winner",
      winner: score.serve,
      value: "p1Winner",
      disabled: false,
      isActive: false,
    },
    {
      name: "Forced Error",
      winner: score.serve,
      value: "p1ForcedError",
      disabled: false,
      isActive: false,
    },
    {
      name: "Unforced Error",
      winner: score.serve,

      value: "p1UnforcedError",
      disabled: false,
      isActive: false,
    },
  ];
  const winner2Data = [
    {
      name: "Winner",
      winner: getAgainest(score.serve),
      value: "p2Winner",
      disabled: false,
      isActive: true,
    },
    {
      name: "Forced Error",
      value: "p2ForcedError",
      winner: getAgainest(score.serve),
      disabled: false,
      isActive: true,
    },
    {
      name: "Unforced Error",
      value: "p2UnforcedError",
      winner: getAgainest(score.serve),
      disabled: false,
      isActive: true,
    },
  ];

  useEffect(() => {
    const func = () => {
      if (
        singleData.rallyCount > 1 &&
        (singleData.goalType == "ace" || singleData.goalType == "fault")
      ) {
        setSingleData((d) => ({ ...d, goalType: "" }));
      }
    };
    func();
  }, [singleData.goalType, singleData.rallyCount]);

  interface Stack {
    fault: boolean | null;
    winner: "player1" | "player2" | null;
  }
  const [undoStack, setUndoStack] = useState<Stack[]>([]);
  // const [redoStack, setUndoStack] = useState<Stack[]>([]);

  const undoLastAction = () => {
    if (undoStack.length === 0) return;
    const lastAction = undoStack.pop();
    if (lastAction?.fault) {
      setIsOnFault((prev) => !prev);
    }
    if (lastAction?.winner) {
      undoPoint(lastAction.winner);
    }
  };

  const registerScore = (finalData: Score, updatedCheck: dataTrackerType) => {
    if (updatedCheck.goalType == "") {
      return;
    }

    if (updatedCheck.goalType == "fault") {
      if (isOnFault) {
        addPoint(updatedCheck.winner, finalData);
      }
      setIsOnFault((d) => !d);
    } else {
      isOnFault && setIsOnFault(false);
      addPoint(updatedCheck.winner, finalData);
    }
    console.log(finalData, updatedCheck);
    reset();
  };

  return (
    <div className="flex flex-col">
      {/* 
      <div className="flex w-full justify-end   gap-5 px-32 mt-4">
        <Button
          onClick={undoLastAction}
          className="flex gap-2 items-center justify-center capitalize text-sm"
        >
          <div>undo</div>
          <BsArrow90DegLeft className="text-primary font-bold" />
        </Button>
        <Button
          onClick={() => {}}
          className="flex gap-2 items-center justify-center capitalize text-sm"
        >
          <BsArrow90DegRight className="text-primary" />
          <div>Redo</div>
        </Button>
      </div> */}
      {/* <div className="mx-auto mt-8 mb-8">
        <div className="text-center mb-1">Rally Count</div>
        <div className="border rounded-lg flex">
          <Button
            onClick={() => {
              setSingleData((d) => ({ ...d, rallyCount: d.rallyCount - 1 }));
            }}
            disabled={singleData.rallyCount == 1}
            className={`px-12 py-6 rounded-l-lg bg-primary ${
              singleData.rallyCount == 1 && "bg-primary/50"
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
      </div> */}

      <Button
        className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
        onClick={() => {
          reset();
        }}
      >
        Clear
      </Button>

      <div className="flex justify-center my-5 gap-8 px-1 mt-4">
        {tempScore.servePlacement == "" ? (
          <ServePlacementBody
            score={score}
            tempScore={tempScore}
            singleData={singleData}
            isOnFault={isOnFault}
            setTempScore={setTempScore}
            setSingleData={setSingleData}
            registerScore={registerScore}
          />
        ) : tempScore.servePlacement == "net" ||
          tempScore.servePlacement == "fault" ? (
          !tempScore.p1Reaction || !tempScore.p2Reaction ? (
            <PlayerReaction
              tempScore={tempScore}
              singleData={singleData}
              setTempScore={setTempScore}
              setSingleData={setSingleData}
              registerScore={registerScore}
            />
          ) : (
            <>{JSON.stringify(tempScore)}</>
          )
        ) : tempScore.type == "" ? (
          <div className="col-span-3 grid grid-cols-3  gap-4">
            {typeData.map((data) => (
              <GamePointButtons
                key={data.name}
                onClick={() => {
                  setTempScore((d) => ({ ...d, type: data.name }));
                }}
                isActive={data.isActive}
                disabled={data.disabled}
                name={data.name}
                type={score.serve == "player1" ? "server" : "againest"}
              />
            ))}
          </div>
        ) : tempScore.type == "ace" ? (
          <div>
            <PlayerReaction
              tempScore={tempScore}
              singleData={singleData}
              setTempScore={setTempScore}
              setSingleData={setSingleData}
              registerScore={registerScore}
            />
          </div>
        ) : ["returnWinner", "returnError", "forcedReturnError"].includes(
            tempScore.type
          ) ? (
          !tempScore.placement || !tempScore.missedShotWay ? (
            <Shots
              setTempScore={setTempScore}
              setSingleData={setSingleData}
              registerScore={registerScore}
            />
          ) : (
            <div>
              <PlayerReaction
                tempScore={tempScore}
                singleData={singleData}
                setTempScore={setTempScore}
                setSingleData={setSingleData}
                registerScore={registerScore}
              />
            </div>
          )
        ) : tempScore.type == "ballInCourt" ? (
          <div className="col-span-3 grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-3">
              {winner1Data.map((data) => (
                <GamePointButtons
                  key={data.name}
                  onClick={() => {
                    setSingleData((d) => ({
                      ...d,
                      winner: data.winner as any,
                    }));
                    setTempScore((d) => ({ ...d, type: data.value }));
                  }}
                  isActive={data.isActive}
                  disabled={data.disabled}
                  name={data.name}
                  type={score.serve == "player1" ? "server" : "againest"}
                />
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {winner2Data.map((data) => (
                <GamePointButtons
                  key={data.name}
                  onClick={() => {
                    setSingleData((d) => ({ ...d, winner: data.winner }));
                    setTempScore((d) => ({ ...d, type: data.value }));
                  }}
                  isActive={data.isActive}
                  disabled={data.disabled}
                  name={data.name}
                  type={score.serve == "player1" ? "server" : "againest"}
                />
              ))}
            </div>
          </div>
        ) : tempScore.rallies == "" ? (
          <ChooseRally
            tempScore={tempScore}
            singleData={singleData}
            setTempScore={setTempScore}
            setSingleData={setSingleData}
            registerScore={registerScore}
          />
        ) : !tempScore.placement || !tempScore.missedShotWay ? (
          <Shots
            setTempScore={setTempScore}
            setSingleData={setSingleData}
            registerScore={registerScore}
          />
        ) : (
          <div>
            <PlayerReaction
              tempScore={tempScore}
              singleData={singleData}
              setTempScore={setTempScore}
              setSingleData={setSingleData}
              registerScore={registerScore}
            />
          </div>
        )}
      </div>

      {/* <Button
        // disabled={player == null}
        onClick={() => registerScore()}
        className={`px-8 py-2 rounded-full ${
          singleData.winner != "" ? "bg-primary" : "bg-primary/70"
        }  text-white w-fit mx-auto mt-2 mb-12`}
      >
        Register Score
      </Button> */}
    </div>
  );
};

const ServePlacementBody = ({
  setTempScore,
  setSingleData,
  registerScore,
  isOnFault,
  tempScore,
  singleData,
  score,
}: {
  setTempScore: Function;
  setSingleData: Function;
  registerScore: Function;
  tempScore: Score;
  singleData: dataTrackerType;
  isOnFault: boolean;
  score: ScoreInf;
}) => {
  const servePlacements = [
    { name: "wide", value: "wide", winner: score.serve },
    { name: "body", value: "body", winner: score.serve },
    { name: "t", value: "t", winner: score.serve },
    {
      name: !isOnFault ? "Fault" : "Double Fault",
      value: "net",
      winner: getAgainest(score.serve),
    },
  ];
  return (
    <>
      {servePlacements.map((data) => (
        <GamePointButtons
          key={data.name}
          onClick={() => {
            if (!isOnFault && data.value == "net") {
              registerScore(tempScore, { ...singleData, goalType: "fault" });
              return;
            }
            setTempScore((d: Score) => ({
              ...d,
              servePlacement: data.value as any,
            }));
            setSingleData((d: dataTrackerType) => ({
              ...d,
              winner: data.winner,
              goalType: data.value == "net" ? "fault" : "pass",
            }));
          }}
          name={data.name}
        />
      ))}
    </>
  );
};

const PlayerReaction = ({
  setTempScore,
  tempScore,
  singleData,
  setSingleData,
  registerScore,
}: {
  setTempScore: Function;
  tempScore: Score;
  singleData: dataTrackerType;
  setSingleData: Function;
  registerScore: Function;
}) => {
  const reactions = [
    { value: "negativeResponse", label: "Negative Response" },
    { value: "positiveResponse", label: "Positive Response" },
    { value: "negativeSelfTalk", label: "Negative Self Talk" },
    { value: "positiveSelfTalk", label: "Positive Self Talk" },
    { value: "noResponse", label: "No Response" },
  ];

  const [p1Reaction, setP1Reaction] = useState<string>("noResponse");
  const [p2Reaction, setP2Reaction] = useState<string>("noResponse");

  const handleNextClick = () => {
    if (p1Reaction && p2Reaction) {
      const updatedScore = { ...tempScore, p1Reaction, p2Reaction };
      const updatedCheck = { ...singleData, goalType: "pass" };
      registerScore(updatedScore, updatedCheck);
    } else {
      alert("Please select reactions for both players.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label htmlFor="p1Reaction" className="mb-2">
            Player 1 Reaction
          </label>
          <select
            id="p1Reaction"
            onChange={(e) => setP1Reaction(e.target.value)}
            value={p1Reaction}
            className="p-2 border rounded"
          >
            <option value="">Select Reaction</option>
            {reactions.map((reaction) => (
              <option key={reaction.value} value={reaction.value}>
                {reaction.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="p2Reaction" className="mb-2">
            Player 2 Reaction
          </label>
          <select
            id="p2Reaction"
            onChange={(e) => setP2Reaction(e.target.value)}
            className="p-2 border rounded"
            value={p2Reaction}

          >
            <option value="">Select Reaction</option>
            {reactions.map((reaction) => (
              <option key={reaction.value} value={reaction.value}>
                {reaction.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        onClick={handleNextClick}
        className="my-3 py-2 rounded mt-5 bg-primary text-white px-4"
      >
        Next
      </Button>
    </div>
  );
};

const Shots = ({
  setTempScore,
  setSingleData,
  registerScore,
}: {
  setTempScore: Function;
  setSingleData: Function;
  registerScore: Function;
}) => {
  const placements = ["downTheLine", "crossCourt", "dropShot"];
  const shotTypes = [
    "forehand",
    "backhand",
    "forehandVolley",
    "backhandVolley",
    "forehandSwingingVolley",
    "backhandSwingingVolley",
    "forehandSlice",
    "backhandSlice",
    "overhead",
    "forehandDropShot",
    "backhandDropShot",
  ];

  const [placement, setPlacement] = useState<string>("");
  const [shotType, setShotType] = useState<string>("");

  const handleNextClick = () => {
    if (placement && shotType) {
      setTempScore((d: any) => ({ ...d, placement, missedShotWay: shotType }));
      // registerScore();
    } else {
      alert("Please select both placement and shot type.");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label htmlFor="placement" className="mb-2">
            Placement
          </label>
          <select
            id="placement"
            onChange={(e) => setPlacement(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Placement</option>
            {placements.map((placement) => (
              <option key={placement} value={placement}>
                {placement}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="shotType" className="mb-2">
            Shot Type
          </label>
          <select
            id="shotType"
            onChange={(e) => setShotType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Shot Type</option>
            {shotTypes.map((shotType) => (
              <option key={shotType} value={shotType}>
                {shotType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Button
        onClick={handleNextClick}
        className="my-3 py-2 rounded mt-5 bg-primary text-white px-4"
      >
        Next
      </Button>
    </div>
  );
};

const ChooseRally = ({
  setTempScore,
  tempScore,
  singleData,
  setSingleData,
  registerScore,
}: {
  setTempScore: Function;
  tempScore: Score;
  singleData: dataTrackerType;
  setSingleData: Function;
  registerScore: Function;
}) => {
  const [rallies, setRallies] = useState("");
  const rallyChoices = [
    "oneToFour",
    "fiveToEight",
    "nineToTwelve",
    "thirteenToTwenty",
    "twentyOnePlus",
  ];

  const handleNextClick = () => {
    if (rallies) {
      setTempScore((d: any) => ({ ...d, rallies }));
      // registerScore();
    } else {
      alert("Please Select Rally Count.");
    }
  };
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="RallyCount" className="mb-2">
          Rally Count
        </label>
        <select
          id="RallyCount"
          onChange={(e) => setRallies(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select Rally Count</option>
          {rallyChoices.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={handleNextClick}
        className="my-3 py-2 rounded mt-5 bg-primary text-white px-4"
      >
        Next
      </Button>
    </div>
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
      {name} {disabled}
    </Button>
  );
};

export default OneGame;
