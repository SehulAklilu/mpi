interface EmailAddress {
  email: string;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

interface Parent {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
}

interface Player {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  parents: Parent[];
  coaches: any[];
  coachGoals: any[];
  lastOnline: string;
  goals: any[];
  classes: any[];
}

export interface ChildrenResponse {
  players: Player[];
}

// Avatar Interface
interface Avatar {
  avatar: string;
}

// Coach Interface
interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
}

// Action Interface
interface Action {
  description: string;
  date: string;
  isDone: boolean;
  _id: string;
}

// Obstacle Interface
interface Obstacle {
  description: string;
  isOvercome: boolean;
  _id: string;
}

// Goal Interface
interface Goal {
  goal: string;
  term: string;
  description: string;
  measurement: string;
  achievementDate: string;
  actions: Action[];
  obstacles: Obstacle[];
  addOn: string;
  _id: string;
  progress: any[];
}

// CoachGoal Interface
interface CoachGoal {
  coach: Coach;
  goals: Goal[];
  _id: string;
}

// Player Interface
interface Child {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
  parents: Parent[];
  coaches: Coach[];
  coachGoals: CoachGoal[];
  id: string;
}

// Wrapper Interface
export interface ChildResponse {
  player: Child;
}
