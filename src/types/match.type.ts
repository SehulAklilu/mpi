// type Player = {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   dateOfBirth: string;
//   gender: string;
//   avatar: string;
// };

type MatchCreator = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
};

export type MatchData = {
  _id: string;
  p1?: Player | null;
  p2?: Player | null;
  p1Name?: string;
  p2Name?: string;
  p1IsObject: boolean;
  p2IsObject: boolean;
  matchCreator: MatchCreator;
  matchType: string;
  matchCategory: string;
  tournamentType: string;
  tournamentLevel: string;
  status: string;
  totalGameTime: number;
  tieBreakRule: number;
  indoor: boolean;
  courtSurface: string;
  note: string;
  date: string;
  p1Status: string;
  p2Status: string;
  winner: string;
  sets: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  p1MatchReport: any;
  p2MatchReport: any;
  report: any;
};

export interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string; // Optional since it's not present in `matchCreator`
  gender?: string; // Optional since it's not present in `matchCreator`
  avatar: string;
  role?: string; // Optional since it's only present in `matchCreator`
}

interface Score {
  p1Score: string;
  p2Score: string;
  isSecondService: boolean;
  p1Reaction: string;
  p2Reaction: string;
  type: string;
  missedShot: string;
  missedShotWay: string;
  servePlacement: string;
  betweenPointDuration: number;
  rallies: string;
}

export interface Game {
  gameNumber: number;
  scores: Score[];
  winner: string;
  changeoverDuration: number;
  server: string;
  _id: string;
}

interface ServiceReport {
  totalServices: number;
  firstServicePercentage: number;
  secondServicePercentage: number;
  aces: number;
  doubleFaults: number;
  firstServices: number;
  secondServices: number;
}

interface PointsReport {
  totalPointsWon: number;
  winners: number;
  unforcedErrors: number;
  forcedErrors: number;
}

interface RalliesReport {
  oneToFour: number;
  fiveToEight: number;
  nineToTwelve: number;
  thirteenToTwenty: number;
  twentyOnePlus: number;
}

interface ConversionReport {
  firstServicePointsWon: number;
  secondServicePointsWon: number;
  receivingPointsWon: number;
  breakPoints: number;
  gamePoints: number;
}

interface ResponseReport {
  negativeResponses: number;
  positiveResponses: number;
  negativeSelfTalks: number;
  positiveSelfTalks: number;
  noResponses: number;
}

interface SetReport {
  service: ServiceReport;
  points: PointsReport;
  rallies: RalliesReport;
  conversion: ConversionReport;
  response: ResponseReport;
}

export interface Set {
  p1TotalScore: number;
  p2TotalScore: number;
  winner: string;
  p1TotalReturns: number;
  p2TotalReturns: number;
  games: Game[];
  p1SetReport: SetReport;
  p2SetReport: SetReport;
  _id: string;
}

interface MatchReport {
  service: ServiceReport;
  points: PointsReport;
  rallies: RalliesReport;
  conversion: ConversionReport;
  response: ResponseReport;
}

interface PointsSummary {
  total: number;
  p1: {
    won: number;
    wonPercentage: number;
  };
  p2: {
    won: number;
    wonPercentage: number;
  };
}

interface WinnersSummary {
  total: number;
  p1: {
    percentage: number;
    forehand: number;
    backhand: number;
    returnForehand: number;
    returnBackhand: number;
  };
  p2: {
    percentage: number;
    forehand: number;
    backhand: number;
    returnForehand: number;
    returnBackhand: number;
  };
}

interface ErrorsSummary {
  total: number;
  p1: {
    forced: {
      percentage: number;
      forehand: {
        total: number;
        volley: number;
        slice: number;
      };
      backhand: {
        total: number;
        volley: number;
        slice: number;
      };
    };
    unforced: {
      percentage: number;
      forehand: {
        total: number;
        volley: number;
        slice: number;
        swingingVolley: number;
        dropShot: number;
      };
      backhand: {
        total: number;
        volley: number;
        slice: number;
        swingingVolley: number;
        dropShot: number;
      };
    };
  };
  p2: {
    forced: {
      percentage: number;
      forehand: {
        total: number;
        volley: number;
        slice: number;
      };
      backhand: {
        total: number;
        volley: number;
        slice: number;
      };
    };
    unforced: {
      percentage: number;
      forehand: {
        total: number;
        volley: number;
        slice: number;
        swingingVolley: number;
        dropShot: number;
      };
      backhand: {
        total: number;
        volley: number;
        slice: number;
        swingingVolley: number;
        dropShot: number;
      };
    };
  };
}

