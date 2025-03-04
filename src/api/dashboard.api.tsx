import { Todo, TodoPayload } from "@/types/dashboard.type";
import axiosInstance from "./axios";

export const getRecentTodos = async (): Promise<{ todos: Todo[] }> => {
  const response = await axiosInstance.get(`/api/v1/todos/latest`);
  return response.data;
};

export const createTodo = async (payload: TodoPayload): Promise<any> => {
  const response = await axiosInstance.post(`/api/v1/todos`, payload);
  return response.data;
};

export const updateTodo = async (
  todoId: string,
  payload: any
): Promise<any> => {
  const response = await axiosInstance.patch(
    `/api/v1/todos/${todoId}`,
    payload
  );
  return response.data;
};

export const deleteTodo = async (id: string): Promise<any> => {
  const response = await axiosInstance.delete(`/api/v1/todos/${id}`);
  return response.data;
};
