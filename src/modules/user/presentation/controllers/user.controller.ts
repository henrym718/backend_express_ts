import { Request, Response } from "express";
import { CreateUserUseCase } from "@User/application/usecases/CreateUserUseCase";
import { CreateUserDto, validatorCreateUser } from "@User/application/dtos/create-user.dto";

export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    public async save(req: Request, res: Response) {
        try {
            const validationResult: CreateUserDto = validatorCreateUser.parse(req.body);
            await this.createUserUseCase.execute(validationResult);
            res.status(411).json({ message: "User created correctly" });
        } catch (error) {
            res.status(411).json({
                message: "Validation error",
                errors: error instanceof Error ? error.message : "Unknown error",
            });
        }
    }
}
