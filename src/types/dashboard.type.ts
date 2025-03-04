export interface TodoPayload {
  title: string;
  dueDate: Date;
  timezone: string;
  isCompleted?: boolean;
}

export interface Todo {
  _id: string;
  userId: string;
  title: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Player Interface
type EmailAddress = {
  email: string;
};

type PhoneNumber = {
  countryCode: string;
  number: string;
};

type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
  id: string;
};

// Match Interface
type MatchCreator = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
};

type UpcomingMatch = {
  _id: string;
  p1: Omit<Player, "emailAddress" | "phoneNumber" | "lastOnline"> & {
    dateOfBirth: string;
    gender: string;
  };
  p2: Omit<Player, "emailAddress" | "phoneNumber" | "lastOnline"> & {
    dateOfBirth: string;
    gender: string;
  };
  p1IsObject: boolean;
  p2IsObject: boolean;
  p1Name: string;
  p2Name: string;
  matchCreator: MatchCreator;
  matchType: string;
  matchCategory: string;
  status: string;
  totalGameTime: number;
  tieBreakRule: number;
  indoor: boolean;
  courtSurface: string;
  note: string;
  date: string;
  p1Status: string;
  p2Status: string;
  winner: string | null;
  sets: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Weekly Session Interface
type WeeklySession = {
  Monday: number;
  Tuesday: number;
  Wednesday: number;
  Thursday: number;
  Friday: number;
  Saturday: number;
  Sunday: number;
};

// Main Response Interface
export type DashboardResponseData = {
  players: Player[];
  totalPlayers?: number;
  totalMatches?: number;
  totalSessions?: number;
  upcomingMatch: UpcomingMatch;
  topPlayer: Player;
  weeklySession: WeeklySession;
};

interface PlayerPoints {
  won: number;
  wonPercentage: number;
}

interface Points {
  total: number;
  p1: PlayerPoints;
  p2: PlayerPoints;
}

interface PlayerWinners {
  percentage: number;
  forehand: number;
  backhand: number;
  returnForehand: number;
  returnBackhand: number;
}

interface Winners {
  total: number;
  p1: PlayerWinners;
  p2: PlayerWinners;
}

interface ShotErrors {
  total: number;
  volley: number;
  slice: number;
  swingingVolley?: number;
  dropShot?: number;
}

interface PlayerErrors {
  total: number;
  forced: {
    percentage: number;
    forehand: ShotErrors;
    backhand: ShotErrors;
  };
  unforced: {
    percentage: number;
    forehand: ShotErrors;
    backhand: ShotErrors;
  };
}

interface Errors {
  total: number;
  p1: PlayerErrors;
  p2: PlayerErrors;
}

interface LastShot {
  winPercentage: number;
  losePercentage: number;
}

interface LastShots {
  p1: LastShot;
  p2: LastShot;
}

interface PlayerBreakPoints {
  total: number;
  saved: number;
  savedPercentage: number;
  converted: number;
  convertedPercentage: number;
}

interface BreakPoints {
  p1: PlayerBreakPoints;
  p2: PlayerBreakPoints;
}

interface PlayerGamePoints {
  total: number;
  saved: number;
  savedPercentage: number;
  converted: number;
  convertedPercentage: number;
}

interface GamePoints {
  p1: PlayerGamePoints;
  p2: PlayerGamePoints;
}

interface PlayerServes {
  firstServesWon: number;
  firstServesWonPercentage: number;
  firstServesLost: number;
  firstServesLostPercentage: number;
  secondServesWon: number;
  secondServesWonPercentage: number;
  secondServesLost: number;
  secondServesLostPercentage: number;
}

interface Serves {
  total: number;
  p1: PlayerServes;
  p2: PlayerServes;
}

interface ServePlacement {
  wide: number;
  widePercentage: number;
  body: number;
  bodyPercentage: number;
  t: number;
  tPercentage: number;
  net: number;
  netPercentage: number;
}

interface ServePlacements {
  p1: ServePlacement;
  p2: ServePlacement;
}

interface AcesPlacement extends ServePlacement {}

interface ReturnStats {
  total: number;
  firstServe: number;
  firstServePercentage: number;
  firstServeWon: number;
  firstServeWonPercentage: number;
  firstServeLost: number;
  firstServeLostPercentage: number;
  secondServe: number;
  secondServePercentage: number;
  secondServeWon: number;
  secondServeWonPercentage: number;
  secondServeLost: number;
  secondServeLostPercentage: number;
}

interface PlayerReturnStats {
  p1: ReturnStats;
  p2: ReturnStats;
}

interface ReturnPlacementDetails {
  wide: number;
  widePercentage: number;
  body: number;
  bodyPercentage: number;
  t: number;
  tPercentage: number;
  net: number;
  netPercentage: number;
}

interface ReturnPlacement {
  firstServe: ReturnPlacementDetails;
  firstServeForehand: ReturnPlacementDetails;
  firstServeBackhand: ReturnPlacementDetails;
  secondServe: ReturnPlacementDetails;
  secondServeForehand: ReturnPlacementDetails;
  secondServeBackhand: ReturnPlacementDetails;
}

interface PlayerReturnPlacement {
  p1: ReturnPlacement;
  p2: ReturnPlacement;
}

interface RallyLengthFrequency {
  oneToFour: number;
  fiveToEight: number;
  nineToTwelve: number;
  thirteenToTwenty: number;
  twentyOnePlus: number;
}

export interface TennisMatchStats {
  points: Points;
  winners: Winners;
  errorss: Errors;
  lastShot: LastShots;
  breakPoints: BreakPoints;
  gamePoints: GamePoints;
  serves: Serves;
  firstServePlacement: ServePlacements;
  secondServePlacement: ServePlacements;
  acesPlacement: ServePlacements;
  returnStats: PlayerReturnStats;
  returnPlacement: PlayerReturnPlacement;
  rallyLengthFrequency: RallyLengthFrequency;
  averageRally: number;
}
