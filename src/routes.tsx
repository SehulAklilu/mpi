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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
        path: "calendar",
        element: <Reminders />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "newJournal",
        element: <NewJournal />,
      },
      {
        path: "profile",
        element: <Profile />,
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
  // {
  //   path: "course/:course_id",
  //   element: <LessonDetail />,
  // },
  // {
  //   path: "course/:course_id/video/:video_id",
  //   element: <LearnLesson />,
  // },
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
]);

export default router;
