import axios from "axios";
import axiosWithConfig from "../axiosWithConfig";
import { Task, TaskSync } from "./types";

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

export const getSingleTask = async (id: string) => {
  try {
    const response = await axiosWithConfig.get(`/tasks/${id}`)
    return response.data as Task
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

export const updateTask = async (id: string, body: ICreateTask) => {
  try {
    const response = await axiosWithConfig.post("/tasks/" + id, body)
    return response.status
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const closeTask = async (id: string) => {
  try {
    const response = await axiosWithConfig.post(`/tasks/${id}/close`)
    return response.status
  } catch (error: any) {
    throw new Error(error.message);

  }
}


export const reOpenTask = async (id: string) => {
  try {
    const response = await axiosWithConfig.post(`/tasks/${id}/reopen`)
    return response.status
  } catch (error: any) {
    throw new Error(error.message);

  }
}

export const getAllCompletedTasks = async () => {
  try {
    const response = await axios.get(`https://api.todoist.com/sync/v9/completed/get_all`, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NEWS_API_KEY}`
      }
    })
    return response.data as TaskSync
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const deleteTask = async (id: string) => {
  try {
    const response = await axiosWithConfig.delete(`/tasks/${id}`)
    return response.status
  } catch (error: any) {
    throw new Error(error.message);
  }
}