import { VideoPreview } from "../entities/models/VideoPreview";

export interface PreviewRetriever {
    getVideoPreviewImage(videoUrl: string): Promise<VideoPreview>;
}