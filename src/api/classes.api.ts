import axiosInstance from "./axios";

export const createClasses = async (payload: any): Promise<any> => {
  const response = await axiosInstance.post("/api/v1/classes", payload);
  return response.data;
};
