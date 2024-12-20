import { app } from "./app";
import { DataBaseBootstrap } from "./bootstrap/database.bootstrap";
import { EnvironmentBootstrap } from "./bootstrap/env.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { EnvConfig } from "./config/env.schema";
import { logguer } from "./helpers/logguer";

export let ENV: Readonly<EnvConfig>;
(async () => {
    try {
        // 1. Inicializar variables de entorno
        const envBootstrap = EnvironmentBootstrap.getInstance();
        await envBootstrap.initialize();
        ENV = envBootstrap.getEnv();

        // 2. Inicializar base de datos
        const dbBootstrap = DataBaseBootstrap.getInstance();
        await dbBootstrap.initialize();

        // 3. Inicializar servidor
        const serverBootstrap = ServerBootstrap.getInstance();
        await serverBootstrap.initialize();
    } catch (error) {
        logguer.error(error);
        DataBaseBootstrap.getInstance().close();
        process.exit(1);
    }
})();
