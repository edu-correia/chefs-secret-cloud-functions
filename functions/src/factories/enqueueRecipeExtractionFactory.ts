import { EnqueueRecipeExtractionUseCase } from "../domain/usecases/enqueueRecipeExtractionUseCase";
import { EnqueueRecipeExtractionValidator } from "../domain/validators/enqueueRecipeExtractionValidator";
import { FirestoreJobsRepository } from "../services/firestore/FirestoreJobsRepository";
import { ChalkLogger } from "../services/logging/chalk/ChalkLogger";
import { CompositeLogger } from "../services/logging/compositeLogger";
import { CloudFunctionsLogger } from "../services/logging/firebaseCloudFunctions/CloudFunctionsLogger";
import { UuidIdGenerator } from "../services/uuid/UuidIdGenerator";

export const getEnqueueRecipeExtractionUseCase = () => {
    const idGenerator = new UuidIdGenerator();
    const requestValidator = new EnqueueRecipeExtractionValidator();
    const jobsRepository = new FirestoreJobsRepository();
    const chalkLogger = new ChalkLogger();
    const functionsLogger = new CloudFunctionsLogger();
    const logger = new CompositeLogger(chalkLogger, functionsLogger);

    return new EnqueueRecipeExtractionUseCase(
        idGenerator, requestValidator, jobsRepository, logger);
}