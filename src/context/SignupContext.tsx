import React, { createContext, useState, useContext } from "react";

interface UserInfo {
  email?: string;
  otp?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  avatar?: string;
  role?: "player" | "group" | "coach" | "family";
  dateOfBirth?: string;
  gender?: string;
  phoneNumber?: string;
  phoneNumberCountryCode?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  zipCode?: string;
  pushNotificationType?: string[];
  avater?: string;
}

interface SignupContextProps {
  userInfo: UserInfo;
  setUserInfo: (info: Partial<UserInfo>) => void;
}

const SignupContext = createContext<SignupContextProps | undefined>(undefined);

export const SignupContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfo, setUserInfoState] = useState<UserInfo>({});

  const setUserInfo = (info: Partial<UserInfo>) => {
    setUserInfoState((prev) => ({ ...prev, ...info }));
  };

  return (
    <SignupContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignupContext = () => {
  const context = useContext(SignupContext);
  if (!context) {
    throw new Error(
      "useSignupContext must be used within an SignupContextProvider"
    );
  }
  return context;
};
