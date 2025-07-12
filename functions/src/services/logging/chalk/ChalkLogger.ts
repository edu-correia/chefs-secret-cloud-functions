const { chalk } = require("chalk");

import { Logger } from "../../../domain/interfaces/Logger";

export class ChalkLogger implements Logger {
    debug(message: string): void {
        const date: string = new Date().toLocaleString();
        console.log(
            chalk.bold.greenBright("[DEBUG]") +
            chalk.grey(` ${date} - `) + 
            chalk.white(`${message}`)
        );
    }

    info(message: string): void {
        const date: string = new Date().toLocaleString();
        console.log(
            chalk.bold.blueBright("[INFO]") +
            chalk.grey(` ${date} - `) + 
            chalk.white(`${message}`)
        );
    }

    error(message: string, error: Error): void {
        const date: string = new Date().toLocaleString();

        console.log(
            chalk.bold.redBright("[ERROR]") +
            chalk.grey(` ${date} - `) + 
            chalk.white(`${message}`)
        );

        if(error && error instanceof Error){
            console.log(chalk.bold.redBright(error.stack));
        }
    }
}