import { Tokens, User } from "@/types/user.types";
import axiosInstance from "./axios";
import Cookies from "js-cookie";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: Tokens;
}

export interface OtpPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  opt: string;
}

export interface OtpResponse {
  message: string;
  otp: string;
  status: number;
}

export const login = async (
  credentials: LoginPayload
): Promise<LoginResponse> => {
  const response = await axiosInstance.post<LoginResponse>(
    "/auth/login",
    credentials
  );
  const token = response.data.tokens.accessToken;

  Cookies.set("authToken", token, { expires: 1 });
  return response.data;
};

export const logout = () => {
  Cookies.remove("authToken");
};

export const sendOpt = async (payload: OtpPayload): Promise<OtpResponse> => {
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
