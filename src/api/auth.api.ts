import axiosInstance from "./axios";
import Cookies from "js-cookie";
import {
  LoginPayload,
  LoginResponse,
  LogoutPayload,
  OtpPayload,
  OtpResponse,
  RegisterPayload,
  VerifyOtpPayload,
} from "@/types/auth.type";
import { User } from "@/types/user.types";

export const login = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  const token = response.data.tokens.accessToken;
  const refresh_token = response.data.tokens.refreshToken;

  Cookies.set("authToken", token);
  Cookies.set("refreshToken", refresh_token);
  return response.data;
};

export const logout = async (payload: LogoutPayload): Promise<any> => {
  const response = await axiosInstance.post<any>("/auth/logout", payload);
  return response.data;
};

export const sendOtp = async (payload: OtpPayload): Promise<OtpResponse> => {
  const response = await axiosInstance.post<OtpResponse>(
    "/auth/generateotp",
    payload
  );
  return response.data;
};

export const verifyOTP = async (payload: VerifyOtpPayload) => {
  const response = await axiosInstance.post<any>("/auth/verifyOTP", payload);
  return response.data;
};

export const register = async (payload: RegisterPayload): Promise<any> => {
  const response = await axiosInstance.post<RegisterPayload>(
    "/auth/register",
    payload
  );
  return response.data;
};

export const createAssessment = async (payload: any): Promise<any> => {
  const response = await axiosInstance.post<any>(
    "/api/v1/user/profile/assessment/initial",
    payload
  );
  return response.data;
};

export const getUserProfile = async (): Promise<User> => {
  const response = await axiosInstance.get<any>("/api/v1/users/profile");
  return response.data;
};

export const updateUserProfile = async (payload: any): Promise<any> => {
  const response = await axiosInstance.patch<any>(
    "/api/v1/users/profile",
    payload
  );
  return response.data;
};

export const searchUsers = async (searchQuery: string): Promise<User[]> => {
  const response = await axiosInstance.get(
    `/api/v1/users/search?${searchQuery}`
  );
  return response.data;
};
