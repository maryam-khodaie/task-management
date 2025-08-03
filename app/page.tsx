"use client"
import { Pencil } from "lucide-react"
import Link from "next/link"
import { title } from "process"
import { useState } from "react"

export type Tasks = {
  id: string,
  description: string,
  date: string,
  title: string,
  status: string,
}

const data:Tasks[] =[
  {
    id: Number(crypto.randomUUID()),
    description: "Math",
    date: "1 August",
    title: "task1",
    status: "done",
  },
  {
    id: 44,
    description: "fizik",
    date: "2 August",
    title: "task2",
    status: "in_progress",
  },
  {
    id: 76,
    description: "programming",
    date: "3 August",
    title: "task3",
    status: "done",
  }

] 




export default function Home() {
  const [tasks, setTasks] = useState<Tasks[]>(data);
  return(
    <div className="max-w-[600px] mx-auto mt-56">
     
      
      <ul className="border-2 border-solid border-blue-300 px-4 py-4 text-shadow-stone-700 bg-blue-200 rounded-2xl ">
        {tasks.map((task) => 
        <div className="text-center flex justify-between">

          <li className="" key={task.id}>{task.title}</li>
          <button><Link href="/edit"><Pencil size={16}/></Link></button>
        </div>
        )}
      </ul>
      <button><Link href="/add-tasks">Add tasks</Link></button>

       
    </div>
  )
}



