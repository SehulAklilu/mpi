import axiosInstance from "./axios";

export interface CreateGroupPayload {
  groupName: string;
  members: {
    user: string;
  }[];
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  id: string;
};

export type Member = {
  user: User;
  status: string;
  _id: string;
  id: string;
};

export type Group = {
  _id: string;
  groupName: string;
  members: Member[];
  createdBy: User;
  avatar: string;
  chat_background_image: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export interface GroupMessagePayload {
  message: string;
}

export type GroupMessage = {
  sender: string;
  group: string;
  type: string;
  message: string;
  isRead: boolean;
  readBy: string[];
  _id: string;
  files: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

export const createGroup = async (
  payload: CreateGroupPayload
): Promise<any> => {
  const response = await axiosInstance.post("/api/v1/groups", payload);
  return response.data;
};

export const getGroups = async (): Promise<Group[]> => {
  const response = await axiosInstance.get("/api/v1/groups");
  return response.data;
};

export const createGroupMessage = async (
  groupId: string,
  payload: GroupMessagePayload
): Promise<GroupMessage> => {
  const response = await axiosInstance.post(
    `/api/v1/group-chats/${groupId}/message`,
    payload
  );
  return response.data;
};

export const getGroupsMessage = async (
  groupId: string
): Promise<GroupMessage[]> => {
  const response = await axiosInstance.get(`/api/v1/messages/${groupId}`);
  return response.data;
};
