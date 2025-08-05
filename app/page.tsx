"use client";
import { Pencil, Trash2 } from "lucide-react";

import { useTaskStore } from "./store";
import { useRouter } from "next/navigation";


export default function Home() {
  const tasks = useTaskStore((state) => state.task);
  const router = useRouter();
  console.log(tasks);

  function handleClick() {
    router.push("./add-tasks");
  }

  const removeTask = useTaskStore((state) => state.removeTask);
  const changeStatus = useTaskStore((state) => state.changeStatus);
  console.log(changeStatus);

  function handleclick(id: string) {
    removeTask(id);
  }

  function handleChangeStatus(id: string, status: string) {
    changeStatus(id, status);
  }

  function handleEdit(id: string) {
    router.push(`/edit?id=${id}`);
  }
  return (
    <div className="max-w-[700px] mx-auto mt-56">
      <ul className="border-2 border-solid border-blue-300 px-4 py-4 text-shadow-stone-700 bg-blue-200 rounded-2xl ">
        {tasks.length !== 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="flex justify-between">
              <div className="mt-2">
                <li>Title: {task.title}</li>
                <p className="text-sm text-neutral-700">
                  Description: {task.description}
                </p>
                <span>
                  Status:{" "}
                  {task.status === "in_progress" ? "In progress" : "Done"}
                </span>
                <br></br>
              </div>

              <div className="flex items-center gap-3 ">
                <select
                  className="px-2 py-2 border border-neutral-400 rounded-md"
                  value={task.status as string}
                  onChange={(e) => {
                    console.log(e.target.value);

                    const status = e.target.value;
                    handleChangeStatus(task.id as string, status);
                  }}
                >
                  <option value={"in_progress"}>in progress</option>
                  <option value={"done"}>done</option>
                </select>
                <div className="flex gap-3 cursor-pointer ">
                  <button className="cursor-pointer" onClick={() => handleEdit(task.id ?? "")}>
                    <Pencil size={16} />
                  </button>
                  <button className="cursor-pointer" onClick={() => handleclick(task.id ?? "")}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center">No Task.</h5>
        )}
      </ul>
      <button
        className="rounded-lg p-3 border border-neutral-400 w-full cursor-pointer mx-auto mt-6"
        onClick={() => handleClick()}
      >
        Add tasks
      </button>
    </div>
  );
}
