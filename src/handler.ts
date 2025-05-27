import { transports } from "winston";
import "winston-daily-rotate-file";
import { createConsoleOptions, createFileOptions } from "./option";

// types
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

// Fungsi untuk membuat winston transport
function createHandler(
    name: string,
    overrideFileOptions: DailyRotateFileTransportOptions
) {
    const handlers = [];

    // Transport untuk console stream
    const consoleOptions = createConsoleOptions(name);
    handlers.push(new transports.Console(consoleOptions));

    // Transport untuk file stream
    if (process.env.NODE_ENV === "production") {
        // Menggabungkan konfig bawaan dengan konfig khusus
        const fileOptions = <DailyRotateFileTransportOptions>{
            ...createFileOptions(name),
            ...overrideFileOptions,
        };

        handlers.push(new transports.DailyRotateFile(fileOptions));
    }

    // Ouput keduanya sebagai list
    return handlers;
}

// Ekspor
export default createHandler;
