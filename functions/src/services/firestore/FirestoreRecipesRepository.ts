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

    async getRecipeById(recipeId: string): Promise<Recipe | null> {
        const recipe = await this.db
            .collection(this.RECIPES_COLLECTION)
            .doc(recipeId)
            .get();

        if (!recipe.exists) {
            return null;
        }

        const data = recipe.data();

        const owner = await data?.ownerIdRef.get();

        return {
            id: recipe.id,
            createdAt: data?.createdAt.toDate(),
            updatedAt: data?.updatedAt.toDate(),
            ownerId: data?.ownerIdRef.id,
            videoUrl: data?.videoUrl,
            photoUrl: data?.photoUrl,
            title: data?.title,
            description: data?.description,
            utensils: data?.utensils || [],
            ingredients: data?.ingredients || [],
            instructions: data?.instructions || [],
            duration: data?.duration || 0,
            difficulty: data?.difficulty || "easy",
            cost: data?.cost || "low",
            tags: data?.tags || [],
            servings: data?.servings || 1,
            owner: {
                id: owner.id,
                name: owner.data()?.name || "",
                email: owner.data()?.email || "",
                photoUrl: owner.data()?.photoUrl || ""
            }
        };
    }

    async getRecipesByUserId(userId: string): Promise<Recipe[]> {
        const userRef = this.db
            .collection(this.USERS_COLLECTION)
            .doc(userId);

        const recipes = await this.db
            .collection(this.RECIPES_COLLECTION)
            .where("ownerIdRef", "==", userRef)
            .get();

        const recipePromises = recipes.docs.map(async (doc) => {
            const data = doc.data();
    
            const ownerDoc = await data?.ownerIdRef.get(); 
            const ownerData = ownerDoc.data();
    
            return {
                id: doc.id,
                createdAt: data.createdAt.toDate(),
                updatedAt: data.updatedAt.toDate(),
                ownerId: data.ownerIdRef.id,
                videoUrl: data.videoUrl,
                photoUrl: data.photoUrl,
                title: data.title,
                description: data.description,
                utensils: data.utensils || [],
                ingredients: data.ingredients || [],
                instructions: data.instructions || [],
                duration: data.duration || 0,
                difficulty: data.difficulty || "easy",
                cost: data.cost || "low",
                tags: data.tags || [],
                servings: data.servings || 1,
                owner: {
                    id: ownerDoc.id,
                    name: ownerData?.name || "",
                    email: ownerData?.email || "",
                    photoUrl: ownerData?.photoUrl || ""
                }
            };
        });
    
        const resolvedRecipes = await Promise.all(recipePromises);
    
        return resolvedRecipes;
    }

    async createRecipe(recipe: Recipe): Promise<void> {
        const ownerRef = this.db
            .collection(this.USERS_COLLECTION)
            .doc(recipe.ownerId);

        await this.db
            .collection(this.RECIPES_COLLECTION)
            .doc(recipe.id)
            .set({
                "createdAt": Timestamp.fromDate(recipe.createdAt),
                "updatedAt": Timestamp.fromDate(recipe.updatedAt),
                "ownerIdRef": ownerRef,
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