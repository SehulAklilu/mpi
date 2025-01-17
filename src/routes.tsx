import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/Login.tsx";
import SignUp from "./Pages/signup.tsx";
import CreateProfile from "./Pages/CreateProfile.tsx";
import { ToastContainer } from "react-toastify";
import Components from "./Pages/Components.tsx";
import InviteOrganization from "./Pages/InviteOrganization.tsx";
import TakeShortQuiz from "./Pages/TakeShortQuiz.tsx";
import { RoleProvider } from "./RoleContext.tsx";

import Connect from "./Pages/Connect.tsx";
import Home from "./Pages/Home.tsx";
import Journal from "./Pages/Journal.tsx";
import NewJournal from "./components/Notes/NewJournal.tsx";
import Progress from "./Pages/Progress.tsx";
import Reminders from "./Pages/Reminders.tsx";
import Profile from "./Pages/Profile.tsx";
import Settings from "./Pages/Settings.tsx";
import NewSignup from "./Pages/NewSignup.tsx";
import NewLogin from "./Pages/NewLogin.tsx";
import CourseDetail from "./components/Learn/CourseDetail.tsx";
import LessonDetail from "./components/Learn/LessonDetail.tsx";
import AssessmentComponent from "./components/Assessment/assessment.tsx";
import { assesment } from "./types/course.types.ts";
import NewLearn from "./Pages/Learn/NewLearn.tsx";
import Assessment from "./Pages/Assessment.tsx";
import Chat from "./Pages/Chat.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import PendingMatch from "./components/Matches/PendingMatch.tsx";
import Matches from "./Pages/Matches.tsx";
import AddMatch from "./Pages/AddMatch.tsx";
import RecentMatch from "./components/Matches/RecentMatch.tsx";
import UnauthorizedPage from "./Pages/Unauthorized.tsx";
import Players from "./Pages/Players.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import TrackingMatch from "./components/Matches/TrackingMatch.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        element: <PrivateRoute allowedRoles={["coach", "player"]} />,
        children: [
          {
            path: "/calendar",
            element: <Reminders />,
          },
        ],
      },

      {
        element: <PrivateRoute allowedRoles={["player"]} />,
        children: [
          {
            path: "/",
            element: <NewLearn />,
          },
          {
            path: "course/:course_id",
            element: <CourseDetail />,
          },
          {
            path: "course/:course_id/video/:video_id",
            element: <LessonDetail />,
          },
          {
            path: "course/:course_id/assessment/:assessment_id",
            element: <Assessment />,
          },
          {
            path: "journal",
            element: <Journal />,
          },
          {
            path: "progress",
            element: <Progress />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "newJournal",
            element: <NewJournal />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["coach"]} />,
        children: [
          {
            path: "/matches",
            element: <Matches />,
          },
          {
            path: "/matches/pendingMatch",
            element: <PendingMatch />,
          },
          {
            path: "/matches/recentMatch",
            element: <RecentMatch />,
          },
          {
            path: "/matches/addMatch",
            element: <AddMatch />,
          },
          {
            path: "/matches/trackingMatch",
            element: <TrackingMatch />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["player", "coach"]} />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "chat",
            element: <Chat />,
          },
          {
            path: "calendar",
            element: <Reminders />,
          },
          {
            path: "players",
            element: <Players />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <NewLogin />,
  },
  {
    path: "/login/old",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <NewSignup />,
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
  {
    path: "/connect",
    element: <Connect />,
  },
  {
    path: "/assessment",
    element: (
      <AssessmentComponent
        assessment={assesment}
        assessmentPage={true}
        onContinue={() => console.log("")}
      />
    ),
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
]);

export default router;