interface LastShotSummary {
  p1: {
    winPercentage: number;
    losePercentage: number;
  };
  p2: {
    winPercentage: number;
    losePercentage: number;
  };
}

interface BreakPointsSummary {
  p1: {
    total: number;
    saved: number;
    savedPercentage: number;
    converted: number;
    convertedPercentage: number;
  };
  p2: {
    total: number;
    saved: number;
    savedPercentage: number;
    converted: number;
    convertedPercentage: number;
  };
}

interface GamePointsSummary {
  p1: {
    total: number;
    saved: number;
    savedPercentage: number;
    converted: number;
    convertedPercentage: number;
  };
  p2: {
    total: number;
    saved: number;
    savedPercentage: number;
    converted: number;
    convertedPercentage: number;
  };
}

interface ServeSummary {
  total: number;
  p1: {
    firstServesWon: number;
    firstServesWonPercentage: number;
    firstServesLost: number;
    firstServesLostPercentage: number;
    secondServesWon: number;
    secondServesWonPercentage: number;
    secondServesLost: number;
    secondServesLostPercentage: number;
  };
  p2: {
    firstServesWon: number;
    firstServesWonPercentage: number;
    firstServesLost: number;
    firstServesLostPercentage: number;
    secondServesWon: number;
    secondServesWonPercentage: number;
    secondServesLost: number;
    secondServesLostPercentage: number;
  };
}

interface ServePlacementSummary {
  p1: {
    wide: number;
    widePercentage: number;
    body: number;
    bodyPercentage: number;
    t: number;
    tPercentage: number;
    net: number;
    netPercentage: number;
  };
  p2: {
    wide: number;
    widePercentage: number;
    body: number;
    bodyPercentage: number;
    t: number;
    tPercentage: number;
    net: number;
    netPercentage: number;
  };
}

interface AcesPlacementSummary {
  p1: {
    wide: number;
    widePercentage: number;
    body: number;
    bodyPercentage: number;
    t: number;
    tPercentage: number;
    net: number;
    netPercentage: number;
  };
  p2: {
    wide: number;
    widePercentage: number;
    body: number;
    bodyPercentage: number;
    t: number;
    tPercentage: number;
    net: number;
    netPercentage: number;
  };
}

interface ReturnStatsSummary {
  p1: {
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
  };
  p2: {
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
  };
}

interface ReturnPlacementSummary {
  p1: {
    firstServe: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    firstServeForehand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    firstServeBackhand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    secondServe: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    secondServeForehand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    secondServeBackhand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
  };
  p2: {
    firstServe: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    firstServeForehand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    firstServeBackhand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    secondServe: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    secondServeForehand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
    secondServeBackhand: {
      wide: number;
      widePercentage: number;
      body: number;
      bodyPercentage: number;
      t: number;
      tPercentage: number;
      net: number;
      netPercentage: number;
    };
  };
}

interface RallyLengthFrequency {
  oneToFour: number;
  fiveToEight: number;
  nineToTwelve: number;
  thirteenToTwenty: number;
  twentyOnePlus: number;
}

interface Report {
  points: PointsSummary;
  winners: WinnersSummary;
  errorss: ErrorsSummary;
  lastShot: LastShotSummary;
  breakPoints: BreakPointsSummary;
  gamePoints: GamePointsSummary;
  serves: ServeSummary;
  firstServePlacement: ServePlacementSummary;
  secondServePlacement: ServePlacementSummary;
  acesPlacement: AcesPlacementSummary;
  returnStats: ReturnStatsSummary;
  returnPlacement: ReturnPlacementSummary;
  rallyLengthFrequency: RallyLengthFrequency;
  averageRally: number;
}
export type Status =
  | "pending"
  | "confirmed"
  | "inProgress"
  | "completed"
  | "cancelled"
  | "postponed"
  | "forfeited";

export interface Match {
  _id: string;
  p1: Player;
  p2: Player;
  p1IsObject: boolean;
  p2IsObject: boolean;
  p1Name: string;
  p2Name: string;
  matchCreator: Player;
  matchType: string;
  matchCategory: string;
  tournamentType: string;
  tournamentLevel: string;
  status: Status;
  totalGameTime: number;
  tieBreakRule: number;
  indoor: boolean;
  courtSurface: string;
  note: string;
  date: string;
  p1Status: string;
  p2Status: string;
  winner: string;
  sets: Set[];
  createdAt: string;
  updatedAt: string;
  p1MatchReport: MatchReport;
  p2MatchReport: MatchReport;
  report: Report;
}

export interface MatchResponse {
  matches: Match[];
}
