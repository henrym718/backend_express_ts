import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import { productRouter } from "./modules/products/productRoutes";

class App {
    private app: Application;

    constructor() {
        this.app = express();
        this.healthCheck();
        this.handleMiddleware();
        this.handleRoutes();
    }

    getAppInstance() {
        return this.app;
    }

    private healthCheck() {
        this.app.get("/", (req: Request, res: Response) => {
            res.send("OK");
        });
    }
    private handleMiddleware() {
        this.app.use(helmet());
        this.app.use(express.json());
        this.app.use(cors({ origin: "http://localhost:5173", credentials: true }));
    }

    private handleRoutes() {
        this.app.use("/product", productRouter);
    }
}

const app = new App().getAppInstance();

export { app };
