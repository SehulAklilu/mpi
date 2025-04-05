import { ModuleResponse, UserCourseProgress } from "@/types/course.types";
import axiosInstance from "./axios";

export interface UserCoursesResponse {
  courses: UserCourseProgress[];
}

export interface CourseResponse {
  course: UserCourseProgress;
}

export interface UpdateVideoParams {
  course_id: string;
  video_id: string;
}

export interface UpdateVideoPayload {
  status: string;
}

export interface UserAnswer {
  assessmentId: string;
  attemptNumber: number;
  answers: string[];
  passed: boolean;
  score: number;
}

export interface UpdateAssessmentResponse {
  success: boolean;
  message: string;
  data: any;
}

export const getUserCourses = async (): Promise<UserCoursesResponse> => {
  const response = await axiosInstance.get("/api/v1/users/profile/courses");
  return response.data;
};

export const getUserCoursesNew = async (): Promise<ModuleResponse> => {
  const response = await axiosInstance.get("/api/v1/modules/me");
  return response.data;
};

export const getCourse = async (course_id: string): Promise<CourseResponse> => {
  const response = await axiosInstance.get(
    `/api/v1/users/profile/courses/${course_id}`
  );
  return response.data;
};

// export const getCourseNew = async (
//   course_id: string
// ): Promise<CourseResponse> => {
//   const response = await axiosInstance.get(`api/v1/modules/me/${course_id}`);
//   return response.data;
// };

export const updateVideoStatus = async (
  params: UpdateVideoParams,
  payload: UpdateVideoPayload
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/modules/complete-video/${params.video_id} `,
    payload
  );
  return response.data;
};

export const updateAssessmentStatus = async (
  params: {
    course_id: string;
    assessment_id: string;
  },
  payload: UserAnswer
): Promise<UpdateAssessmentResponse> => {
  const response = await axiosInstance.patch(
    `/api/v1/modules/assessment/${params.assessment_id} `,
    { questions: payload }
  );

  return response.data as UpdateAssessmentResponse;
};

export const getPlayersCourse = async (
  id: string
): Promise<UserCoursesResponse> => {
  const response = await axiosInstance.get(
    `/api/v1/users/player/${id}/courses`
  );
  return response.data;
};
