import { consoleProps, consoleMsg } from "../common/m8l-consoleMsg.js";

try {
    consoleMsg(consoleProps.types.Context, "Esto es una prueba");
} catch (error) {
    console.log(error);
}
