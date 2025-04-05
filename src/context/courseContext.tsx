// ModuleContext.tsx
import { ContentItem, Module } from "@/types/course.types";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ModuleContextType {
  module: Module | null;
  setModule: (module: Module) => void;
  clearModule: () => void;
  selectedItem: ContentItem | null;
  setItem: (item: ContentItem) => void;
  clearItem: () => void;
}

const ModuleContext = createContext<ModuleContextType | undefined>(undefined);

const MODULE_KEY = "moduleData";
const ITEM_KEY = "selectedItemData";

export const ModuleProvider = ({ children }: { children: ReactNode }) => {
  const [module, setModuleState] = useState<Module | null>(null);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);

  // Load from localStorage on first render
  useEffect(() => {
    const storedModule = localStorage.getItem(MODULE_KEY);
    const storedItem = localStorage.getItem(ITEM_KEY);

    if (storedModule) {
      try {
        setModuleState(JSON.parse(storedModule));
      } catch {
        localStorage.removeItem(MODULE_KEY);
      }
    }

    if (storedItem) {
      try {
        setSelectedItem(JSON.parse(storedItem));
      } catch {
        localStorage.removeItem(ITEM_KEY);
      }
    }
  }, []);

  // Update localStorage whenever state changes
  useEffect(() => {
    if (module) {
      localStorage.setItem(MODULE_KEY, JSON.stringify(module));
    } else {
      localStorage.removeItem(MODULE_KEY);
    }
  }, [module]);

  useEffect(() => {
    if (selectedItem) {
      localStorage.setItem(ITEM_KEY, JSON.stringify(selectedItem));
    } else {
      localStorage.removeItem(ITEM_KEY);
    }
  }, [selectedItem]);

  const setModule = (mod: Module) => setModuleState(mod);
  const clearModule = () => setModuleState(null);

  const setItem = (item: ContentItem) => setSelectedItem(item);
  const clearItem = () => setSelectedItem(null);

  return (
    <ModuleContext.Provider
      value={{
        module,
        setModule,
        clearModule,
        selectedItem,
        setItem,
        clearItem,
      }}
    >
      {children}
    </ModuleContext.Provider>
  );
};

export const useModule = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("useModule must be used within a ModuleProvider");
  }
  return context;
};
