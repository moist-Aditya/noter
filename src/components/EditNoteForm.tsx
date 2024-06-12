"use client"

import { useForm } from "react-hook-form"
import db from "../../prisma/db"
import { zodResolver } from "@hookform/resolvers/zod"
import { addNoteSchema } from "@/schemas/addNoteSchema"
import { editNoteSubmit, getNote } from "@/app/actions"
import { Note } from "@prisma/client"
import { toast } from "sonner"

const EditNoteForm = ({ note }: { note: Note }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addNoteSchema),
    defaultValues: {
      title: note?.title,
      content: note?.content,
      isHidden: note?.isHidden as boolean,
    },
  })
  return (
    <>
      <form
        action={async (formData) => {
          const result = await editNoteSubmit(formData, note.id)
          if (result?.error) {
            toast.error(result.error)
          } else {
            toast.success("Note updated successfully")
          }
        }}
      >
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
            <label htmlFor="content">Content</label>
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

        <button className="btn-custom" type="submit">
          Save
        </button>
      </form>
    </>
  )
}

export default EditNoteForm
