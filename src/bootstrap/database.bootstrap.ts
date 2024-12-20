import { logguer } from "../helpers/logguer";
import { DataSource, DataSourceOptions } from "typeorm";
import { ENV } from "../bootstrap";

export class DataBaseBootstrap {
    private static instance: DataBaseBootstrap;
    private dataSourse: DataSource | null = null;

    private constructor() {}

    public static getInstance(): DataBaseBootstrap {
        if (!this.instance) {
            this.instance = new DataBaseBootstrap();
        }
        return this.instance;
    }

    public async initialize() {
        try {
            const dataSourceOptions: DataSourceOptions = {
                type: "postgres",
                host: ENV.DB_HOST,
                port: ENV.DB_PORT,
                username: ENV.DB_USERNAME,
                password: ENV.DB_PASSWORD,
                database: ENV.DB_DATABASE,

                // Configuración de entidades
                entities: [],

                // Configuración de peticiones
                poolSize: 10,
                maxQueryExecutionTime: 10000,

                // Configuraciones adicionales de desarrollo
                synchronize: ENV.NODE_ENV === "development",
                // logging: ENV.NODE_ENV === "development",
            };

            // Crear instancia de DataSource
            const AppDataSource = new DataSource(dataSourceOptions);

            // Inicializar conexión
            this.dataSourse = await AppDataSource.initialize();

            logguer.info("✅ Base de datos conectada con éxito ");

            return this.dataSourse;
        } catch (error) {
            throw new Error(`Base de datos sin conexion: ${error};`);
        }
    }

    public getDatasource() {
        if (!this.dataSourse) {
            throw new Error("La base de datos no ha sido inicializada");
        }
        return this.dataSourse;
    }

    public async close() {
        try {
            if (this.dataSourse) {
                await this.dataSourse.destroy();
                logguer.info("Conexión a la base de datos cerrada");
            }
        } catch (error) {
            throw error;
        }
    }
}
