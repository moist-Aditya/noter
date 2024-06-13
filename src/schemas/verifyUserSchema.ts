import { z } from "zod"

export const verifyUserSchema = z.object({
  verifyCode: z
    .string()
    .length(6, { message: "Verification code should be 6 digits long" }),
})
