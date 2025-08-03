"use client"

import { useForm } from "react-hook-form"
import { Tasks } from "../page";
import { v4 as uuidv4 } from "uuid"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const taskSchema = z.object({
            id: z.string().nullable().optional(),
            title: z.string().min(1 , "Enter title"),
            description: z.string().min(1, "Enter description"),
            date: z.string().min(1, "Choose date"),
            status: z.string().nullable().optional(),
        })
export default function Add () {
    const {register, handleSubmit, formState: {errors}} = useForm<Tasks>({resolver: zodResolver(taskSchema)});
    // console.log(formState);
    

    function onSubmit (value:Tasks) {
        const task = {...value, id: uuidv4()}
        console.log(task);
        
    }
    return(
        <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-5 max-w-200 mx-auto mt-50 border-2 border-blue-300 bg-blue-200 flex flex-col gap-2">
            <label className="flex gap-6">
                Title:
                <input className="border-solid border-1" {...register("title")}/>
                {errors.title && <p className="text-red-600 text-[12px]">*{errors.title.message}</p>}
            </label>
            <label className="flex gap-6">
                Description:
                <input className="border-solid border-1" {...register("description")}/>
                {errors.description && <p className="text-red-600 text-[12px]">*{errors?.description.message}</p>}
            </label>
            <label className="flex gap-6">
                Date:
                <input type="date" className="border-solid border-1" {...register("date")}/>
                {errors.date && <p className="text-red-600 text-[12px]">*{errors?.date.message}</p>}
            </label>
            <button type="submit" className="border-1 mx-80">Submit</button>
        </form>
    )
}