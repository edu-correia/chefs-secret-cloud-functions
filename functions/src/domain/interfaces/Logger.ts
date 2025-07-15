export interface Logger {
    debug(message: string): void;
    info(message: string): void;
    error(message: string, error?: Error): void;
}