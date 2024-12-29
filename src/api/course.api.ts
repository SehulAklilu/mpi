import { UserCourseProgress } from "@/types/course.types";
import axiosInstance from "./axios";

export interface UserCoursesResponse {
  courses: UserCourseProgress[];
}

export interface CourseResponse {
  course: UserCourseProgress;
}

export const getUserCourses = async (): Promise<UserCoursesResponse> => {
  const response = await axiosInstance.get("/api/v1/users/profile/courses");
  return response.data;
};

export const getCourse = async (course_id: string): Promise<CourseResponse> => {
  const response = await axiosInstance.get(
    `/api/v1/users/profile/courses/${course_id}`
  );
  return response.data;
};
