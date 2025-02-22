export interface ChatInterface {
  _id: string;
  chatName: string;
  users: User[];
  isGroupChat: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage?: Message;
  id: string;
}

type Role = "player" | "coach" | "parent";

type User = {
  _id: string;
  badge: number;
  deviceToken: string;
  firstName: string;
  lastName: string;
  emailAddress: {
    email: string;
  };
  gender: string;
  phoneNumber: {
    countryCode: string;
    number: string;
  };
  isProfilePublic: boolean;
  avatar: string;
  role: Role;
  lastOnline: string;
  provider: string;
  players: string[];
  organization: string | null;
  id: string;
};

type Sender = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  __t: string;
  id: string;
};

export type Message = {
  _id: string;
  receiver: string;
  sender: Sender;
  content: string;
  isRead: boolean;
  readBy: string[];
  chat: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export interface FriendUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  isOnline: boolean;
  __t: "Player" | "Coach" | "Parent";
  id?: string;
}

export interface Friendship {
  user1: FriendUser;
  user2: FriendUser;
  user1IsBlocked: boolean;
  user2IsBlocked: boolean;
  status: "friends" | "pending" | "blocked";
  friendRequestSentAt: string;
  becameFriendsAt: string;
  notification: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface FriendsResponse {
  result: number;
  friends: Friendship[];
}

interface PlayersResponse {
  result: number;
  players: FriendUser[];
}

interface CoachesResponse {
  result: number;
  coaches: FriendUser[];
}

interface ParentsResponse {
  result: number;
  parents: FriendUser[];
}

export interface FriendDataResponse {
  friendship: FriendsResponse;
  players: PlayersResponse;
  coaches: CoachesResponse;
  parents: ParentsResponse;
}

interface FriendRequest {
  user1: FriendUser;
  user2: FriendUser;
  user1IsBlocked: boolean;
  user2IsBlocked: boolean;
  status: "request" | "accepted" | "rejected" | "pending";
  friendRequestSentAt: string;
  becameFriendsAt: string;
  notification: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface FriendRequestResponse {
  result: number;
  friendRequests: FriendRequest[];
}
