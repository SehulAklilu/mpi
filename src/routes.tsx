import { createBrowserRouter } from "react-router-dom";
// import Login from "./Pages/Login.tsx";
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
// import PendingMatch from "./Pages/PendingMatch.tsx";
import UnauthorizedPage from "./Pages/Unauthorized.tsx";
import Players from "./Pages/Players.tsx";
import Dashboard from "./Pages/Dashboard.tsx";
import TrackingMatch from "./components/Matches/updated/TM.tsx";
import AddMatch from "./Pages/AddMatch.tsx";
import RecentMatch from "./components/Matches/RecentMatch.tsx";
import Matches from "./Pages/Matches.tsx";
import PendingMatch from "./components/Matches/PendingMatch.tsx";
import LandingPage from "./Pages/LandingPage.tsx";
import Courses from "./Pages/CoursesPage.tsx";
import Testimonial from "./components/LandingPage/Testimonial.tsx";
import ChatProflie from "./components/Chat/ChatProflie.tsx";
import ProfileSetting from "./components/Chat/ProfileSetting.tsx";
import AboutUsContainer from "./Pages/AboutUsPage.tsx";
import CoursesDetail from "./components/LandingPage/CoursesDetail.tsx";
import Contact from "./components/LandingPage/Contact.tsx";
import Blog from "./components/LandingPage/Blog.tsx";
import AboutUsPage from "./Pages/AboutUsPage.tsx";
import CoursesPage from "./Pages/CoursesPage.tsx";
import ChildrenPage from "./Pages/ChildrenPage.tsx";
import ChildrenDetailPage from "./components/Children/ChildrenDetailPage.tsx";

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
            element: <Chat />,
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
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["player"]} />,
        children: [
          {
            path: "course",
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
            path: "newJournal",
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
          {
            path: "matches/pendingMatch",
            element: <PendingMatch />,
          },
          {
            path: "matches/recentMatch",
            element: <RecentMatch />,
          },
          {
            path: "matches/addMatch",
            element: <AddMatch />,
          },
          {
            path: "matches/trackingMatch",
            element: <TrackingMatch />,
          },
           {
            path: "matches/:id",
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
            element: <ChildrenDetailPage />,
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
