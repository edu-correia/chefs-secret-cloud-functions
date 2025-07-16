import { red, blue, gray, bold, greenBright, white, blueBright, redBright, italic } from "colorette";

import { Logger } from "../../../domain/interfaces/Logger";

export class ColoretteLogger implements Logger {
    debug(message: string): void {
        const date: string = new Date().toLocaleString();
        console.log(
            bold(greenBright("[DEBUG]")),
            gray(` ${date} - `),
            white(`${message}`)
        );
    }

    info(message: string): void {
        const date: string = new Date().toLocaleString();
        console.log(
            bold(blueBright("[INFO]")),
            gray(` ${date} - `),
            white(`${message}`)
        );
    }

    error(message: string, error?: Error): void {
        const date: string = new Date().toLocaleString();

        console.log(
            bold(redBright("[ERROR]")),
            gray(` ${date} - `),
            white(`${message}`)
        );

        if(error && error instanceof Error){
            console.log(bold(redBright(error.stack || italic('No stack trace available'))));
        }
    }
}