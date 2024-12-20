import express, { Application } from "express";
import http from "http";
import cors from "cors";
import helmet from "helmet";
import { logguer } from "../helpers/logguer";

export class ServerBootstrap {
    private static instance: ServerBootstrap;
    private readonly app: Application;
    private httpServer: http.Server | null = null;

    private constructor() {
        this.app = express();
        this.configureMiddlewares();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new ServerBootstrap();
        }
        return this.instance;
    }

    private configureMiddlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
    }

    public async initialize(): Promise<void> {
        return new Promise((resolve, reject) => {
            const PORT = process.env.PORT;
            this.httpServer = http.createServer(this.app);

            this.httpServer
                .listen(PORT)
                .on("listening", () => {
                    logguer.info(`✅ Servidor corriendo en puerto ${PORT}`);
                    resolve();
                })
                .on("error", (error) => {
                    reject(error);
                });
        });
    }

    private configureRoutes() {}
}
