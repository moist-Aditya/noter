import { z } from "zod"

export const addNoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  isHidden: z.boolean(),
})
