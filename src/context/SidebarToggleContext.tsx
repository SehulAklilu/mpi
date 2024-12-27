import { createContext, useContext, useState, ReactNode } from "react";

// Define the context structure
interface SidebarToggleContextProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

// Create the context
const SidebarToggleContext = createContext<
  SidebarToggleContextProps | undefined
>(undefined);

// Provider component
export const SidebarToggleProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpenState] = useState<boolean>(true);

  const setIsOpen = () => {
    setIsOpenState((prev) => !prev);
  };

  return (
    <SidebarToggleContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarToggleContext.Provider>
  );
};

// Hook to use the sidebar context
export const useSidebarToggle = (): SidebarToggleContextProps => {
  const context = useContext(SidebarToggleContext);
  if (!context) {
    throw new Error(
      "useSidebarToggle must be used within a SidebarToggleProvider"
    );
  }
  return context;
};
