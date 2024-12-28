import { UserCourseProgress } from "@/types/course.types";
import axiosInstance from "./axios";

export interface UserCoursesResponse {
  courses: UserCourseProgress[];
}

export const getUserCourses = async (): Promise<UserCoursesResponse> => {
  const response = await axiosInstance.get("/api/v1/users/profile/courses");
  return response.data;
};
