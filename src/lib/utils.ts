import { ProfileDataInterface } from "@/components/Chat/PeopleComponent";
import { FriendDataResponse } from "@/types/chat.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractUsers(
  data: FriendDataResponse,
  userId: string
): ProfileDataInterface[] {
  const users: ProfileDataInterface[] = [];

  // Process friendships
  data.friendship.friends.forEach((friendship) => {
    const isFollower = friendship.user1._id === userId; // If user1 is the current user, they are following user2
    const otherUser = isFollower ? friendship.user2 : friendship.user1;
    const otherUserBlocked = isFollower
      ? friendship.user2IsBlocked
      : friendship.user1IsBlocked;

    users.push({
      user_id: otherUser._id,
      friendship_id: friendship.id,
      name: `${otherUser.firstName} ${otherUser.lastName}`,
      role: otherUser.__t,
      status: friendship.status,
      profilePicture: otherUser.avatar,
      otherUserBlocked: otherUserBlocked,
      relationshipType: isFollower ? "following" : "follower",
    });
  });

  return users;
}

export function formatDateTime(dateString: string, isTime: boolean = true) {
  const date = new Date(dateString);

  return date.toLocaleString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    ...(isTime && {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
  });
}

export function extractDateTime(timestamp: string): {
  date: string;
  time: string;
  period: string;
} {
  const dateObj = new Date(timestamp);

  const date = dateObj.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
  const hours = dateObj.getUTCHours();
  const minutes = dateObj.getUTCMinutes();
  const seconds = dateObj.getUTCSeconds();
  const period = hours >= 12 ? "PM" : "AM";

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")} ${period}`;

  return { date, time: formattedTime, period };
}

const GOOGLE_PROFILE_COLORS: Record<string, string> = {
  A: "#F44336",
  B: "#E91E63",
  C: "#9C27B0",
  D: "#673AB7",
  E: "#3F51B5",
  F: "#2196F3",
  G: "#03A9F4",
  H: "#00BCD4",
  I: "#009688",
  J: "#4CAF50",
  K: "#8BC34A",
  L: "#CDDC39",
  M: "#FFEB3B",
  N: "#FFC107",
  O: "#FF9800",
  P: "#FF5722",
  Q: "#795548",
  R: "#9E9E9E",
  S: "#607D8B",
  T: "#FF5722",
  U: "#F44336",
  V: "#E91E63",
  W: "#9C27B0",
  X: "#673AB7",
  Y: "#3F51B5",
  Z: "#2196F3",
};

export function getGoogleProfileColor(name: string | undefined): string {
  if (!name) return "#000000"; // Default black for empty names

  const firstLetter = name.trim().charAt(0).toUpperCase();
  return GOOGLE_PROFILE_COLORS[firstLetter] || "#607D8B"; // Default gray
}

export const LABELS: Record<string, string> = {
  totalServices: "Total Services",
  firstServicePercentage: "First Service %",
  secondServicePercentage: "Second Service %",
  aces: "Aces",
  ace: "Ace",
  doubleFaults: "Double Faults",
  firstServices: "First Services",
  secondServices: "Second Services",
  totalPointsWon: "Total Points Won",
  winners: "Winners",
  unforcedErrors: "Unforced Errors",
  forcedErrors: "Forced Errors",
  oneToFour: "1-4 Shots",
  fiveToEight: "5-8 Shots",
  nineToTwelve: "9-12 Shots",
  thirteenToTwenty: "13-20 Shots",
  twentyOnePlus: "21+ Shots",
  firstServicePointsWon: "1st Serve Points Won",
  secondServicePointsWon: "2nd Serve Points Won",
  receivingPointsWon: "Receiving Points Won",
  breakPoints: "Break Points",
  gamePoints: "Game Points",
  negativeResponses: "Negative Responses",
  positiveResponses: "Positive Responses",
  negativeSelfTalks: "Negative Self Talks",
  positiveSelfTalks: "Positive Self Talks",
  noResponses: "No Responses",
  noResponse: "No Response",
  fault: "Fault",
  p1Winner: "Player One Winner",
  p1UnforcedError: "Player One Unforced Error",
  p1ForcedError: "Player One Forced Error",
  p2Winner: "Player Two Winner",
  p2UnforcedError: "Player Two Unforced Error",
  p2ForcedError: "Player Two Forced Error",
  doubleFault: "Double Fault",
  returnWinner: "Return Winner",
  returnError: "Return Error",
  forcedError: "Forced Error",
  forcedReturnError: "Forced Return Error",

  forehand: "Forehand",
  backhand: "Backhand",
  forehandVolley: "Forehand Volley",
  backhandVolley: "Backhand Volley",
  forehandSwingingVolley: "Forehand Swinging Volley",
  backhandSwingingVolley: "Backhand Swinging Volley",
  forehandSlice: "Forehand Slice",
  backhandSlice: "Backhand Slice",
  overhead: "Overhead",
  forehandDropShot: "Forehand Drop Shot",
  backhandDropShot: "Backhand Drop Shot",

  wide: "Wide",
  body: "Body",
  t: "T",
  net: "Net",
  one: "1 Set",
  three: "2 out of 3",
  five: "3 out of 5",
};

export type Status =
  | "pending"
  | "confirmed"
  | "inProgress"
  | "completed"
  | "cancelled"
  | "postponed"
  | "forfeited";

interface StatusColor {
  bg: string;
  text: string;
}

export const getStatusColors = (status: Status): StatusColor => {
  const statusColors: Record<Status, StatusColor> = {
    pending: { bg: "#FFF3CD", text: "#856404" }, // Light yellow bg, dark yellow text
    confirmed: { bg: "#D1ECF1", text: "#0C5460" }, // Light blue bg, dark blue text
    inProgress: { bg: "#D4EDDA", text: "#155724" }, // Light green bg, dark green text
    completed: { bg: "#C3E6CB", text: "#155724" }, // Light green bg, dark green text
    cancelled: { bg: "#F8D7DA", text: "#721C24" }, // Light red bg, dark red text
    postponed: { bg: "#E2E3E5", text: "#383D41" }, // Light gray bg, dark gray text
    forfeited: { bg: "#F5C6CB", text: "#721C24" }, // Lighter red bg, dark red text
  };

  return statusColors[status];
};
