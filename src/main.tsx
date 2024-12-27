import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RoleProvider } from "./RoleContext.tsx";

import router from "./routes.tsx";
import Providers from "./providers/providers.tsx";
import { SidebarToggleProvider } from "./context/SidebarToggleContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RoleProvider>
      <SidebarToggleProvider>
        <Providers>
          <ToastContainer />
          <RouterProvider router={router} />
        </Providers>
      </SidebarToggleProvider>
    </RoleProvider>
  </React.StrictMode>
);
