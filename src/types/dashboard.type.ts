export interface TodoPayload {
  title: string;
  dueDate: Date;
  timezone: string;
  isCompleted?: boolean;
}

export interface Todo {
  _id: string;
  userId: string;
  title: string;
  isCompleted: boolean;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
