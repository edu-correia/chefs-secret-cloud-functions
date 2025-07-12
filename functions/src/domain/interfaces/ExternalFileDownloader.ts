export interface ExternalFileDownloader {
    downloadAudioFromOnlineVideo(rawVideoUrl: string, destinationPath: string): Promise<void>;
}