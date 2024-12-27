import { DataBaseBootstrap } from "./bootstrap/database.bootstrap";
import { EnvironmentBootstrap } from "./bootstrap/env.bootstrap";
import { ServerBootstrap } from "./bootstrap/server.bootstrap";
import { logguer } from "./config/logguer";

const environmenBootstrap = new EnvironmentBootstrap();
const dataBaseBootstrap = new DataBaseBootstrap();
const serverBootstrap = new ServerBootstrap();

(async () => {
    try {
        // 1. Inicializar variables de entorno
        await environmenBootstrap.initialize();

        // 2. Inicializar base de datos
        await dataBaseBootstrap.initialize();

        // 3. Inicializar servidor
        await serverBootstrap.initialize();
    } catch (error) {
        await dataBaseBootstrap.close();
        await serverBootstrap.close();
        logguer.error(error);
        process.exit(1);
    }
})();
