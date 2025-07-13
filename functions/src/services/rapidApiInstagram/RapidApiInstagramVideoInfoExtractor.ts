import { AxiosInstance } from "axios";

import { VideoInfoExtractor } from "../../domain/interfaces/VideoInfoExtractor";
import { Video } from "../../domain/entities/models/Video";
import { createAPIBaseConfig } from "./rapidApiInstagramApi";
import { InstagramVideoInfoResponse } from "./rapidApiInstagramDTO";
import { VideoExtractionError } from "../../domain/entities/exceptions/VideoExtractionError";
import { SecretManager } from "../../domain/interfaces/SecretManager";

export class RapidApiInstagramVideoInfoExtractor implements VideoInfoExtractor {
    private api: AxiosInstance;

    constructor(secretManager: SecretManager) {
        this.api = createAPIBaseConfig(secretManager.getVideoInfoExtractorKey());
    }

    async extractVideoInfo(videoUrl: string): Promise<Video> {
        const params = {
            url: videoUrl
        };

        try {
            const response = await this.api.get<InstagramVideoInfoResponse>("get-info-rapidapi", { params });
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