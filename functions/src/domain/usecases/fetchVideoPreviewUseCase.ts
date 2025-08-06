import { Logger } from "../interfaces/Logger";
import { PreviewRetriever } from "../interfaces/PreviewRetriever";
import { DataValidator } from "../interfaces/DataValidator";
import { FetchVideoPreviewDTO } from "../entities/dtos/fetchVideoPreviewDTO";
import { VideoPreview } from "../entities/models/VideoPreview";

export class FetchVideoPreviewUseCase {
    public constructor(
        private previewRetriever: PreviewRetriever,
        private requestValidator: DataValidator<FetchVideoPreviewDTO>,
        private logger: Logger
    ) {}

    public async execute(request: FetchVideoPreviewDTO): Promise<VideoPreview> {
        const { videoUrl } = request;
        this.logger.info(`Fetching preview from the following video: ${videoUrl}`);

        const validationResult = await this.requestValidator.validate(request);
        if (!validationResult.isValid()) {
            // TODO: Create a custom error type for validation errors
            throw new Error(`Validation Error: ${JSON.stringify(validationResult.getErrors())}`);
        }

        const preview = await this.previewRetriever.getVideoPreviewImage(videoUrl);

        return preview;
    }
}