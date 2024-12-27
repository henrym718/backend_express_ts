// src/modules/user/infrastructure/controllers/UserController.ts
import { Request, Response } from "express";
import { UserApplication } from "@User/application/user.application";
import { CreateUserDto } from "../dtos/user.dtos";
import { UserFactory } from "@User/domain/factories/user.factory";

export class UserController {
    constructor(private readonly userApplication: UserApplication) {}

    public async save(req: Request, res: Response) {
        try {
            const validationResult = CreateUserDto.safeParse(req.body);

            if (!validationResult.success) {
                res.status(411).json({
                    message: "Validation error de schema ",
                    errors: validationResult.error.issues,
                });
            }
            const user = UserFactory.create(validationResult.data!);
            await this.userApplication.save(user);
            res.status(411).json({ message: "User created correctly" });
        } catch (error) {
            res.status(411).json({
                message: "Validation error",
                errors: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
