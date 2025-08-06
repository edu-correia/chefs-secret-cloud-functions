import { FetchVideoPreviewUseCase } from "../domain/usecases/fetchVideoPreviewUseCase";
import { FetchVideoPreviewValidator } from "../domain/validators/fetchVideoPreviewValidator";
import { GCPSecretManager } from "../services/gcp/GCPSecretManager";
import { ColoretteLogger } from "../services/logging/colorette/ColoretteLogger";
import { CompositeLogger } from "../services/logging/compositeLogger";
import { CloudFunctionsLogger } from "../services/logging/firebaseCloudFunctions/CloudFunctionsLogger";
import { OEmbedMetaPreviewRetriever } from "../services/meta/OEmbedMetaPreviewRetriever";

export const getFetchVideoPreviewUseCase = () => {
    const secretManager = new GCPSecretManager();
    const previewRetriever = new OEmbedMetaPreviewRetriever(secretManager);
    const requestValidator = new FetchVideoPreviewValidator();
    const coloretteLogger = new ColoretteLogger();
    const functionsLogger = new CloudFunctionsLogger();
    const logger = new CompositeLogger(coloretteLogger, functionsLogger);

    return new FetchVideoPreviewUseCase(previewRetriever, requestValidator, logger);
}