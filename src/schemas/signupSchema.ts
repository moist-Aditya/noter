import { z } from "zod";

export const signUpSchema = z.object({
    username: z
        .string()
        .min(5, "Username must be minimum 5 characters")
        .max(20, "Username cannot be more than 20 characters")
        .regex(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/, "Username cannot contain special characters"),
    password: z.string().min(5).max(30)
})