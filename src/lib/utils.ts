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
