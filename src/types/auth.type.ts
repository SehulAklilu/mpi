export type Role = "player" | "coach" | "parent";
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export interface OtpPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface OtpResponse {
  message: string;
  otp: string;
  status: number;
}

export interface RegisterPayload {
  email: string;
  otp: string;
  role: Role;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  phoneNumberCountryCode: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  country: string;
  zipCode: string;
}

export const requiredFields: (keyof RegisterPayload)[] = [
  "email",
  "otp",
  "role",
  "firstName",
  "lastName",
  "password",
  "dateOfBirth",
  "gender",
  "phoneNumber",
  "phoneNumberCountryCode",
  "streetAddress",
  "city",
  "stateProvince",
  "country",
  "zipCode",
];

export interface LogoutPayload {
  refreshToken: string;
}

export interface RegisterResponse {
  message: string;
  status: number;
  user: User;
}

interface User {
  _id: string;
  isRegistrationComplete: boolean;
  hasOtp: boolean;
  badge: number;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  dateOfBirth: string;
  gender: string;
  phoneNumber: PhoneNumber;
  address: Address;
  isProfilePublic: boolean;
  notificationPreference: NotificationPreference;
  avatar: string;
  role: Role;
  googleId: string;
  lastOnline: string;
  provider: string;
  __t: string;
  tennisRanking: string;
  parents: string[];
  coaches: string[];
  organization: null | string;
  loginStreak: number;
  coachGoals: CoachGoal[];
  lastLoginDate: string;
  periodizations: Periodization[];
  initialAssessment: InitialAssessment;
  updatedAt: string;
  id: string;
}

interface EmailAddress {
  email: string;
  verified: boolean;
}

interface PhoneNumber {
  countryCode: string;
  number: string;
}

interface Address {
  streetAddress: string;
  streetAddress2: string;
  city: string;
  stateProvince: string;
  country: string;
  zipCode: string;
}

interface NotificationPreference {
  emailNotification: NotificationSettings;
  pushNotification: NotificationSettings;
}

interface NotificationSettings {
  enabled: boolean;
  notificationType: string[];
  notificationFrequency: string;
}

interface CoachGoal {
  coach: string;
  goals: Goal[];
  _id: string;
}

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

interface Action {
  description: string;
  date: string;
  isDone: boolean;
  _id: string;
}

interface Obstacle {
  description: string;
  isOvercome: boolean;
  _id: string;
}

interface Periodization {
  startingDate: string;
  endingDate: string;
  status: string;
  physical: PeriodizationCategory;
  technical: PeriodizationCategory;
  psychological: PeriodizationCategory;
  tactical: PeriodizationCategory;
  nutrition: PeriodizationCategory;
  recovery: PeriodizationCategory;
  _id: string;
}

interface PeriodizationCategory {
  preparation: Preparation | null;
  competition: null;
  transition: null;
  _id: string;
}

interface Preparation {
  allocatedTime: number;
  timeType: string;
  generals: string[];
  specifics: string[];
  specificDescriptions: string[];
}

interface InitialAssessment {
  competitiveStateAnxietyInventory: CompetitiveStateAnxietyInventory;
  mindfulnessQuestionnaire: MindfulnessQuestionnaire;
}

interface CompetitiveStateAnxietyInventory {
  concernedAboutCompetition: number;
  feelNervous: number;
  feelAtEase: number;
  haveSelfDoubts: number;
  feelJittery: number;
  feelComfortable: number;
  concernedMayNotDoAsWell: number;
  bodyFeelsTense: number;
  feelSelfConfident: number;
  concernedAboutLosing: number;
  feelTenseInStomach: number;
  feelSecure: number;
  bodyFeelsRelaxed: number;
  confidentToMeetChallenge: number;
  concernedAboutPerformingPoorly: number;
  heartRacing: number;
  confidentPerformingWell: number;
  worriedReachingGoal: number;
  stomachSinking: number;
  mentallyRelaxed: number;
  concernedOthersWillBeDisappointed: number;
  handsClammy: number;
  mentallyPictureReachingGoal: number;
  concernedWontAbleToConcentrate: number;
  bodyFeelsTight: number;
  confidentComingThroughPressure: number;
}

interface MindfulnessQuestionnaire {
  [key: string]: number;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}
