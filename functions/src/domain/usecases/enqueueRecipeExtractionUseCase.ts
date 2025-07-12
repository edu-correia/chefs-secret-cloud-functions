import { Job } from "../entities/models/Job";
import { JobStatus } from "../entities/enums/JobStatus";
import { JobType } from "../entities/enums/JobType";
import { IdGenerator } from "../interfaces/IdGenerator";
import { JobsRepository } from "../interfaces/repositories/JobsRepository";
import { DataValidator } from "../interfaces/DataValidator";
import { EnqueueRecipeExtractionDTO } from "../entities/dtos/enqueueRecipeExtractionDTO";
import { Logger } from "../interfaces/Logger";

export class EnqueueRecipeExtractionUseCase {
    public constructor(
        private idGenerator: IdGenerator,
        private requestValidator: DataValidator<EnqueueRecipeExtractionDTO>,
        private jobsRepository: JobsRepository,
        private logger: Logger
    ) {}

    public async execute(request: EnqueueRecipeExtractionDTO, userId: string): Promise<Job> {
        const validationResult = await this.requestValidator.validate(request);
        if (!validationResult.isValid()) {
            // TODO: Create a custom error type for validation errors
            throw new Error(`Validation Error: ${JSON.stringify(validationResult.getErrors())}`);
        }

        const job = {
            id: this.idGenerator.generateRandomId(),
            type: JobType.AI_ANALYZE_VIDEO,
            userId: userId,
            status: JobStatus.PENDING,
            input: {
                videoUrl: request.videoUrl
            },
            createdAt: new Date(),
        };

        await this.jobsRepository.createJob(job);

        return job;
    }
}