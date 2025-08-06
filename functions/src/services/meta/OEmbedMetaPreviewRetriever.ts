import { AxiosInstance } from "axios";
import { PreviewRetriever } from "../../domain/interfaces/PreviewRetriever";
import { createAPIBaseConfig } from "./OEmbedMetaAPI";
import { SecretManager } from "../../domain/interfaces/SecretManager";
import { VideoPreview } from "../../domain/entities/models/VideoPreview";
import { InstagramPreviewResponse } from "./OEmbedMetaDTO";

export class OEmbedMetaPreviewRetriever implements PreviewRetriever {
    private api: AxiosInstance;
    private readonly apiKey: string;

    constructor(secretManager: SecretManager) {
        this.api = createAPIBaseConfig();
        this.apiKey = secretManager.getPreviewRetrieverKey();
    }

    async getVideoPreviewImage(videoUrl: string): Promise<VideoPreview> {
        const videoId = videoUrl.split("/reel/")[1].replace("/", "");
        const response = await this.api.get<InstagramPreviewResponse>(
            `/instagram_oembed?url=https://www.instagram.com/instagram/p/${videoId}&access_token=${this.apiKey}`
        );

        return {
            previewImageUrl: response.data.thumbnail_url,
            videoOwnerUsername: response.data.author_name
        }
    }
}