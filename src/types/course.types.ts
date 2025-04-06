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

// Content Item Progress Interface
interface VideoProgress {
  currentTime: number;
  completed: boolean;
}

interface AnswerAttempt {
  answers: any[]; // Replace 'any' with a more specific type if possible
}

interface AssessmentAttempt {
  // Define properties for assessment attempts if needed
}

interface ContentItemProgress {
  _id: string;
  userId: string;
  moduleId: string;
  weekId: string;
  contentItemId: string;
  status: "locked" | "unlocked" | "completed";
  videoProgress: VideoProgress;
  currentAttempt: AnswerAttempt;
  assessmentAttempts: AssessmentAttempt[];
  __v: number;
  createdAt: string;
  updatedAt: string;
}

// Quiz Question Interface
interface QuizQuestion {
  question: string;
  type: "multipleChoice" | "trueFalse" | "shortAnswer"; // Add other types as needed
  options?: string[];
  correctAnswers: string[];
  explanation: string;
}

// Content Item Interface
export interface ContentItem {
  _id: string;
  caption: string;
  description: string;
  duration: number;
  order: number;
  requiredItems: string[];
  thumbnail: string;
  type: "video" | "quiz" | "reading" | "assignment"; // Add other types as needed
  unlocksNext?: string;
  videoId?: string;
  weekId: string;
  deleted: boolean;
  isPublished: boolean;
  title: string;
  questions?: QuizQuestion[]; // Only present for quiz type
  progress?: ContentItemProgress;
}

// Week Progress Interface
interface WeekProgress {
  status: "not_started" | "in_progress" | "completed";
  completedItems: number;
  totalItems: number;
  percentageCompleted: number;
}

// Week Interface
interface Week {
  _id: string;
  contentItems: ContentItem[];
  deleted: boolean;
  description: string;
  isPublished: boolean;
  title: string;
  weekNumber: number;
  moduleId: string;
  progress: WeekProgress;
}

// Module Progress Interface
interface ModuleProgress {
  completedWeeks: number;
  totalWeeks: number;
  completedContentItems: number;
  totalContentItems: number;
  completionPercentage: number;
  status: "not_started" | "in_progress" | "completed" | "locked";
  startedAt: string | null;
  completedAt: string | null;
}

// Module Interface
export interface Module {
  _id: string;
  courses: string[];
  deleted: boolean;
  description: string;
  isPublished: boolean;
  nextModule: string | null;
  order: number;
  previousModule: string | null;
  startingModule: boolean;
  title: string;
  thumbnail: string;
  weeks: Week[];
  progress: ModuleProgress;
}

// The complete response would be an array of Modules
export interface ModuleResponse extends Array<Module> {}
