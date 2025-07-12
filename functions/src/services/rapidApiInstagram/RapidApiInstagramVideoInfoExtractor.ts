import { VideoInfoExtractor } from "../../domain/interfaces/VideoInfoExtractor";
import { Video } from "../../domain/entities/models/Video";
import { api } from "./rapidApiInstagramApi";
import { InstagramVideoInfoResponse } from "./rapidApiInstagramDTO";
import { VideoExtractionError } from "../../domain/entities/exceptions/VideoExtractionError";

export class RapidApiInstagramVideoInfoExtractor implements VideoInfoExtractor {
    async extractVideoInfo(videoUrl: string): Promise<Video> {
        const params = {
            url: videoUrl
        };

        try {
            const response = await api.get<InstagramVideoInfoResponse>("get-info-rapidapi", { params });
            return {
                caption: response.data.caption,
                thumbnailUrl: response.data.thumb,
                rawVideoUrl: response.data.download_url,
                duration: response.data.duration
            };
        } catch (error) {
            throw new VideoExtractionError();
        }
    }
}