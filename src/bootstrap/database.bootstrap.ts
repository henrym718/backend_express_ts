import { logguer } from "../config/logguer";
import { DataSource, DataSourceOptions } from "typeorm";
import { EnvironmentBootstrap } from "./env.bootstrap";
import "reflect-metadata";

export class DataBaseBootstrap {
    private static appDataSource: DataSource;

    public async initialize(): Promise<void> {
        const ENV = EnvironmentBootstrap.ENV;
        const dataSourceOptions: DataSourceOptions = {
            type: "postgres",
            host: ENV.DB_HOST,
            port: ENV.DB_PORT,
            username: ENV.DB_USERNAME,
            password: ENV.DB_PASSWORD,
            database: ENV.DB_DATABASE,
            entities: [ENV.DB_ENTITIES],
            poolSize: 10,
            maxQueryExecutionTime: 10000,
            synchronize: ENV.NODE_ENV === "development",
        };
        DataBaseBootstrap.appDataSource = new DataSource(dataSourceOptions);
        await DataBaseBootstrap.appDataSource.initialize();
        logguer.info("✅ Base de datos conectada con éxito ");
    }

    public static get getDatasource(): DataSource {
        return DataBaseBootstrap.appDataSource;
    }

    public async close(): Promise<void> {
        if (DataBaseBootstrap.appDataSource) {
            await DataBaseBootstrap.appDataSource.destroy();
            logguer.info("❌ Conexión a la base de datos cerrada");
        }
    }
}
