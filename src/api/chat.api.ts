import {
  ChatInterface,
  FriendDataResponse,
  FriendRequestResponse,
  Message,
} from "@/types/chat.type";
import axiosInstance from "./axios";

export interface ChatResponse {
  chats: ChatInterface[];
  length: number;
}

export interface MessageResponse {
  messages: Message[];
}
export interface MessagePayload {
  receiver: string;
  // "sender": "65f38cb2d8c8946b5367bf4f",
  content: string;
  // "time": "2023-07-28T10:28:28.066Z",
  // "message_type": "text",
  chatId: string;
  //   message: string;
}

export interface sendFriendRequestPayload {
  user2: string;
}

export interface CreateChatPayload {
  userId: string;
}

export const getChats = async (): Promise<ChatResponse> => {
  const response = await axiosInstance.get("/api/v1/chats");
  return response.data;
};

export const getMessages = async (id: string): Promise<MessageResponse> => {
  const response = await axiosInstance.get(`/api/v1/messages/${id}`);
  return response.data;
};

export const createMessage = async (payload: MessagePayload): Promise<any> => {
  const response = await axiosInstance.post("/api/v1/messages", payload);
  return response.data;
};

export const getFriends = async (): Promise<FriendDataResponse> => {
  const response = await axiosInstance.get("/api/v1/friendship");
  return response.data;
};

export const sendFriendRequest = async (
  payload: sendFriendRequestPayload
): Promise<any> => {
  const response = await axiosInstance.post(
    "/api/v1/friendship/friendRequest",
    payload
  );
  return response.data;
};

export const getFriendRequest = async (): Promise<FriendRequestResponse> => {
  const response = await axiosInstance.get("/api/v1/friendship/friendRequest");
  return response.data;
};

export const acceptFriendRequest = async (
  id: string
): Promise<FriendRequestResponse> => {
  const response = await axiosInstance.patch(`/api/v1/friendship/${id}/accept`);
  return response.data;
};

export const rejectFriendRequest = async (
  id: String
): Promise<FriendRequestResponse> => {
  const response = await axiosInstance.delete(
    `/api/v1/friendship/${id}/accept`
  );
  return response.data;
};

export const unfriend = async (id: string): Promise<any> => {
  const response = await axiosInstance.delete(
    `/api/v1/friendship/${id}/unfriend`
  );
  return response.data;
};

export const blockFriend = async (id: string): Promise<any> => {
  const response = await axiosInstance.put(`/api/v1/friendship/${id}/block`);
  return response.data;
};

export const unblockFriend = async (id: string): Promise<any> => {
  const response = await axiosInstance.put(`/api/v1/friendship/${id}/unblock`);
  return response.data;
};

export const createChat = async (payload: CreateChatPayload): Promise<any> => {
  const response = await axiosInstance.post("/api/v1/chats", payload);
  return response.data;
};

export const isRead = async (id: string): Promise<any> => {
  const response = await axiosInstance.patch(`/api/v1/messages/read/${id}`);
  return response.data;
};
