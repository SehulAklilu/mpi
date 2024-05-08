import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login.tsx";
import SignUp from "./Pages/signup.tsx";
import CreateProfile from "./Pages/CreateProfile.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Components from "./Pages/Components.tsx";
import InviteOrganization from "./Pages/InviteOrganization.tsx";
import TakeShortQuiz from "./Pages/TakeShortQuiz.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/create-components",
    element: <Components />,
  },
  {
    path: "/invite-organization",
    element: <InviteOrganization />,
  },
  {
    path: "/pre-assesment",
    element: <TakeShortQuiz />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>
);
