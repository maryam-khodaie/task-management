"use client";

import { useForm } from "react-hook-form";
// import { v4 as uuidv4 } from "uuid"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tasks, useTaskStore } from "../store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const taskSchema = z.object({
  id: z.string().nullable().optional(),
  title: z.string().min(1, "Enter title"),
  description: z.string().min(1, "Enter description"),
  date: z.string().min(1, "Choose date"),
  status: z.string().nullable().optional(),
});
export default function Add() {
  const router = useRouter();
  const addTask = useTaskStore((state) => state.addTask);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Tasks>({ resolver: zodResolver(taskSchema) });

  function onSubmit(value: Tasks) {
    addTask({ ...value, id: uuidv4(), status: 'in_progress' });
    console.log(addTask);
    router.push("/");
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col px-5 py-5 max-w-200 mx-auto mt-50 border-2 border-blue-300 bg-blue-200 items-center  gap-6 rounded-2xl"
    >
      <div className="grid grid-cols-2 w-full">
        <label className="">Title:</label>
        <input
          className="border-solid border-1 rounded-lg p-3"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-red-600 text-[12px]">*{errors.title.message}</p>
        )}
      </div>
      <div className="grid grid-cols-2 w-full">
        <label>Description:</label>
        <input
          className="border-solid border-1 rounded-lg p-3"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-red-600 text-[12px]">
            *{errors?.description.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 w-full">
        <label>Date:</label>
        <input
          type="date"
          className="border-solid border-1 rounded-lg p-3"
          {...register("date")}
        />
        {errors.date && (
          <p className="text-red-600 text-[12px]">*{errors?.date.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="rounded-lg p-3 border border-neutral-400 max-w-96 min-w-96 cursor-pointer"
      >
        Submit
      </button>
      <button
        onClick={() => router.back()}
        className="rounded-lg p-3 border border-neutral-400 max-w-96 min-w-96 bg-neutral-700 text-white cursor-pointer hover:bg-white hover:text-black"
      >
        Back
      </button>
    </form>
  );
}
