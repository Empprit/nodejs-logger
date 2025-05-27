import chalk from "chalk";
import { format } from "winston";
import { join as joinPath } from "path";

const logDirPath = joinPath(__dirname, "..", "..", "logs");

// types
import { ChalkInstance } from "chalk";
import { ConsoleTransportOptions } from "winston/lib/winston/transports";
import { DailyRotateFileTransportOptions } from "winston-daily-rotate-file";

// Warna-warna yang akan digunakan dalam logging console
const colors: Record<string, ChalkInstance> = {
    error: chalk.red,
    warn: chalk.yellow,
    info: chalk.blue,
    debug: chalk.green,
};

// Bidang datar yang akan digunakan dalam logging (agar loggernya colorblind-friendly)
// Digunakan bersamaan dengan warna
const shapes: Record<string, string> = {
    error: "\u25b2", // Segi tiga
    warn: "\u25a0", // Persegi
    info: "\u2B1F", // Segi lima
    debug: "\u2605", // Bintang
};

// Mengatur bentuk output
function custom() {
    return format.printf((info): string => {
        return (
            colors[info.level].bold(`${shapes[info.level]} `) +
            colors[info.level].bold.underline(`[${info.label}]`) +
            ` ${info.message}`
        );
    });
}

// Opsi untuk console stream
// Logger console dibuat sesederhana mungkin untuk meningkatkan keterbacaan
function createConsoleOptions(name: string) {
    return <ConsoleTransportOptions>{
        format: format.combine(
            format.label({ label: name, message: false }),
            format.errors({ stack: true }),
            custom()
        ),
        handleExceptions: false,
        level: process.env.NODE_ENV === "development" ? "debug" : "info",
    };
}

// Opsi untuk file stream
function createFileOptions(name: string) {
    return <DailyRotateFileTransportOptions>{
        format: format.combine(
            format.timestamp(),
            format.logstash(),
            format.errors({ stack: true })
        ),
        filename: name.toLowerCase() + ".%DATE%.log",
        dirname: logDirPath,
        datePattern: "DD-MM-YYYY",
        zippedArchive: true,
        maxSize: "15m",
        maxFiles: "8d",
    };
}

// Ekspor
export { createConsoleOptions, createFileOptions };
