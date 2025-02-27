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
      hour12: false, // 24-hour format
    }),
  });
}
