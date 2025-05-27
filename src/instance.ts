import { createLogger } from "winston";
import createHandler from "./handler";

// types
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

// Fungsi untuk membuat instances dari transport yang diberikan
function createInstance(
    name: string,
    overrideFileOptions: DailyRotateFileTransportOptions = {}
) {
    return createLogger({
        transports: createHandler(name, overrideFileOptions),
        exitOnError: true,
    });
}

// Ekspor
export default createInstance;
