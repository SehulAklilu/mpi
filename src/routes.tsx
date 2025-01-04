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
import { Assessment } from "./types/course.types.ts";
import NewLearn from "./Pages/Learn/NewLearn.tsx";

const assesment: Assessment = {
  assessmentType: "quiz",
  title: "Small Soft Ball",
  description: "accusantium quidem enim",
  timeLimit: 5,
  attemptsAllowed: 3,
  connectedWithVideo: true,
  questions: [
    {
      questionType: "multiple-choice",
      question:
        "Mindfulness is a concept that is found in multiple cultures and religions.",
      choices: ["True", "False"],
      correctAnswer: "True",
      _id: "662e17020ac8163154d7ba9e",
      id: "662e17020ac8163154d7ba9e",
    },
    {
      questionType: "multiple-choice",
      question:
        "How many essential elements of mindfulness are typically identified by experts?",
      choices: ["2", "3", "4", "5"],
      correctAnswer: "5",
      _id: "662e17020ac8163154d7ba9f",
      id: "662e17020ac8163154d7ba9f",
    },
    {
      questionType: "multiple-choice",
      question: "How does mindfulness help in terms of attention management?",
      choices: [
        "It encourages constant mind-wandering",
        "It minimizes attention to the present moment",
        "It helps deploy attention where you want it",
        "It increases judgmental thinking",
      ],
      correctAnswer: "It helps deploy attention where you want it",
      _id: "662e17020ac8163154d7baa1",
      id: "662e17020ac8163154d7baa1",
    },
  ],
  _id: "662e17020ac8163154d7ba9d",
  connectedVideoId: "662e17020ac8163154d7ba9b",
};
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
]);

export default router;
