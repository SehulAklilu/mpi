import { ChildrenResponse, ChildResponse } from "@/types/children.type";
import axiosInstance from "./axios";

export const getChildren = async (): Promise<ChildrenResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/children`);
  return response.data;
};

export const getChild = async (id: string): Promise<ChildResponse> => {
  const response = await axiosInstance.get(`/api/v1/users/children/${id}`);
  return response.data;
};
