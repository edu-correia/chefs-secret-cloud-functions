import { getFirestore, Timestamp } from "firebase-admin/firestore";

import { Recipe } from "../../domain/entities/models/Recipe";
import { RecipesRepository } from "../../domain/interfaces/repositories/RecipesRepository";

export class FirestoreRecipesRepository implements RecipesRepository {
    private readonly RECIPES_COLLECTION = "recipes";
    private readonly USERS_COLLECTION = "users";
    
    private db: ReturnType<typeof getFirestore>;

    constructor() {
        this.db = getFirestore();
    }

    getRecipeById(recipeId: string): Promise<Recipe | null> {
        throw new Error("Method not implemented.");
    }

    getRecipesByUserId(userId: string): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }

    async createRecipe(recipe: Recipe): Promise<void> {
        await this.db
            .collection(this.RECIPES_COLLECTION)
            .doc(recipe.id)
            .set({
                "createdAt": Timestamp.fromDate(recipe.createdAt),
                "updatedAt": Timestamp.fromDate(recipe.updatedAt),
                "ownerId": `${this.USERS_COLLECTION}/${recipe.ownerId}`,
                "videoUrl": recipe.videoUrl,
                "photoUrl": recipe.photoUrl,
                "title": recipe.title,
                "description": recipe.description,
                "utensils": recipe.utensils,
                "ingredients": recipe.ingredients,
                "instructions": recipe.instructions,
                "duration": recipe.duration,
                "difficulty": recipe.difficulty,
                "cost": recipe.cost,
                "tags": recipe.tags,
                "servings": recipe.servings,
            });
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        throw new Error("Method not implemented.");
    }

    deleteRecipe(recipeId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    searchRecipes(query: string, limit?: number): Promise<Recipe[]> {
        throw new Error("Method not implemented.");
    }

}