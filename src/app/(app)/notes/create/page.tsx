"use client"

import { addNoteSchema } from "@/schemas/addNoteSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const CreateNode = () => {
  type formData = z.infer<typeof addNoteSchema>
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addNoteSchema),
    defaultValues: {
      title: "",
      content: "",
      isHidden: false,
    },
  })

  const onSubmit: SubmitHandler<formData> = async (data) => {
    try {
      console.log(data)

      const res = await axios.post("/api/create-note", data)

      if (res.status === 200) {
        toast.success("Note Created Successfully")
        router.push("/notes")
      } else {
        toast.message("Error Creating Note", {
          description: res.data.message,
        })
      }
    } catch (error: any) {
      console.error("Error creating note:", error)
      toast.message("Error Creating Note", {
        description: error.response.data.message || error.message,
      })
    }
  }

  return (
    <section>
      {/* Heading */}
      <div className="head-text">
        <h1>
          Create New <span className="text-accent">Note</span>
        </h1>
        <p>
          Ready to jot down something new? Start by filling in the details
          below.
        </p>
      </div>

      {/* Form */}
      <div className="mt-14">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <div className="flex items-center justify-between">
              <label htmlFor="title">Title</label>
              {errors.title && (
                <span className="text-red-600 text-sm text-right">
                  {errors.title.message}
                </span>
              )}
            </div>
            <input
              type="text"
              id="title"
              placeholder="Enter a title here..."
              {...register("title")}
            />
          </div>

          {/* Add checkbox for isHidden */}

          <div className="form-field">
            <div className="flex items-center justify-between">
              <label htmlFor="content">Title</label>
              {errors.content && (
                <span className="text-red-600 text-sm text-right">
                  {errors.content.message}
                </span>
              )}
            </div>
            <textarea
              id="content"
              placeholder="Start typing..."
              {...register("content")}
            />
          </div>

          <div className="flex items-center gap-4 mb-7">
            <label className="font-semibold " htmlFor="isHidden">
              Hidden?
            </label>
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="checkbox"
              id="isHidden"
              {...register("isHidden")}
            />
          </div>

          <button className="custom-btn" type="submit">
            Save
          </button>
        </form>
      </div>
    </section>
  )
}

export default CreateNode
