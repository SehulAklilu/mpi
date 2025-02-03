// RoleContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Role } from "./types/auth.type";
import Cookies from "js-cookie";

// Define the types for each piece of state in the context
interface PersonalDataType {
  // Define specific fields if known, e.g., firstName: string;
  [key: string]: any;
}

interface ContactInfoType {
  // Define specific fields if known, e.g., email: string;
  [key: string]: any;
}

interface AdditionalInfoType {
  // Define specific fields if known, e.g., details: string;
  [key: string]: any;
}

// Define the context type
interface RoleContextType {
  role: Role | null;
  setRole: Dispatch<SetStateAction<Role | null>>;
  personalData: PersonalDataType;
  setPersonalData: Dispatch<SetStateAction<PersonalDataType>>;
  contactInfo: ContactInfoType;
  setContactInfo: Dispatch<SetStateAction<ContactInfoType>>;
  additionalInfo: AdditionalInfoType;
  setAdditionalInfo: Dispatch<SetStateAction<AdditionalInfoType>>;
  lastAttemptedRoute: string;
  setLastAttemptedRoute: (route: string) => void;
}

// Create the context with an undefined default value for type safety
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Custom hook to use the RoleContext
export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);

  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
};

// Define the RoleProvider component with type for children
export const RoleProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const currentRole: Role | null = Cookies.get("role") as Role | null;
  const [role, setRole] = useState<Role | null>(currentRole);
  const [personalData, setPersonalData] = useState<PersonalDataType>({});
  const [contactInfo, setContactInfo] = useState<ContactInfoType>({});
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoType>({});
  const [lastAttemptedRoute, setLastAttemptedRoute] = useState<string>("/");
  console.log("eeeeeeeeee", role);
  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        personalData,
        setPersonalData,
        contactInfo,
        setContactInfo,
        additionalInfo,
        setAdditionalInfo,
        lastAttemptedRoute,
        setLastAttemptedRoute,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContext;
