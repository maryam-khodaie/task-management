"use client";
import { useRouter, useSearchParams } from "next/navigation";
// import { useTaskStore } from "../store";
import { useState } from "react";
import { Tasks, useTaskStore } from "../store";
export default function Edit() {
  const router = useRouter();
  const search = useSearchParams();
  const id = search.get("id");

  const tasks = useTaskStore((state) => state.task);
  const editDescription = useTaskStore((state) => state.editDescription);

  const editedTask = tasks.find((task) => task.id === id) as Tasks;

  const [desc, setDesc] = useState(editedTask?.description);

  function handleEdit() {

    editDescription(id as string, desc);

    router.push("/");
  }

  return (
    <div className="px-5 py-5 bg-blue-200 max-w-200 mx-auto mt-50 items-center gap-8 rounded-2xl flex flex-col">
      <div className="flex justify-around items-center w-full ">
        <label>Description:</label>
        <input
          className="border-solid border-1 rounded-lg p-3"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">

      <button
        onClick={handleEdit}
        className="rounded-lg p-3 border border-neutral-400 max-w-96 min-w-96 cursor-pointer"
      >
        Edit
      </button>
      <button
        onClick={() => router.back()}
        className="rounded-lg p-3 border border-neutral-400 max-w-96 min-w-96 bg-neutral-700 text-white cursor-pointer hover:bg-white hover:text-black"
      >
        Back
      </button>
      </div>
    </div>
  );
}
