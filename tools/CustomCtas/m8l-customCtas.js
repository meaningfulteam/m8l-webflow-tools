import { consoleProps, consoleMsg } from "../common/m8l-consoleMsg.js";

document.addEventListener("DOMContentLoaded", function () {
    try {
        consoleMsg(consoleProps.types.Context, "Esto es una prueba");
    } catch (error) {
        console.log(error);
    }
});
