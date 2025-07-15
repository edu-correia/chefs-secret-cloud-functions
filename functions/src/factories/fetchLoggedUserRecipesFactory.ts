import { FetchLoggedUserRecipesUseCase } from "../domain/usecases/fetchLoggedUserRecipesUseCase";
import { FirestoreRecipesRepository } from "../services/firestore/FirestoreRecipesRepository";
import { CloudFunctionsLogger } from "../services/logging/firebaseCloudFunctions/CloudFunctionsLogger";

export const getFetchLoggedUserRecipesUseCase = () => {
    const recipesRepository = new FirestoreRecipesRepository();
    const logger = new CloudFunctionsLogger();

    return new FetchLoggedUserRecipesUseCase(recipesRepository, logger);
}