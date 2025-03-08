interface EmailAddress {
  email: string;
  verified: boolean;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
  __t: string;
  id: string;
}

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
  __t: string;
  id: string;
}

export interface Attendance {
  player: Player;
  response: string;
  status: string;
  _id: string;
  id: string;
}

interface Objective {
  objective: string;
  subObjective: string;
  nestedSubObjective: string;
  additionalInfo: string;
  _id: string;
}

interface Reflection {
  player: Player;
  P: number;
  R: number;
  I: number;
  M: number;
  stepsTaken: string;
  additionalInfo: string;
  _id: string;
}

interface EvaluationPerformance {
  engagement: string;
  effort: string;
  execution: string;
  _id: string;
  id: string;
}

interface CoachEvaluation {
  measurement: string;
  achievable: boolean;
  isRelevant: boolean;
  isTimeBound: boolean;
  goal: string;
  performance: EvaluationPerformance;
  additionalInfo: string;
  _id: string;
  id: string;
}

export interface Evaluation {
  player: Player;
  coachEvaluation: CoachEvaluation;
  _id: string;
}

export interface Session {
  videos: any[];
  photos: any[];
  playersCanReflect: boolean;
  sessionType: string;
  _id: string;
  coach: Coach;
  players: Player[];
  date: string;
  to: string;
  levelPlan: string;
  attendance: Attendance[];
  status: string;
  goal: string;
  objectives: Objective[];
  reflections: Reflection[];
  createdAt: string;
  updatedAt: string;
  feedback: string;
  evaluations: Evaluation[];
  preSessionQuestions: any[];
  checkList: any[];
  id: string;
}
