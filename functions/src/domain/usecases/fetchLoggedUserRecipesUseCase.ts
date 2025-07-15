import { Logger } from "../interfaces/Logger";
import { RecipesRepository } from "../interfaces/repositories/RecipesRepository";
import { Recipe } from "../entities/models/Recipe";

export class FetchLoggedUserRecipesUseCase {
    public constructor(
        private recipesRepository: RecipesRepository,
        private logger: Logger
    ) {}

    public async execute(userId: string): Promise<Recipe[]> {
        this.logger.info(`Fetching recipes for user: ${userId}`);
        if (!userId) {
            this.logger.error("User ID is required to fetch recipes.");
            throw new Error("User ID is required to fetch recipes.");
        }

        const recipes = await this.recipesRepository.getRecipesByUserId(userId);

        return recipes;
    }
}