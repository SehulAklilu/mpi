// context/SidebarToggleContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context
interface SidebarToggleContextProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

// Create the context with a default value
const SidebarToggleContext = createContext<
  SidebarToggleContextProps | undefined
>(undefined);

// Provider component
export const SidebarToggleProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <SidebarToggleContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarToggleContext.Provider>
  );
};

// Custom hook to use the context
export const useSidebarToggle = () => {
  const context = useContext(SidebarToggleContext);

  if (!context) {
    throw new Error(
      "useSidebarToggle must be used within a SidebarToggleProvider"
    );
  }

  return context;
};
