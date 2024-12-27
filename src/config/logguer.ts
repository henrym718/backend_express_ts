import winston from "winston";
import chalk from "chalk";
import DailyRotateFile from "winston-daily-rotate-file";

const levesl: Record<string, any> = {
    error: chalk.red.bold,
    warn: chalk.yellow.bold,
    info: chalk.green.bold,
    debug: chalk.blue.bold,
};

const logFormat = winston.format.printf(({ timestamp, level, message }) => {
    const levelColor = levesl[level](`${level.toUpperCase()}:`);

    return `${timestamp} ${levelColor} ${`[${message}]`}`;
});

export const logguer = winston.createLogger({
    level: process.env.NODE_ENV === "production" ? "warn" : "debug",
    format: winston.format.combine(winston.format.timestamp(), winston.format.errors({ stack: true }), logFormat),
    transports: [
        new winston.transports.Console(),

        new DailyRotateFile({
            filename: "logs/%DATE%.log",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});
