import express, { Application } from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import { logguer } from "../config/logguer";
import { EnvironmentBootstrap } from "./env.bootstrap";
import { userRoutes } from "@User/presentation/routes/user.routes";

export class ServerBootstrap {
    private readonly app: Application;
    private httpServer: http.Server | null = null;

    constructor() {
        this.app = express();
        this.configureMiddlewares();
        this.configureRoutes();
    }

    public async initialize(): Promise<void> {
        const ENV = EnvironmentBootstrap.ENV;
        return new Promise((resolve, reject) => {
            this.httpServer = http.createServer(this.app);

            this.httpServer
                .listen(ENV.PORT)
                .on("listening", () => {
                    logguer.info(`✅ Servidor corriendo en puerto ${ENV.PORT}`);
                    resolve();
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    private configureMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private configureRoutes() {
        this.app.use("/user", userRoutes);
    }

    public async close(): Promise<void> {
        if (this.httpServer) {
            return new Promise((resolve) => {
                this.httpServer!.close(() => {
                    logguer.info("❌ Servidor detenido");
                    resolve();
                });
            });
        }
    }
}
