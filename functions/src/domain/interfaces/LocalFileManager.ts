export interface LocalFileManager {
    generateFilePathOnTemporaryFolder(filePath: string): string;
    deleteFile(filePath: string): Promise<void>;
}