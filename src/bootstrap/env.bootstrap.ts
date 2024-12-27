import path from "path";
import fs from "fs";
import { logguer } from "../config/logguer";
import { EnvConfig, envSchema } from "../config/env.schema";

export class EnvironmentBootstrap {
    private static config: EnvConfig;

    public async initialize(): Promise<void> {
        const envPath = this.getEnvPath();
        await this.ensureEnvFileExists(envPath);
        process.loadEnvFile(envPath);
        EnvironmentBootstrap.config = this.validateEnvironmentVariables(process.env);
        logguer.info("✅ Variables de entbooorno cargadas correctamente");
    }

    private async ensureEnvFileExists(envPath: string): Promise<void> {
        if (!fs.existsSync(envPath)) {
            throw new Error(`El archivo de entorno ${envPath} no se encuentra en el sistema.`);
        }
    }

    private getEnvPath(): string {
        const environment = process.env.NODE_ENV ?? "development";
        return path.resolve(process.cwd(), `.env.${environment}`);
    }

    private validateEnvironmentVariables(env: NodeJS.ProcessEnv): EnvConfig {
        const result = envSchema.safeParse(env);
        if (!result.success) {
            const errorDetails = result.error.issues.map((err) => `${"\n-"} ${err.path}: ${err.message}`).join("");
            throw new Error(`Validación de entorno fallida ${errorDetails}`);
        }
        return result.data;
    }

    public static get ENV() {
        return this.config;
    }
}
