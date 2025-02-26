type Player = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  avatar: string;
};

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