import { FetchLoggedUserRecipesUseCase } from "../domain/usecases/fetchLoggedUserRecipesUseCase";
import { FirestoreRecipesRepository } from "../services/firestore/FirestoreRecipesRepository";
import { ColoretteLogger } from "../services/logging/colorette/ColoretteLogger";
import { CompositeLogger } from "../services/logging/compositeLogger";
import { CloudFunctionsLogger } from "../services/logging/firebaseCloudFunctions/CloudFunctionsLogger";

export const getFetchLoggedUserRecipesUseCase = () => {
    const recipesRepository = new FirestoreRecipesRepository();
    const coloretteLogger = new ColoretteLogger();
    const functionsLogger = new CloudFunctionsLogger();
    const logger = new CompositeLogger(coloretteLogger, functionsLogger);

    return new FetchLoggedUserRecipesUseCase(recipesRepository, logger);
}