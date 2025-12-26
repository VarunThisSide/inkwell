import * as zod from 'zod'

export const signupInput=zod.object({
    email : zod.email(),
    name : zod.string().min(1),
    password : zod.string().min(6)
})
export type SignupInput=zod.infer<typeof signupInput>

export const signinInput=zod.object({
    email : zod.email(),
    password : zod.string().min(6)
})
export type SigninInput=zod.infer<typeof signinInput>

export const createPostInput=zod.object({
    title : zod.string().min(1),
    content : zod.string().min(1)
})
export type CreatePostInput=zod.infer<typeof createPostInput>

export const updatePostInput=zod.object({
    title : zod.string().min(1),
    content : zod.string().min(1)
})
export type UpdatePostInput=zod.infer<typeof updatePostInput>