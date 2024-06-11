import { Note } from "@prisma/client"
import { Trash2 } from "lucide-react"
import Link from "next/link"

const NoteCard = ({
  note,
  handleDelete,
}: {
  note: Note
  handleDelete: (noteId: string) => void
}) => {
  const formattedDate = new Date(note.updatedAt).toLocaleString()

  return (
    <div className="relative group/delete">
      <Link href={`/show-note/${note.id}`}>
        <div
          className={`border-t ${
            note.isHidden ? "border-red-600" : "border-slate-800"
          } p-4 pb-2 rounded-lg shadow-sm shadow-accent-dark
            hover:shadow-accent hover:bg-primary transition-all`}
        >
          <div>
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-sm text-slate-500">
              {note.content.slice(0, 20) + "..."}
            </p>
            <div className="text-xs text-slate-300 mt-7 border-t border-slate-900/80 pt-2">
              <p>Last updated: {formattedDate}</p>
            </div>
          </div>
        </div>
      </Link>

      <button
        onClick={() => handleDelete(note.id)}
        className="p-1 rounded-md absolute top-1 right-1 hidden group-hover/delete:block bg-red-700 z-10"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

export default NoteCard
