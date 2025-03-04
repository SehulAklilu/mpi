import {
  ChildrenResponse,
  ChildResponse,
  ClassData,
  MyGoals,
} from "@/types/children.type";
import axiosInstance from "./axios";

export const getChildren = async (): Promise<ChildrenResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/children`);
  return response.data;
};

export const getChild = async (id: string): Promise<ChildResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/children/${id}`);
  return response.data;
};

export const getMyGoals = async (): Promise<MyGoals> => {
  const response = await axiosInstance.get(`/api/v1/users/myGoals`);
  return response.data;
};

export interface InvitePayload {
  email: string;
  relationship: "player" | "child" | "parent" | "coach";
}

export interface ClassPayload {
  id: string;
  role: "player" | "child";
}
export const invite = async (payload: InvitePayload): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/users/invite`, payload);
  return response.data;
};

export const getPlayerClasses = async (
  payload: ClassPayload
): Promise<ClassData> => {
  const response = await axiosInstance.get(
    `/api/v1/classes/${payload.role}/${payload.id}`
  );
  return response.data;
};
