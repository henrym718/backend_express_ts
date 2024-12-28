import z from "zod";

export const validatorCreateUser = z.object({
    name: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    roles: z.array(z.string()),
});

export type CreateUserDto = z.infer<typeof validatorCreateUser>;
