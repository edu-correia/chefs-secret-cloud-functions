import { FetchLoggedUserRecipesUseCase } from "../domain/usecases/fetchLoggedUserRecipesUseCase";
import { FetchRecipeByIdUseCase } from "../domain/usecases/fetchRecipeByIdUseCase";
import { FirestoreRecipesRepository } from "../services/firestore/FirestoreRecipesRepository";
import { ColoretteLogger } from "../services/logging/colorette/ColoretteLogger";
import { CompositeLogger } from "../services/logging/compositeLogger";
import { CloudFunctionsLogger } from "../services/logging/firebaseCloudFunctions/CloudFunctionsLogger";

export const getFetchRecipeByIdUseCase = () => {
    const recipesRepository = new FirestoreRecipesRepository();
    const coloretteLogger = new ColoretteLogger();
    const functionsLogger = new CloudFunctionsLogger();
    const logger = new CompositeLogger(coloretteLogger, functionsLogger);

    return new FetchRecipeByIdUseCase(recipesRepository, logger);
}