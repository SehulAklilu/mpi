// RoleContext.js
import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [personalData, setPersonalData] = useState({});
  const [contactInfo, setContactInfo] = useState({});
  const [additionalInfo, setAdditionalInfo] = useState({});

  return (
    <RoleContext.Provider value={{ role, setRole, personalData, setPersonalData, contactInfo, setContactInfo, additionalInfo, setAdditionalInfo }}>
      {children}
    </RoleContext.Provider>
  );
};
