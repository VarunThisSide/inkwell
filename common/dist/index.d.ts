import * as zod from 'zod';
export declare const signupInput: zod.ZodObject<{
    email: zod.ZodEmail;
    name: zod.ZodString;
    password: zod.ZodString;
}, zod.z.core.$strip>;
export type SignupInput = zod.infer<typeof signupInput>;
export declare const signinInput: zod.ZodObject<{
    email: zod.ZodEmail;
    password: zod.ZodString;
}, zod.z.core.$strip>;
export type SigninInput = zod.infer<typeof signinInput>;
export declare const createPostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    authorId: zod.ZodString;
}, zod.z.core.$strip>;
export type CreatePostInput = zod.infer<typeof createPostInput>;
export declare const updatePostInput: zod.ZodObject<{
    title: zod.ZodString;
    content: zod.ZodString;
    authorId: zod.ZodString;
}, zod.z.core.$strip>;
export type UpdatePostInput = zod.infer<typeof updatePostInput>;
//# sourceMappingURL=index.d.ts.map