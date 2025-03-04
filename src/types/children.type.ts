interface EmailAddress {
  email: string;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

export interface Parent {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
}

export interface Player {
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

export interface ChildrenResponse {
  player: Player;
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

export type GoalType =
  | "physical"
  | "mental"
  | "technical"
  | "tactical"
  | "nutrition";

export type FieldType =
  | "physical"
  | "technical"
  | "psychological"
  | "tactical"
  | "nutrition"
  | "recovery";

export type GoalTerm = "short" | "long" | "medium";
export interface Goal {
  goal: GoalType;
  term: GoalTerm;
  description: string;
  measurement: string;
  achievementDate: string;
  actions: Action[];
  obstacles: Obstacle[];
  addOns: string;
  _id: string;
  progress?: any[];
}

// CoachGoal Interface
export interface CoachGoal {
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

export interface Periodization {
  startingDate: string;
  endingDate: string;
  status: string;
  physical: Physical;
  technical: Technical;
  psychological: Psychological;
  tactical: Tactical;
  nutrition: Nutrition;
  recovery: Recovery;
  _id: string;
}

interface Physical {
  preparation: Preparation | null;
  competition: Competition | null;
  transition: Transition | null;
  _id: string;
}

export interface Preparation {
  allocatedTime: number;
  timeType: "days" | "weeks" | "months";
  generals: string[];
  specifics: string[];
  specificDescriptions: string[]; // play goal
}

interface Competition {
  allocatedTime: number;
  timeType: "days" | "weeks" | "months";
  precompetitions: string[];
  tournaments: string[];
}

interface Transition {
  allocatedTime: number;
  timeType: "days" | "weeks" | "months";
  activeRest: string[];
}

interface Technical {
  preparation: Preparation | null;
  competition: Competition | null;
  transition: Transition | null;
  _id: string;
}

interface Psychological {
  preparation: Preparation | null;
  competition: Competition | null;
  transition: Transition | null;
  _id: string;
}

interface Tactical {
  preparation: Preparation | null;
  competition: Competition | null;
  transition: Transition | null;
  _id: string;
}

interface Nutrition {
  preparation: Preparation | null;
  competition: Competition | null;
  transition: Transition | null;
  _id: string;
}

interface Recovery {
  preparation: Preparation | null;
  competition: Competition | null;
  transition: Transition | null;
  _id: string;
}

export interface PeriodizationsResponse {
  periodizations: Periodization[];
}

export interface PreparationPayload {
  preparationType: FieldType;
  preparation: Preparation;
}
export type PreparationPayloadDelete = Omit<PreparationPayload, "preparation">;
export type CompetitionPayloadDelete = Omit<CompetitionPayload, "competition">;
export type TransitionPayloadDelete = Omit<TransitionPayload, "transition">;

export interface CompetitionPayload {
  competitionType: FieldType;
  competition: Competition;
}

export interface TransitionPayload {
  transitionType: FieldType;
  transition: Transition;
}

export interface GoalPayload {
  goal: GoalType;
  term: GoalTerm;
  description: string;
  measurement: string;
  achievementDate: Date;
  actions: {
    description: string;
    date: Date;
    isDone?: boolean;
  }[];
  obstacles: { description: string; isOvercome: boolean }[];
  addOns?: string | null;
}

export interface MyGoals {
  goals: CoachGoal[];
}

interface Attendance {
  player: string;
  response: string;
  status: string;
  _id: string;
  id: string;
}

interface Class {
  videos: any[];
  photos: any[];
  playersCanReflect: boolean;
  sessionType: string;
  _id: string;
  coach: string;
  players: string[];
  date: string;
  to: string;
  levelPlan: string;
  attendance: Attendance[];
  status: string;
  goal: any;
  createdAt: string;
  updatedAt: string;
  evaluations: any[];
  objectives: any[];
  reflections: any[];
  preSessionQuestions: any[];
  checkList: any[];
  id: string;
}

export interface ClassData {
  classes: Class[];
}
