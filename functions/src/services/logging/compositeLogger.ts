import { Logger } from "../../domain/interfaces/Logger";

export class CompositeLogger implements Logger {
    private loggers: Logger[];

    constructor(...loggers: Logger[]) {
        this.loggers = loggers;
    }

    debug(message: string): void {
        this.loggers.forEach(logger => logger.debug(message));
    }

    info(message: string): void {
        this.loggers.forEach(logger => logger.info(message));
    }

    error(message: string, error: Error): void {
        this.loggers.forEach(logger => logger.error(message, error));
    }
}