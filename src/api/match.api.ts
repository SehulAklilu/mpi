import { ChildrenResponse } from "@/types/children.type";
import axiosInstance from "./axios";

export const getPlayers = async (type: string): Promise<ChildrenResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/${type}`);
  return response.data;
};

export const createMatch = async (payload: any): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/matches`, payload);
  return response.data;
};
