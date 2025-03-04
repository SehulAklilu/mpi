export interface Lesson {
  id: string;
  _id: string;
  title: string;
  description: string;
}

export interface Curriculum {
  _id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Video {
  _id: string;
  title: string;
  description: string;
  url: string;
  duration: number; // in seconds
  thumbnail: string;
  hasAssessmentNext: boolean;
  assessmentId?: string;
}

export interface AssessmentQuestion {
  questionType: "multiple-choice" | "true-false" | "short-answer"; // Extendable
  question: string;
  choices: string[];
  correctAnswer: string;
  _id: string;
  id: string;
}

export interface Assessment {
  assessmentType: "quiz" | "assignment"; // Extendable
  title: string;
  description: string;
  timeLimit: number; // in minutes
  attemptsAllowed: number;
  connectedWithVideo: boolean;
  connectedVideoId?: string;
  questions: AssessmentQuestion[];
  _id: string;
}

export interface UserAssessment {
  assessmentId: string;
  status: "unlocked" | "locked" | "passed" | "failed";
  questions: {
    questionId: string;
    userAnswer: string;
    answerStatus: "correct" | "incorrect" | "unanswered";
    _id: string;
  }[];
  _id: string;
}

export interface UserVideo {
  videoId: string;
  status: "newVideo" | "finished" | "unfinished" | "locked";
  _id: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced"; // Extendable
  externalResources: string[];
  curriculum: Curriculum;
  videos: Video[];
  assessments: Assessment[];
  startingCourse: boolean;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  lastUpdated: string;
  nextCourse?: string;
  prevCourse?: string;
}

export interface UserCourseProgress {
  courseId: Course;
  startingDate: string;
  assessments: UserAssessment[];
  videos: UserVideo[];
  videosFinished: boolean;
  assessmentsFinished: boolean;
  canView: boolean;
  status: "unlocked" | "started" | "finished" | "locked";
  _id: string;
}
