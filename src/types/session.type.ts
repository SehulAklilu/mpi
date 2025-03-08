interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: {
    email: string;
    verified: boolean;
  };
  phoneNumber: {
    countryCode: string;
    number: string;
  };
  avatar: string;
  lastOnline: string;
  __t: string;
}

interface Objective {
  objective: string;
  subObjective: string;
  additionalInfo: string;
  _id: string;
}

interface Performance {
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
  goal: any;
  performance: Performance;
  additionalInfo: string;
  _id: string;
  id: string;
}

interface Evaluation {
  player: string;
  coachEvaluation: CoachEvaluation;
  _id: string;
}

interface CheckList {
  survey: boolean;
  mindfulness: boolean;
  imagery: boolean;
  stretching: boolean;
}

interface PreSessionQuestions {
  emotion: number;
  energy: number;
  engagement: number;
}

interface PlayerEvaluation {
  performance: {
    engagement: string;
    effort: string;
    execution: string;
    _id: string;
    id: string;
  };
  additionalInfo: string;
  _id: string;
  id: string;
}

export interface PlayerSession {
  _id: string;
  coach: Coach;
  players: string[];
  date: string;
  to: string;
  levelPlan: string;
  status: string;
  goal: any;
  objectives: Objective[];
  video: any;
  createdAt: string;
  updatedAt: string;
  evaluations: Evaluation[];
  checkList: CheckList;
  feedback: string;
  photos: any[];
  playersCanReflect: boolean;
  preSessionQuestions: PreSessionQuestions;
  sessionType: string;
  videos: any[];
  id: string;
  attendanceResponse: string;
  attendanceStatus: string;
  reason: string;
  coachEvaluation: CoachEvaluation;
  playerEvaluation: PlayerEvaluation;
  P: any;
  R: any;
  I: any;
  M: any;
  stepsTaken: any;
  feelTowardsGoal: any;
  additionalInfo: any;
}
