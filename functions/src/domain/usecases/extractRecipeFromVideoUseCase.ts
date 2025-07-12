import { ExtractRecipeFromVideoDTO } from "../entities/dtos/extractRecipeFromVideoDTO";
import { AIAudioAnalyzer } from "../interfaces/AIAudioAnalyzer";
import { AITextAnalizer } from "../interfaces/AITextAnalizer";
import { ExternalFileDownloader } from "../interfaces/ExternalFileDownloader";
import { LocalFileManager } from "../interfaces/LocalFileManager";
import { JobsRepository } from "../interfaces/repositories/JobsRepository";
import { RecipesRepository } from "../interfaces/repositories/RecipesRepository";
import { VideoInfoExtractor } from "../interfaces/VideoInfoExtractor";
import { JobStatus } from "../entities/enums/JobStatus";
import { Recipe } from "../entities/models/Recipe";
import { IdGenerator } from "../interfaces/IdGenerator";

import promptUtils from "../../utils/promptUtils";
import { Logger } from "../interfaces/Logger";

export class ExtractRecipeFromVideoUseCase {
    public constructor(
        private idGenerator: IdGenerator,
        private recipesRepository: RecipesRepository,
        private jobsRepository: JobsRepository,
        private aiTextAnalizer: AITextAnalizer,
        private externalFileDownloader: ExternalFileDownloader,
        private videoInfoExtractor: VideoInfoExtractor,
        private aiAudioAnalyzer: AIAudioAnalyzer,
        private localFileManager: LocalFileManager,
        private logger: Logger
    ) {}

    public async execute(data: ExtractRecipeFromVideoDTO, userId: string): Promise<void> {
        // Step 1: Retrieve job information
        const job = await this.jobsRepository.getJobById(data.jobId);
        if (!job) {
            // TODO: Create a custom error type for job not found
            throw new Error(`Job with ID ${data.jobId} not found.`);
        }

        const { videoUrl, jobId } = data;

        // Step 2: Update job status to IN_PROGRESS
        await this.jobsRepository.updateJobStatus(jobId, JobStatus.IN_PROGRESS);

        // Step 3: Extract video information
        const videoInfo = await this.videoInfoExtractor.extractVideoInfo(videoUrl);

        // Step 4: Download audio from the video
        const audioFilePath = this.localFileManager.generateFilePathOnTemporaryFolder(`${new Date().getTime()}.mp3`);
        await this.externalFileDownloader.downloadAudioFromOnlineVideo(videoInfo.rawVideoUrl, audioFilePath);

        // Step 5: Transcribe the audio to text
        const transcription = await this.aiAudioAnalyzer.transcribeAudio(audioFilePath);
        if (!transcription) {
            throw new Error("Failed to transcribe audio.");
        }

        // Step 6: Extract recipe from the transcription
        const prompt = promptUtils.createPrompt(transcription, videoInfo.caption);
        const extractedRecipe = await this.aiTextAnalizer.extractRecipe(prompt);
        if (!extractedRecipe) {
            throw new Error("Failed to extract recipe from transcription.");
        }

        // Step 7: Save the recipe to the database
        const recipe: Recipe = {
            ...extractedRecipe,
            id: this.idGenerator.generateRandomId(),
            createdAt: new Date(),
            updatedAt: new Date(),
            ownerId: userId,
            videoUrl,
            photoUrl: videoInfo.thumbnailUrl || "", 
        }
        await this.recipesRepository.createRecipe(recipe);

        // Step 8: Update job status to COMPLETED
        await this.jobsRepository.finishJob(jobId, JobStatus.COMPLETED, new Date(), null);

        // Step 9: Clean up temporary files
        await this.localFileManager.deleteFile(audioFilePath);
    }
} 