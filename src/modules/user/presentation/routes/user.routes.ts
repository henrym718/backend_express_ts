import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CreateUserUseCase } from "@User/application/usecases/CreateUserUseCase";
import { UserRepositoryImpl } from "@User/infraestructure/repositories/UserRepositoryImpl";
import { UserRepository } from "@User/domain/respositories/user.repository";

const userRepositoryImp: UserRepository = new UserRepositoryImpl();
const userApplication = new CreateUserUseCase(userRepositoryImp);
const userController = new UserController(userApplication);

class UserRoutes {
    router: Router;

    constructor() {
        this.router = Router();
        this.addRoutes();
    }

    private addRoutes() {
        this.router.post("/", userController.save.bind(userController));
    }
}

export const userRoutes = new UserRoutes().router;
