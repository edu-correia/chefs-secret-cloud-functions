import ffmpeg from "fluent-ffmpeg";

import { ExternalFileDownloader } from "../../domain/interfaces/ExternalFileDownloader";

const MP3_CODIFICATION = "libmp3lame";
const AUDIO_QUALITY = 2;

export class FfmpegExternalFileDownloader implements ExternalFileDownloader {
    async downloadAudioFromOnlineVideo(rawVideoUrl: string, destinationPath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!rawVideoUrl.startsWith('http')) {
              return reject(new Error('URL de vídeo inválida.')); // InvalidVideoUrlError
            }
        
            ffmpeg(rawVideoUrl)
              .noVideo()
              .audioCodec(MP3_CODIFICATION)
              .audioQuality(AUDIO_QUALITY)
              .addOutputOption("-f", "mp3")
              .on('end', () => {
                // TODO: Add success log
                resolve();
              })
              .on('error', (err) => {
                // TODO: Add error log
                // throw new DownloadAudioError
                reject(err);
              })
              .save(destinationPath);
          });
    }
}
