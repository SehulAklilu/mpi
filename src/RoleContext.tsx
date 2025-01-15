// RoleContext.tsx
import React, { createContext, useState, useContext, ReactNode, Dispatch, SetStateAction } from 'react';
import { Role } from './types/auth.type';

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
}

// Create the context with an undefined default value for type safety
const RoleContext = createContext<RoleContextType | undefined>(undefined);

// Custom hook to use the RoleContext
export const useRole = (): RoleContextType => {
  const context = useContext(RoleContext);
  if (!context) throw new Error("useRole must be used within a RoleProvider");
  return context;
};


// Define the RoleProvider component with type for children
export const RoleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);
  const [personalData, setPersonalData] = useState<PersonalDataType>({});
  const [contactInfo, setContactInfo] = useState<ContactInfoType>({});
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoType>({});

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
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};

export default RoleContext;
