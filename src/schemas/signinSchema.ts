import { z } from "zod"

export const signInSchema = z.object({
  username: z.string().min(5).max(20),
  password: z.string(),
})
