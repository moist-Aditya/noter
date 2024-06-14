"use client"

import NoteCard from "@/components/NoteCard"
import { ApiResponse } from "@/types/ApiResponse"
import { Note } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { Loader2, ToggleLeft, ToggleRight } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

const Notes = () => {
  const [notes, setNotes] = useState<Note[] | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const [showHidden, setShowHidden] = useState(false)

  const getNotes = async (): Promise<Note[] | undefined> => {
    try {
      const response = await axios.get<ApiResponse>("/api/get-notes")
      const result = response.data

      if (!result.success) {
        console.log(result.message)
        return
      }
      return result.notes
    } catch (error: any) {
      console.error(
        "Error getting notes",
        error.response?.data?.message || error.message
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchNotes = async () => {
      const fetchedNotes = await getNotes()
      if (fetchedNotes) {
        const sortedNotes = fetchedNotes.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        setNotes(sortedNotes)
      }
    }

    fetchNotes()
  }, [])

  const handleDelete = async (noteId: string) => {
    const oldNotes = notes
    const newNotes = notes?.filter((note) => note.id !== noteId)
    setNotes(newNotes)

    try {
      const response = await axios.delete(`/api/note-actions/${noteId}`)

      if (response.data.success) {
        toast.message(response.data.notes[0].title, {
          description: "Note deleted!",
        })
      } else {
        toast.message("Error deleting note", {
          description: response.data.message,
        })
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.message("Error deleting note", {
        description: axiosError.response?.data.message,
      })
      setNotes(oldNotes)
    }
  }

  // Filter notes based on showHidden state
  const filteredNotes = notes?.filter((note) => showHidden || !note.isHidden)

  return (
    <section>
      {/* Heading */}
      <div className="head-text">
        <h1>
          Your Personal <span className="text-accent">Note</span>s
        </h1>
        <p>Capture and organize your thoughts effortlessly.</p>
      </div>

      {/* Notes map */}
      <div className="mt-14">
        <div className="flex justify-between items-center">
          <h3 className="text-xs text-white/60">
            Showing {filteredNotes?.length || 0} note
            {filteredNotes?.length === 1 ? "" : "s"}
          </h3>
          <div
            className={`flex gap-4 items-center ${
              showHidden ? "text-red-600" : "text-slate-400"
            }`}
          >
            <p className="text-xs">Show Hidden</p>
            <button
              onClick={() => {
                setShowHidden((state) => !state)
              }}
            >
              {showHidden ? (
                <ToggleRight size={28} />
              ) : (
                <ToggleLeft size={28} />
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {filteredNotes && filteredNotes.length > 0
            ? filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  handleDelete={handleDelete}
                />
              ))
            : !isLoading && (
                <span className="text-base font-extralight text-center col-span-full mt-14">
                  You haven't added any notes yet. Start by creating your first
                  note!
                </span>
              )}
        </div>
        {isLoading && <Loader2 className="animate-spin" />}
      </div>
    </section>
  )
}

export default Notes
