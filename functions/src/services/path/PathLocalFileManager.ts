import path from "path";
import fs from "fs";
import * as os from "os";

import {LocalFileManager} from "../../domain/interfaces/LocalFileManager";

export class PathLocalFileManager implements LocalFileManager {
  generateFilePathOnTemporaryFolder(filePath: string): string {
    this.ensureTmpDirExists();
    return path.join(os.tmpdir(), filePath);
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

  private ensureTmpDirExists(): void {
    fs.mkdirSync(os.tmpdir(), { recursive: true });
  }
}
