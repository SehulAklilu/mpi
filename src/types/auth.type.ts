import { Tokens, User } from "./user.types";

export type Role = "player" | "coach" | "parent";
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
  otp: string;
}

export interface OtpResponse {
  message: string;
  otp: string;
  status: number;
}

export interface RegisterPayload {
  email: string;
  otp: string;
  role: Role;
  firstName: string;
  lastName: string;
  password: string;
  avatar?: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  phoneNumberCountryCode: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  country: string;
  zipCode: string;
}

export const requiredFields: (keyof RegisterPayload)[] = [
  "email",
  "otp",
  "role",
  "firstName",
  "lastName",
  "password",
  "dateOfBirth",
  "gender",
  "phoneNumber",
  "phoneNumberCountryCode",
  "streetAddress",
  "city",
  "stateProvince",
  "country",
  "zipCode",
];

export interface LogoutPayload {
  refreshToken: string;
}
