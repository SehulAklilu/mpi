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
import { GoogleOAuthProvider } from "@react-oauth/google";

const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={VITE_CLIENT_ID}>
      <RoleProvider>
        <SidebarToggleProvider>
          <Providers>
            <ToastContainer />
            <RouterProvider router={router} />
          </Providers>
        </SidebarToggleProvider>
      </RoleProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
