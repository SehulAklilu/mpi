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
