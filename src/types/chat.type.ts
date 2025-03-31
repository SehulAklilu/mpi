// export interface ChatInterface {
//   _id: string;
//   chatName: string;
//   users: User[];
//   isGroupChat: boolean;
//   createdAt: string;
//   updatedAt: string;
//   __v: number;
//   latestMessage?: Message;
//   id: string;
// }

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

interface UserAnnouncement {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: string;
  lastOnline: string;
  __t: string;
  id: string;
}

interface Seen {
  _id: string;
  announcementId: string;
  read: boolean;
}

export interface Announcement {
  _id: string;
  title: string;
  description: string;
  category: string;
  announcedTo: string;
  createdBy: UserAnnouncement;
  deletedBy: string[];
  createdAt: string;
  updatedAt: string;
  seen?: Seen;
  id: string;
  showButton?: boolean;
}

// interface EmailAddress {
//     email: string;
//     verified: boolean;
// }

// interface PhoneNumber {
//     countryCode: string;
//     number: string;
// }

// interface Address {
//     streetAddress: string;
//     streetAddress2: string | null;
//     city: string;
//     stateProvince: string;
//     country: string;
//     zipCode: string;
// }

// interface User {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     emailAddress: EmailAddress;
//     gender: string;
//     phoneNumber: PhoneNumber;
//     address: Address;
//     avatar: string;
//     role: string;
//     __t: string;
// }

export interface Chat {
  _id: string;
  chatName: string;
  users: User[];
  isGroupChat: boolean;
  groupAdmin?: User; // Only present for group chats
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage?: string;
  latestMessageContent?: string;
  latestMessageSenderId?: string;
  latestMessageTimeStamp?: string;
  unreadCount: number;
  photo?: string; // Only present in one chat
}

export interface ChatListResponse {
  chats: Chat[];
  length: number;
}
