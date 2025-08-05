"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Tasks = {
  id?: string | null;
  description: string;
  date: string;
  title: string;
  status?: string | null;
};

export type TaskStore = {
  task: Tasks[];
  addTask: (task: Tasks) => void;
  removeTask: (id: string) => void;
  changeStatus: (id: string, status: string) => void;
  editDescription: (id: string, description: string) => void;
};

const initialValue: Tasks[] = [];

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      task: initialValue,

      addTask: (task) => set((state) => ({ task: [...state.task, task] })),

      removeTask: (id) =>
        set((state) => ({ task: state.task.filter((task) => task.id !== id) })),

      changeStatus: (id, status) =>
        set((state) => ({
          task: state.task.map((task) =>
            task.id === id ? { ...task, status: status } : task
          ),
        })),

      editDescription: (id, desc) =>
        set((state) => ({
          task: state.task.map((task) =>
            task.id === id ? { ...task, description: desc } : task
          ),
        })),
    }),

    {
      name: "task-storage",
    }
  )
);
