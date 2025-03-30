import { Role } from "./auth.type";

export interface EmailAddress {
  email: string;
  verified: boolean;
}

export interface PhoneNumber {
  countryCode: string;
  number: string;
}

export interface Address {
  streetAddress: string;
  streetAddress2: string;
  city: string;
  stateProvince: string;
  country: string;
  zipCode: string;
}

export interface NotificationSettings {
  enabled: boolean;
  notificationType: string[];
  notificationFrequency: string;
}

export interface NotificationPreference {
  emailNotification: NotificationSettings;
  pushNotification: NotificationSettings;
}

export interface User {
  _id: string;
  isRegistrationComplete: boolean;
  hasOtp: boolean;
  badge: number;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  dateOfBirth: string;
  gender: string;
  phoneNumber: PhoneNumber;
  address: Address;
  isProfilePublic: boolean;
  notificationPreference: NotificationPreference;
  avatar: string;
  role: Role;
  googleId: string;
  lastOnline: string;
  provider: string;
  __t: string;
  children: string[];
  id: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Coach {
  _id: string;
  firstName: string;
  lastName: string;
  emailAddress: EmailAddress;
  phoneNumber: PhoneNumber;
  avatar: string;
  lastOnline: string;
  __t: string;
  id: string;
}
