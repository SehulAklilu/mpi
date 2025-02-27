
export interface TennisMatch {
  totalGameTime: number;
  sets: Set[];
}

export interface Set {
  p1TotalScore: number;
  p2TotalScore: number;
  games: Game[];
  tieBreak: TieBreak;
}

export interface Game {
  gameNumber: number;
  server: "playerOne" | "playerTwo";
  scores: Score[];
}

export interface Score {
  p1Score: number; // Changed from string to number
  p2Score: number; // Changed from string to number
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

export interface TieBreak {
  winner: "playerOne" | "playerTwo" | null;
  scores: TieBreakScore[];
}

export interface TieBreakScore {
  playerOnePoints: number;
  playerTwoPoints: number;
}


export interface Player {
  id: number; // Unique identifier for the player
  name: string; // Player's name
  scores: number[]; // Array to track scores for each set
  matchScore: number; // Total match score
}

export interface Events {
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

export interface GameState {
  players: Player[]; // List of players
  currentSet: number; // Current set number
  events: Events; // Tracks game events
}

type PointInf = number | "A";
export interface ScoreInf {
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

export interface dataTrackerType {
  goalType: scoreTrackType | "";
  serve: "player1" | "player2" | "";
  winner: "player1" | "player2" | "";
  handPosition: "Backhand" | "Forehand" | "";
  hitType: "Groundstroke" | "Approach" | "Volley" | "";
  errorType: "Forced" | "Unforced" | "";
  ballPosition: "Net" | "Backcourt" | "Alley" | "";
  rallyCount: number;
}