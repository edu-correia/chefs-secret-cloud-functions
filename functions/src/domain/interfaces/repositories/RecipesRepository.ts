import { Recipe } from "../../entities/models/Recipe";

export interface RecipesRepository {
    getRecipeById(recipeId: string): Promise<Recipe | null>;
    getRecipesByUserId(userId: string): Promise<Recipe[]>;
    createRecipe(recipe: Recipe): Promise<void>;
    updateRecipe(recipe: Recipe): Promise<Recipe>;
    deleteRecipe(recipeId: string): Promise<void>;
    searchRecipes(query: string, limit?: number): Promise<Recipe[]>;
}