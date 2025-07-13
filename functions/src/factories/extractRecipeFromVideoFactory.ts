import { ExtractRecipeFromVideoUseCase } from "../domain/usecases/extractRecipeFromVideoUseCase";
import { AssemblyAIAudioAnalizer } from "../services/assemblyAI/AssemblyAIAudioAnalizer";
import { FfmpegExternalFileDownloader } from "../services/ffmpeg/FfmpegExternalFileDownloader";
import { FirestoreJobsRepository } from "../services/firestore/FirestoreJobsRepository";
import { FirestoreRecipesRepository } from "../services/firestore/FirestoreRecipesRepository";
import { GCPSecretManager } from "../services/gcp/GCPSecretManager";
import { GeminiAITextAnalizer } from "../services/gemini/GeminiAITextAnalizer";
import { ChalkLogger } from "../services/logging/chalk/ChalkLogger";
import { CompositeLogger } from "../services/logging/compositeLogger";
import { CloudFunctionsLogger } from "../services/logging/firebaseCloudFunctions/CloudFunctionsLogger";
import { PathLocalFileManager } from "../services/path/PathLocalFileManager";
import { RapidApiInstagramVideoInfoExtractor } from "../services/rapidApiInstagram/RapidApiInstagramVideoInfoExtractor";
import { UuidIdGenerator } from "../services/uuid/UuidIdGenerator";

export const getExtractRecipeFromVideoUseCase = () => {
    const secretManager = new GCPSecretManager();
    const idGenerator = new UuidIdGenerator();
    const recipesRepository = new FirestoreRecipesRepository();
    const jobsRepository = new FirestoreJobsRepository();
    const aiTextAnalizer = new GeminiAITextAnalizer(secretManager);
    const externalFileDownloader = new FfmpegExternalFileDownloader();
    const videoInfoExtractor = new RapidApiInstagramVideoInfoExtractor(secretManager);
    const aiAudioAnalyzer = new AssemblyAIAudioAnalizer(secretManager);
    const localFileManager = new PathLocalFileManager();
    const chalkLogger = new ChalkLogger();
    const functionsLogger = new CloudFunctionsLogger();
    const logger = new CompositeLogger(chalkLogger, functionsLogger);

    return new ExtractRecipeFromVideoUseCase(idGenerator, recipesRepository,
        jobsRepository, aiTextAnalizer, externalFileDownloader,
        videoInfoExtractor, aiAudioAnalyzer, localFileManager, logger);
}