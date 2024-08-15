import { z } from 'zod'

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
})

//for zod infrence 
export type SignupInput = z.infer<typeof signupInput>



//sign in input

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string().min(6),
})

//for zod infrence
export type SigninInput = z.infer<typeof signinInput>

//for blog input

export const blogInput = z.object({
    title: z.string(),
    content: z.string(),
})

//for zod infrence
export type BlogInput = z.infer<typeof blogInput>

//update blog input

export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number(),
})

//for zod infrence
export type UpdateBlogInput = z.infer<typeof updateBlogInput>