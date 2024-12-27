import { z } from "zod";

export const envSchema = z.object({
    // Configuración del servidor
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.string().transform(Number),

    // Base de datos
    DB_TYPE: z.enum(["postgres", "mysql", "sqlite"]).default("postgres"),
    DB_HOST: z.string().min(1),
    DB_PORT: z.string().min(1).transform(Number),
    DB_USERNAME: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_DATABASE: z.string().min(1),
    DB_ENTITIES: z.string().default("src/**/infraestructure/**/*.entity.ts"),
    DB_POOL_SIZE: z.string().transform(Number).default("10"),
    DB_MAX_QUERY_EXECUTION_TIME: z.string().transform(Number).default("10000"),

    // // Servicios externos
    // AWS_ACCESS_KEY_ID: z.string(),
    // AWS_SECRET_ACCESS_KEY: z.string(),
    // AWS_REGION: z.string(),

    // // Autenticación
    // JWT_SECRET: z.string().min(32),
    // JWT_EXPIRATION: z.string().default("1h"),

    // // Servicios de terceros
    // STRIPE_SECRET_KEY: z.string().optional(),
    // FIREBASE_API_KEY: z.string().optional(),

    // // URLs de servicios
    // MONGODB_URI: z.string().url().optional(),
    // REDIS_URL: z.string().url().optional(),
});

export type EnvConfig = z.infer<typeof envSchema>;
