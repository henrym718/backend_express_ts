import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserApplication } from "@User/application/user.application";
import { UserRepositoryImpl } from "@User/infraestructure/UserRepositoryImpl";
import { UserRepository } from "@User/domain/respositories/user.repository";

const userRepositoryImp: UserRepository = new UserRepositoryImpl();
const userApplication = new UserApplication(userRepositoryImp);
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
