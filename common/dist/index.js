import * as zod from 'zod';
export const signupInput = zod.object({
    email: zod.email(),
    name: zod.string().min(1),
    password: zod.string().min(6)
});
export const signinInput = zod.object({
    email: zod.email(),
    password: zod.string().min(6)
});
export const createPostInput = zod.object({
    title: zod.string().min(1),
    content: zod.string().min(1),
    authorId: zod.string()
});
export const updatePostInput = zod.object({
    title: zod.string().min(1),
    content: zod.string().min(1),
    authorId: zod.string()
});
//# sourceMappingURL=index.js.map