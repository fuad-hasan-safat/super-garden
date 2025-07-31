import z from "zod";

export const authSchema = z.object({
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
});


export type authType = z.infer<typeof authSchema> ;