import { createBrowserRouter } from "react-router-dom";
import CreateProfile from "./Pages/CreateProfile.tsx";
import Components from "./Pages/Components.tsx";
import InviteOrganization from "./Pages/InviteOrganization.tsx";
import TakeShortQuiz from "./Pages/TakeShortQuiz.tsx";
import Connect from "./Pages/Connect.tsx";
import Home from "./Pages/Home.tsx";
import Journal from "./Pages/Journal.tsx";
import NewJournal from "./components/Notes/NewJournal.tsx";
import Reminders from "./Pages/Reminders.tsx";
import Profile from "./Pages/Profile.tsx";
import NewSignup from "./Pages/NewSignup.tsx";
import NewLogin from "./Pages/NewLogin.tsx";
import CourseDetail from "./components/Learn/CourseDetail.tsx";
import LessonDetail from "./components/Learn/LessonDetail.tsx";
import NewLearn from "./Pages/Learn/NewLearn.tsx";
import Assessment from "./Pages/Assessment.tsx";
import Chat from "./Pages/Chat.tsx";
import PrivateRoute from "./components/PrivateRoute.tsx";
import UnauthorizedPage from "./Pages/Unauthorized.tsx";
import Players from "./Pages/Players.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import TrackingMatch from "./components/Matches/updated/TM.tsx";
import AddMatch from "./Pages/AddMatch.tsx";
import RecentMatch from "./components/Matches/RecentMatch.tsx";
import Matches from "./Pages/Matches.tsx";
import LandingPage from "./Pages/LandingPage.tsx";
import Testimonial from "./components/LandingPage/Testimonial.tsx";
import ChatProflie from "./components/Chat/ChatProflie.tsx";
import ProfileSetting from "./components/Chat/ProfileSetting.tsx";
import CoursesDetail from "./components/LandingPage/CoursesDetail.tsx";
import Contact from "./components/LandingPage/Contact.tsx";
import Blog from "./components/LandingPage/Blog.tsx";
import AboutUsPage from "./Pages/AboutUsPage.tsx";
import CoursesPage from "./Pages/CoursesPage.tsx";
import ChildrenPage from "./Pages/ChildrenPage.tsx";
import PlayersDetail from "./Pages/PlayersDetail.tsx";
import InitialAssessment from "./components/Assessment/InitialAssessment.tsx";
import { SocketProvider } from "./context/SocketContext.tsx";
import ResetPassword from "./components/auth/ResetPassword.tsx";
import PasswordFormComponent from "./components/auth/PasswordForm.tsx";
import Learn from "./NewLearn.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        element: <PrivateRoute allowedRoles={["coach", "player", "parent"]} />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "chat",
            element: (
              <SocketProvider>
                <Chat />
              </SocketProvider>
            ),
          },
          {
            path: "chat/:chatId",

            element: (
              <SocketProvider>
                {" "}
                <Chat />{" "}
              </SocketProvider>
            ),
          },
          {
            path: "calendar",
            element: <Reminders />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "chat/profile/:id",
            element: <ChatProflie />,
          },
          {
            path: "user/profile/:id",
            element: <ProfileSetting />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["coach"]} />,
        children: [
          {
            path: "players",
            element: <Players />,
          },
          {
            path: "players/:id",
            element: <PlayersDetail />,
          },
          {
            path: "players/matchDetail/:id",
            element: <RecentMatch />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["player"]} />,
        children: [
          {
            path: "course",
            element: <Learn />,
          },
          {
            path: "course/:course_id/:week_id",
            element: <CourseDetail />,
          },
          {
            path: "course/:course_id/:week_id/video/:video_id",
            element: <LessonDetail />,
          },
          {
            path: "course/:course_id/:week_id/assessment/:assessment_id",
            element: <Assessment />,
          },
          {
            path: "journal",
            element: <Journal />,
          },
          {
            path: "progress",
            element: <Dashboard />,
          },
          {
            path: "journal/new",
            element: <NewJournal />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["coach", "parent", "player"]} />,
        children: [
          {
            path: "matches",
            element: <Matches />,
          },
          // {
          //   path: "matches/pendingMatch",
          //   element: <PendingMatch />,
          // },
          {
            path: "matches/:id",
            element: <RecentMatch />,
          },
          {
            path: "matches/addMatch",
            element: <AddMatch />,
          },
          {
            path: "matches/trackingMatch/:id",
            element: <TrackingMatch />,
          },
          {
            path: "matches/new",
            element: <AddMatch />,
          },
          {
            path: "matches/edit/:id",
            element: <AddMatch />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["parent"]} />,
        children: [
          {
            path: "children",
            element: <ChildrenPage />,
          },
          {
            path: "children/:id",
            element: <PlayersDetail />,
          },
          {
            path: "child/matchDetail/:id",
            element: <RecentMatch />,
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
    path: "/signup",
    element: <NewSignup />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/passwordreset/:token",
    element: <PasswordFormComponent />,
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
    element: <InitialAssessment />,
  },
  {
    path: "/about-us",
    element: <AboutUsPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/courses",
    element: <CoursesPage />,
  },
  {
    path: "/courses/detail",
    element: <CoursesDetail />,
  },
  {
    path: "/testimonials",
    element: <Testimonial />,
  },
  {
    path: "/contact-us",
    element: <Contact />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
]);

export default router;
