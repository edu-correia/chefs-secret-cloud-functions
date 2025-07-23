import { Logger } from "../interfaces/Logger";
import { RecipesRepository } from "../interfaces/repositories/RecipesRepository";
import { Recipe } from "../entities/models/Recipe";

export class FetchRecipeByIdUseCase {
    public constructor(
        private recipesRepository: RecipesRepository,
        private logger: Logger
    ) {}

    public async execute(recipeId: string): Promise<Recipe> {
        this.logger.info(`Fetching recipe by Id: ${recipeId}`);

        if (!recipeId) {
            this.logger.error("Recipe ID is required to fetch the recipe.");
            throw new Error("Recipe ID is required to fetch the recipe.");
        }

        const recipe = await this.recipesRepository.getRecipeById(recipeId);

        if (!recipe) {
            this.logger.error(`Recipe with ID ${recipeId} not found.`);
            throw new Error(`Recipe with ID ${recipeId} not found.`);
        }

        return recipe;
    }
}