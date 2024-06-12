import { getNote } from "@/app/actions"
import EditNoteForm from "@/components/EditNoteForm"
import { ApiResponse } from "@/types/ApiResponse"
import { Note } from "@prisma/client"
import axios, { AxiosError } from "axios"
import { Suspense } from "react"

async function EditForm({ noteId }: { noteId: string }) {
  const res: ApiResponse = await getNote(noteId)
  if (res.notes && res.notes.length > 0) {
    const note: Note = res.notes[0]
    return <EditNoteForm note={note} />
  }
  return <h3>Note not found</h3>
}

const EditNote = async ({ params }: { params: { noteId: string } }) => {
  const noteId = params.noteId

  return (
    <div>
      <div className="head-text">
        <h1>
          Edit <span className="text-accent">Note</span>
        </h1>
        <p>Edit your note and click save.</p>
      </div>
      <div className="mt-14">
        <Suspense fallback={<p>Loading...</p>}>
          <EditForm noteId={noteId} />
        </Suspense>
      </div>
    </div>
  )
}

export default EditNote
