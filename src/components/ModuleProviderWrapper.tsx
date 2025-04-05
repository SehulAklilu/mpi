// ModuleProviderWrapper.tsx
import { ModuleProvider } from "@/context/courseContext";
import { Outlet } from "react-router-dom";

const ModuleProviderWrapper = () => {
  return (
    <ModuleProvider>
      <Outlet />
    </ModuleProvider>
  );
};

export default ModuleProviderWrapper;
