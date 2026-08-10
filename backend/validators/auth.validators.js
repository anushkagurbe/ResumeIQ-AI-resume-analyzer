import { z } from "zod";

export let registerSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .trim()
        .min(4, { message: "Name should be at least 4 characters long" }),
    email: z
        .string()
        .email({ message: "Enter a valid email address" })
        .trim()
        .transform((email)=>email.toLowerCase()),
    password: z
        .string({ required_error: "Password is required" })
        .trim()
        .min(8, { message: "Password must be at least 8 characters long" })
})

export let loginSchema = z.object({
    email: z
        .string()
        .email({ message: "Enter a valid email address" })
        .trim()
        .transform((email)=>email.toLowerCase()),
    password: z
        .string({ required_error: "Password is required" })
        .min(1, { message: "Password is required" })
})