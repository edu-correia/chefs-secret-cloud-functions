import { Video } from "../entities/models/Video";

export interface VideoInfoExtractor {
    /**
     * 
     * @param videoUrl
     * @throws VideoExtractionError
     */
    extractVideoInfo(videoUrl: string): Promise<Video>;
}
