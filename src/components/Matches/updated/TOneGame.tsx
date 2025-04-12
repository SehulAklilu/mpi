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
import TennisCourt from "./TennisCourt";

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
      name: "Ace",
      value: "ace",
      disabled: singleData.rallyCount > 1,
      isActive: score.serve != "player1",
    },
    {
      name: "Return Winner",
      value: "returnWinner",
      isActive: score.serve != "player1",
    },
    {
      name: "Return Error",
      value: "returnError",
      isActive: score.serve == "player1",
    },
    {
      name: "Forced Return Error",
      value: "forcedReturnError",
      isActive: score.serve != "player1",
    },
    {
      name: "Ball In Court",
      value: "ballInCourt",
      isActive: false,
    },
  ];
  const winner1Data = [
    {
      name: "Winner",
      winner: score.serve,
      value: "p1Winner",
      disabled: false,
      isActive: score.serve != "player1",
    },
    {
      name: "Forced Error",
      winner: score.serve,
      value: "p1ForcedError",
      disabled: false,
      isActive: score.serve != "player1",
    },
    {
      name: "Unforced Error",
      winner: score.serve,
      value: "p1UnforcedError",
      disabled: false,
      isActive: score.serve != "player1",
    },
  ];
  const winner2Data = [
    {
      name: "Winner",
      winner: getAgainest(score.serve),
      value: "p2Winner",
      disabled: false,
      isActive: score.serve == "player1",
    },
    {
      name: "Forced Error",
      value: "p2ForcedError",
      winner: getAgainest(score.serve),
      disabled: false,
      isActive: score.serve == "player1",
    },
    {
      name: "Unforced Error",
      value: "p2UnforcedError",
      winner: getAgainest(score.serve),
      disabled: false,
      isActive: score.serve == "player1",
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
  const [lastServer, setLastServer] = useState(score.serve);
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
    console.log(timers, "TT", lastBPT);

    if (updatedCheck.goalType == "") {
      return;
    }
    let updatedFinalData = { ...finalData, betweenPointDuration: lastBPT };

    if (updatedCheck.goalType == "fault") {
      if (isOnFault) {
        setStartedServing(true);
        setIsFirstServe(true);
        setShowServe(false);
        addPoint(updatedCheck.winner, updatedFinalData, getTimers);
      }
      setIsOnFault((d) => !d);
    } else {
      setStartedServing(true);
      setIsFirstServe(true);
      setShowServe(false);
      isOnFault && setIsOnFault(false);
      addPoint(updatedCheck.winner, updatedFinalData, getTimers);
    }
    console.log(updatedFinalData, updatedCheck);
    reset();
  };

  const [startedServing, setStartedServing] = useState(false);
  const [firstServing, setFirstServing] = useState(false);
  const [showServe, setShowServe] = useState(false);
  const [isFirstServe, setIsFirstServe] = useState(false);
  const [showChangeOverTimer, setShowChangeOverTimer] = useState(false);
  const [lastBPT, setLastBPT] = useState(0);
  const [lastCOT, setLastCOT] = useState(0);

  const [timers, setTimers] = useState({
    mainTimer: 0,
    betweenPointTimer: 0,
    changeOverTimer: 0,
  });

  useEffect(() => {
    const func = () => {
      if (score.serve != lastServer) {
        setStartedServing(false);
        setShowChangeOverTimer(true);
        setLastServer(score.serve);
      }
    };

    func();
  }, [score.serve]);

  const getTimers = () => {
    return { timers, lastCOT, lastBPT };
  };

  const resetTempScore = (name: keyof Score, value = "") => {
    setTempScore((d) => ({ ...d, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      <div className=""></div>
      <div className="flex flex-col items-center">
        <MainTimer
          start={firstServing}
          mainTimer={timers.mainTimer}
          setTimers={setTimers}
        />

        {isFirstServe && (
          <BetweenPointTimer
            start={startedServing}
            betweenPointTimer={timers.betweenPointTimer}
            setTimers={setTimers}
          />
        )}

        <ChangeOverTimer
          start={showChangeOverTimer}
          changeOverTimer={timers.changeOverTimer}
          setTimers={setTimers}
        />
      </div>

      {/* <Button
        className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
        onClick={() => {
          reset();
        }}
      >
        Clear
      </Button> */}

      <div className="flex  justify-center my-5 gap-8 px-1 mt-4">
        {!showServe ? (
          <Button
            className="px-7 py-4 mt-5 rounded-lg border bg-white"
            onClick={() => {
              if (firstServing) {
                setLastBPT(timers.betweenPointTimer);
                console.log(timers.betweenPointTimer, "Last");
                setStartedServing(false);
              } else {
                setFirstServing(true);
              }
              setShowServe(true);
              if (showChangeOverTimer) {
                setLastCOT(timers.changeOverTimer);
                setShowChangeOverTimer(false);
              }
            }}
          >
            {score.serve} start Serving
          </Button>
        ) : tempScore.servePlacement == "" ? (
          <ServePlacementBody
            reset={reset}
            back={reset}
            score={score}
            tempScore={tempScore}
            singleData={singleData}
            isOnFault={isOnFault}
            setTempScore={setTempScore}
            setSingleData={setSingleData}
            registerScore={registerScore}
            server={score.serve}
          />
        ) : tempScore.servePlacement == "net" ||
          tempScore.servePlacement == "fault" ? (
          !tempScore.p1Reaction || !tempScore.p2Reaction ? (
            <PlayerReaction
              reset={reset}
              back={() => {
                resetTempScore("servePlacement");
              }}
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
          <div>
            <ClearDivs reset={reset} back={reset} />
            <div className=" grid grid-cols-2 place-items-center   gap-4">
              {typeData.map((data) => (
                <GamePointButtons
                  key={data.name}
                  onClick={() => {
                    setTempScore((d) => ({ ...d, type: data.value }));
                  }}
                  name={data.name}
                  isActive={data.isActive}
                  wf={data.value == "ballInCourt" ? "col-span-2 w-full" : ""}
                />
              ))}
            </div>
          </div>
        ) : tempScore.type == "ace" ? (
          <div>
            <PlayerReaction
              reset={reset}
              back={() => resetTempScore("type")}
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
              reset={reset}
              back={() => resetTempScore("type")}
              setTempScore={setTempScore}
              setSingleData={setSingleData}
              registerScore={registerScore}
            />
          ) : (
            <div>
              <PlayerReaction
                reset={reset}
                back={() => {
                  resetTempScore("placement");
                  resetTempScore("missedShotWay");
                }}
                tempScore={tempScore}
                singleData={singleData}
                setTempScore={setTempScore}
                setSingleData={setSingleData}
                registerScore={registerScore}
              />
            </div>
          )
        ) : tempScore.type == "ballInCourt" ? (
          <div className="flex flex-col">
            <ClearDivs reset={reset} back={() => resetTempScore("type")} />
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
                    isActive={score.serve != "player1"}
                    disabled={data.disabled}
                    name={data.name}
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
                    isActive={score.serve == "player1"}
                    disabled={data.disabled}
                    name={data.name}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : tempScore.rallies == "" ? (
          <ChooseRally
            reset={reset}
            back={() => {
              resetTempScore("type", "ballInCourt");
            }}
            tempScore={tempScore}
            singleData={singleData}
            setTempScore={setTempScore}
            setSingleData={setSingleData}
            registerScore={registerScore}
          />
        ) : !tempScore.placement || !tempScore.missedShotWay ? (
          <Shots
            reset={reset}
            back={() => resetTempScore("rallies")}
            setTempScore={setTempScore}
            setSingleData={setSingleData}
            registerScore={registerScore}
          />
        ) : (
          <div>
            <PlayerReaction
              reset={reset}
              back={() => {
                resetTempScore("rallies");
                resetTempScore("missedShotWay");
              }}
              tempScore={tempScore}
              singleData={singleData}
              setTempScore={setTempScore}
              setSingleData={setSingleData}
              registerScore={registerScore}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const MainTimer = ({
  start,
  mainTimer,
  setTimers,
}: {
  start: boolean;
  mainTimer: number;
  setTimers: Function;
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | any;
    if (start) {
      timer = setInterval(() => {
        setTimers((prevTime: any) => ({
          ...prevTime,
          mainTimer: prevTime.mainTimer + 1,
        }));
      }, 1000);
    } else {
      timer && clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [start]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div className=" py-4 flex flex-col items-center justify-center">
      <div>Main Timer</div>
      <div>{formatTime(mainTimer)}</div>
    </div>
  );
};

const BetweenPointTimer = ({
  start,
  betweenPointTimer,
  setTimers,
}: {
  start: boolean;
  betweenPointTimer: number;
  setTimers: Function;
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | any;
    if (start) {
      timer = setInterval(() => {
        setTimers((prevTime: any) => ({
          ...prevTime,
          betweenPointTimer: prevTime.betweenPointTimer + 1,
        }));
      }, 1000);
    } else {
      timer && clearInterval(timer);
      setTimers((prevTime: any) => ({
        ...prevTime,
        betweenPointTimer: 0,
      }));
    }
    return () => clearInterval(timer);
  }, [start]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return start ? (
    <div className=" py-2 border border-primary w-fit px-4 my-2  flex justify-center">
      <div className="w-full py-4 flex flex-col items-center justify-center">
        <div>Between Point Timer</div>
        <div>{formatTime(betweenPointTimer)}</div>
      </div>
    </div>
  ) : (
    <></>
  );
};

const ChangeOverTimer = ({
  start,
  changeOverTimer,
  setTimers,
}: {
  start: boolean;
  changeOverTimer: number;
  setTimers: Function;
}) => {
  useEffect(() => {
    let timer: NodeJS.Timeout | any;
    if (start) {
      timer = setInterval(() => {
        setTimers((prevTime: any) => ({
          ...prevTime,
          changeOverTimer: prevTime.changeOverTimer + 1,
        }));
      }, 1000);
    } else {
      timer && clearInterval(timer);
      setTimers((prevTime: any) => ({
        ...prevTime,
        changeOverTimer: 0,
      }));
    }
    return () => clearInterval(timer);
  }, [start]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return start ? (
    <div className=" py-2 border border-primary w-fit px-4 my-2  flex justify-center">
      <div className="w-full py-4 flex flex-col items-center justify-center">
        <div>Change Over Timer </div>
        <div>{formatTime(changeOverTimer)}</div>
      </div>
    </div>
  ) : (
    <></>
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
  reset,
  back,
  server,
}: {
  setTempScore: Function;
  setSingleData: Function;
  registerScore: Function;
  tempScore: Score;
  singleData: dataTrackerType;
  isOnFault: boolean;
  score: ScoreInf;
  reset: Function;
  back: Function;
  server: string | null;
}) => {
  const servePlacements = [
    {
      name: "wide",
      value: "wide",
      winner: score.serve,
      isActive: score.serve != "player1",
    },
    {
      name: "body",
      value: "body",
      winner: score.serve,
      isActive: score.serve != "player1",
    },
    {
      name: "t",
      value: "t",
      winner: score.serve,
      isActive: score.serve != "player1",
    },
    // {
    //   name: !isOnFault ? "Fault" : "Double Fault",
    //   value: "net",
    //   winner: getAgainest(score.serve),
    //   isActive: score.serve == "player1",
    // },
  ];

  const handleFault = () => {
    if (!isOnFault) {
      // First fault, just register it
      registerScore(tempScore, { ...singleData, goalType: "fault" });
    } else {
      // Double fault, opponent gets a point
      registerScore(tempScore, {
        ...singleData,
        goalType: "double fault",
        winner: getAgainest(score.serve),
      });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center w-[50%]">
      <div className="flex w-fit mx-auto gap-5 mb-4">
        <Button
          className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
          onClick={() => {
            reset();
          }}
        >
          Clear
        </Button>
        <Button
          className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
          onClick={() => {
            back();
          }}
        >
          Back
        </Button>
      </div>
      <div className="grid grid-cols-3 justify-center items-center gap-5 mx-auto">
        {/* {servePlacements.map((data) => (
          <GamePointButtons
            key={data.name}
            onClick={() => {
              if (!isOnFault && data.value == "net") {
                registerScore(tempScore, { ...singleData, goalType: "fault" })
                return
              }
              setTempScore((d: Score) => ({
                ...d,
                servePlacement: data.value as any,
              }))
              setSingleData((d: dataTrackerType) => ({
                ...d,
                winner: data.winner,
                goalType: data.value == "net" ? "fault" : "pass",
              }))
            }}
            isActive={data.isActive}
            wf={data.value == "net" ? " col-span-3 w-full mx-auto " : ""}
            name={data.name}
          />
        ))} */}
      </div>
      <TennisCourt
        handleFault={handleFault}
        handleNet={() => {}}
        isOnFault={isOnFault}
        server={server || ""}
      >
        <>
          {servePlacements.map((data) => (
            <GamePointButtons
              key={data.name}
              onClick={() => {
                if (!isOnFault && data.value == "net") {
                  registerScore(tempScore, {
                    ...singleData,
                    goalType: "fault",
                  });
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
              isActive={data.isActive}
              wf={data.value == "net" ? " col-span-3 w-full mx-auto " : ""}
              name={data.name}
            />
          ))}
        </>
      </TennisCourt>
    </div>
  );
};

const PlayerReaction = ({
  setTempScore,
  tempScore,
  singleData,
  setSingleData,
  registerScore,
  reset,
  back,
}: {
  setTempScore: Function;
  tempScore: Score;
  singleData: dataTrackerType;
  setSingleData: Function;
  registerScore: Function;
  reset: Function;
  back: Function;
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
      <div className="flex w-fit mx-auto gap-5 mb-4">
        <Button
          className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
          onClick={() => {
            reset();
          }}
        >
          Clear
        </Button>
        <Button
          className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
          onClick={() => {
            back();
          }}
        >
          Back
        </Button>
      </div>
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
  reset,
  back,
}: {
  setTempScore: Function;
  setSingleData: Function;
  registerScore: Function;
  reset: Function;
  back: Function;
}) => {
  // const placements = ["downTheLine", "crossCourt", "dropShot"];
  // const shotTypes = [
  //   "forehand",
  //   "backhand",
  //   "forehandVolley",
  //   "backhandVolley",
  //   "forehandSwingingVolley",
  //   "backhandSwingingVolley",
  //   "forehandSlice",
  //   "backhandSlice",
  //   "overhead",
  //   "forehandDropShot",
  //   "backhandDropShot",
  // ];

  const shotTypes = [
    { value: "forehand", label: "Forehand" },
    { value: "backhand", label: "Back Hand" },
    { value: "forehandVolley", label: "Forehand Volley" },
    { value: "backhandVolley", label: "Back Hand Volley" },
    { value: "forehandSwingingVolley", label: "Forehand Swinging Volley" },
    { value: "backhandSwingingVolley", label: "Back Hand Swinging Volley" },
    { value: "forehandSlice", label: "Forehand Slice" },
    { value: "backhandSlice", label: "Back Hand Slice" },
    { value: "overhead", label: "Overhead" },
    { value: "forehandDropShot", label: "Forehand Drop Shot" },
    { value: "backhandDropShot", label: "Back Hand Drop Shot" },
  ];

  const placements = [
    { value: "downTheLine", label: "Down The Line" },
    { value: "crossCourt", label: "Cross Court" },
    { value: "dropShot", label: "Drop Shot" },
  ];

  const [placement, setPlacement] = useState<string>("downTheLine");
  const [shotType, setShotType] = useState<string>("forehand");

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
      <ClearDivs reset={reset} back={back} />
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
            <option value="" disabled>
              Select Placement
            </option>
            {placements.map((placement) => (
              <option
                defaultChecked={placement.value == "downTheLine"}
                key={placement.value}
                value={placement.value}
              >
                {placement.label}
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
            <option value="" disabled>
              Select Shot Type
            </option>
            {shotTypes.map((shotType) => (
              <option
                key={shotType.value}
                defaultChecked={shotType.value == "forehand"}
                value={shotType.value}
              >
                {shotType.label}
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
  reset,
  back,
}: {
  setTempScore: Function;
  tempScore: Score;
  singleData: dataTrackerType;
  setSingleData: Function;
  registerScore: Function;
  reset: Function;
  back: Function;
}) => {
  const [rallies, setRallies] = useState("oneToFour");
  // const rallyChoices = [
  //   "oneToFour",
  //   "fiveToEight",
  //   "nineToTwelve",
  //   "thirteenToTwenty",
  //   "twentyOnePlus",
  // ];

  const rallyChoices = [
    { value: "oneToFour", label: "1 to 4" },
    { value: "fiveToEight", label: "5 to 8" },
    { value: "nineToTwelve", label: "9 to 12" },
    { value: "thirteenToTwenty", label: "13 to 20" },
    { value: "twentyOnePlus", label: "21+" },
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
      <ClearDivs back={back} reset={reset} />
      <div className="flex flex-col">
        <label htmlFor="RallyCount" className="mb-2">
          Rally Count
        </label>
        <select
          id="RallyCount"
          onChange={(e) => setRallies(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="" disabled>
            Select Rally Count
          </option>
          {rallyChoices.map((r) => (
            <option
              defaultChecked={r.value == "oneToFour"}
              key={r.value}
              value={r.value}
            >
              {r.label}
            </option>
          ))}
        </select>
      </div>
      <Button
        onClick={handleNextClick}
        className="my-3 py-2 w-full rounded mt-5 bg-primary text-white px-4"
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
  wf,
}: {
  name: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: Function;
  type?: "server" | "againest";
  wf?: string | null;
}) => {
  const css = isActive
    ? "bg-primary text-white border-2 border-[#FDB332FF]"
    : type == "againest"
    ? "text-white bg-primary "
    : "";

  return (
    <Button
      disabled={disabled}
      onClick={() => onClick()}
      className={` ${
        name === "wide"
          ? "bg-[#abb265]"
          : name === "body"
          ? "bg-[#6b5580]"
          : name === "t"
          ? "bg-[#3e8e6e]"
          : "bg-white"
      } px-1 capitalize w-40 h-24  shadow rounded-xl  ${css} ${
        disabled
          ? "cursor-not-allowed  text-gray-400 border border-gray-300 "
          : "shadow-primary"
      } ${wf}`}
    >
      {name} {disabled}
    </Button>
  );
};

export default OneGame;

const ClearDivs = ({ reset, back }: { reset: Function; back: Function }) => {
  return (
    <div className="flex w-fit mx-auto gap-5 mb-4">
      <Button
        className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
        onClick={() => {
          reset();
        }}
      >
        Clear
      </Button>
      <Button
        className="bg-primary text-white py-1 px-4 text-sm rounded-lg w-fit mx-auto"
        onClick={() => {
          back();
        }}
      >
        Back
      </Button>
    </div>
  );
};
