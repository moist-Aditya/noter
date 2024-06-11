"use client"

import { ApiResponse } from "@/types/ApiResponse"
import { Note } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { Loader2, MoveLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

// Utility functions
function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

function nl2br(str: string) {
  return str.replace(/\n/g, "<br />")
}

function formatContent(content: string) {
  return nl2br(escapeHtml(content))
}

const ShowNote = ({ params }: { params: { noteId: string } }) => {
  const noteId = params.noteId
  const router = useRouter()
  const [note, setNote] = useState<Note>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getNote() {
      try {
        const response = await axios.get<ApiResponse>(
          `/api/note-actions/${noteId}`
        )

        if (response.data.notes) {
          const fetchedNote = response.data.notes[0]
          setNote(fetchedNote)
        } else {
          toast.message("Error fetching note", {
            description: response.data.message,
          })
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast.message("Error fetching note", {
          description: axiosError.response?.data.message,
        })
      } finally {
        setIsLoading(false)
      }
    }

    getNote()
  }, [])

  return (
    <section>
      <div className="border-b border-slate-900 mb-2 pb-3">
        <button
          onClick={() => {
            router.back()
          }}
          className="flex gap-2 items-center text-slate-500 hover:text-slate-200 cursor-default"
        >
          <MoveLeft size={16} />
          <p className="text-sm">Go back</p>
        </button>
      </div>
      {note ? (
        <div>
          <div className="flex justify-between items-center text-xs font-light text-slate-400">
            <p>
              Created:{" "}
              <span className="text-slate-200">
                {new Date(note.createdAt).toLocaleString()}
              </span>
            </p>
            <p>
              Last Updated:{" "}
              <span className="text-slate-200">
                {new Date(note.updatedAt).toLocaleString()}
              </span>
            </p>
          </div>
          <div className="mt-14 border max-w-[80%] mx-auto border-slate-900 p-7 rounded-3xl">
            <h1 className="text-3xl font-bold text-accent text-center">
              {note.title}
            </h1>
            <div
              className="mt-7 text-lg"
              dangerouslySetInnerHTML={{
                __html: formatContent(note.content),
              }}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-14">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </section>
  )
}

export default ShowNote
