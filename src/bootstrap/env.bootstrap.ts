import path from "path";
import fs from "fs/promises";
import { logguer } from "../helpers/logguer";
import { EnvConfig, envSchema } from "../config/env.schema";

export class EnvironmentBootstrap {
    private static instance: EnvironmentBootstrap;
    private config: EnvConfig | null = null;

    private constructor() {}

    public static getInstance(): EnvironmentBootstrap {
        if (!this.instance) {
            this.instance = new EnvironmentBootstrap();
        }
        return this.instance;
    }

    public async initialize(): Promise<void> {
        try {
            // Determinar el path del archivo .env basado en el entorno
            const envPath = this.getEnvPath();

            // Verificar si el archivo .env existe
            await this.ensureEnvFileExists(envPath);

            // Cargar variables de entorno
            process.loadEnvFile(envPath);

            // Validar que se hayan cargado correctamente las variables
            this.config = this.validateEnvironmentVariables(process.env);

            logguer.info("✅ Variables de entorno cargadas correctamente");
        } catch (error) {
            throw error;
        }
    }

    private async ensureEnvFileExists(envPath: string): Promise<void> {
        try {
            await fs.access(envPath);
        } catch (error) {
            throw new Error(`El archivo de entorno ${envPath} no se encuentra en el sistema.`);
        }
    }

    private getEnvPath(): string {
        const environment = process.env.NODE_ENV || "development";
        return path.resolve(process.cwd(), `.env.${environment}`);
    }

    private validateEnvironmentVariables(env: NodeJS.ProcessEnv): EnvConfig {
        const { success, data, error } = envSchema.safeParse(env);

        if (!success) {
            const errorDetails = error.issues.map((err) => `${"\n-"} ${err.path}: ${err.message}`).join("");
            throw new Error(`Validación de entorno fallida ${errorDetails}`);
        }
        return data;
    }

    public getEnv(): EnvConfig {
        if (!this.config) {
            throw new Error("Configuración de entorno no inicializada");
        }
        return this.config;
    }
}
