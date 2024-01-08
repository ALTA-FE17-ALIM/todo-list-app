import axiosWithConfig from "../axiosWithConfig";
import { Task } from "./types";

interface ICreateTask {
  content: string;
  description: string;
}
/* eslint-disable @typescript-eslint/no-explicit-any */
export const getActiveTasks = async () => {
  try {
    const response = await axiosWithConfig.get("/tasks")
    return response.data as Task[]
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const createTask = async (body: ICreateTask) => {
  try {
    const response = await axiosWithConfig.post("/tasks", body)
    return response.data as Task
  } catch (error: any) {
    throw new Error(error.message);

  }
}