import * as logger from "firebase-functions/logger";

import { Logger } from "../../../domain/interfaces/Logger";

export class CloudFunctionsLogger implements Logger {
    debug(message: string): void {
        logger.debug(`[DEBUG] ${message}`);
    }

    info(message: string): void {
        logger.info(`[INFO] ${message}`);
    }

    error(message: string, error?: Error): void {
        logger.error(`[ERROR] ${message}`, error);
    }
}