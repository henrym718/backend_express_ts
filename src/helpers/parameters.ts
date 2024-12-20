// // process.loadEnvFile();

// // import { z } from "zod";
// // import { logguer } from "./logguer";

// const envSchema = z.object({
//     // DB_TYPE: z.enum(["postgres", "mysql", "sqlite"]).default("postgres"),
//     // DB_HOST: z.string().min(1, "DB_HOST es obligatorio"),
//     // DB_PORT: z.string().min(1, "DB_PORT es obligatorio").transform(Number),
//     // DB_USERNAME: z.string().min(1, "DB_USERNAME es obligatorio"),
//     // DB_PASSWORD: z.string().min(1, "DB_PASSWORD es obligatorio"),
//     // DB_DATABASE: z.string().min(1, "DB_DATABASE es obligatorio"),
//     APP_PORT: z.string().min(1, "PORT es obligatorio").transform(Number),
// });

// // const { success, error, data } = envSchema.safeParse(process.env);

// // if (!success) {
// //     console.error("❌ Error en las variables de entorno:", error.issues);
// //     process.exit(1);
// // } else {
// //     logguer.info("✅ Variables de entorno cargadas correctamente");
// // }

// // export const { APP_PORT } = data;
// // import { z } from "zod";
// // import { logguer } from "./logguer";

// // const envSchema = z.object({
// //     APP_PORT: z.string().min(1).transform(Number),
// //     NODE_ENV: z.enum(["development", "production", "test"]),
// // });

// // export class EnvBootstrap implements Bootstrap {
// //     public readonly APP_PORT!: number;
// //     public readonly NODE_ENV!: "development" | "production" | "test";

// //     async inizialite(): Promise<boolean> {
// //         try {
// //             const env = this.validateEnv(process.env);

// //             this.APP_PORT = env.APP_PORT;
// //             this.NODE_ENV = env.NODE_ENV;

// //             logguer.info("✅ Variables de entorno cargadas correctamente.");
// //             return true;
// //         } catch (error) {
// //             logguer.error("❌ Error al cargar las variables de entorno.");
// //             throw error; // Dejar que el `try/catch` en el index lo maneje.
// //         }
// //     }

// //     private validateEnv(env: NodeJS.ProcessEnv) {
// //         const { success, data, error } = envSchema.safeParse(env);

// //         if (!success) {
// //             console.error("❌ Error en las variables de entorno:", error.issues);
// //             process.exit(1); // Finaliza si la validación falla
// //         }

// //         return data;
// //     }
// // }

// process.loadEnvFile();
// import { z } from "zod";
// import { logguer } from "./logguer";

// // Definir el esquema de validación de las variables de entorno
// const envSchema = z.object({
//     DB_TYPE: z.enum(["postgres", "mysql", "sqlite"]).default("postgres"),
//     DB_HOST: z.string().min(1, "DB_HOST es obligatorio"),
//     DB_PORT: z.string().min(1, "DB_PORT es obligatorio").transform(Number),
//     DB_USERNAME: z.string().min(1, "DB_USERNAME es obligatorio"),
//     DB_PASSWORD: z.string().min(1, "DB_PASSWORD es obligatorio"),
//     DB_DATABASE: z.string().min(1, "DB_DATABASE es obligatorio"),
//     APP_PORT: z.string().min(1).transform(Number),
//     NODE_ENV: z.enum(["development", "production", "test"]),
// });

// type EnvConfig

// export class Parameter {
//     // Propiedades de configuración instanciadas
//     // public readonly DB_CONFIG: DataSourceOptions;
//     public readonly APP_PORT: number;
//     public readonly NODE_ENV: "development" | "production" | "test";

//     // Constructor donde se realiza la validación y asignación de valores
//     constructor() {
//         const env = this.validateEnv(process.env);

//         // Asignar las propiedades a los valores validados
//         // this.DB_CONFIG = {
//         //     type: env.DB_TYPE,
//         //     host: env.DB_HOST,
//         //     port: env.DB_PORT,
//         //     username: env.DB_USERNAME,
//         //     password: env.DB_PASSWORD,
//         //     database: env.DB_DATABASE,
//         // };
//         this.APP_PORT = env.APP_PORT;
//         this.NODE_ENV = env.NODE_ENV;
//         logguer.info("✅ Variables de entorno cargadas correctamente.");
//     }

//     // Validar las variables de entorno
//     private validateEnv(env: NodeJS.ProcessEnv) {
//         const { success, data, error } = envSchema.safeParse(env);

//         if (!success) {
//             console.error("❌ Error en las variables de entorno:", error.issues);
//             process.exit(1); // Termina el proceso si la validación falla
//         }

//         return data;
//     }
// }
