import path from "path";
import fs from 'fs';

import { LocalFileManager } from "../../domain/interfaces/LocalFileManager";

export class PathLocalFileManager implements LocalFileManager {
    generateFilePathOnTemporaryFolder(filePath: string): string {
        return path.join(__dirname, "..", "..", "..", "tmp", filePath);
    }

    async deleteFile(filePath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(new Error(`Failed to delete file: ${filePath}`));
                } else {
                    resolve();
                }
            });
        }
        );
    }

}