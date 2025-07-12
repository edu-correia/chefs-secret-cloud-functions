import { RecipeCost } from "../enums/RecipeCost";
import { RecipeDifficulty } from "../enums/RecipeDifficuty";

export interface Recipe {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    ownerId: string;
    videoUrl: string;
    photoUrl: string;

    // Dynamic values
    title: string;
    description: string;
    utensils: string[];
    ingredients: string[];
    instructions: string[];
    duration: number;
    difficulty: RecipeDifficulty;
    cost: RecipeCost;
    tags: string[];
    servings: number;
}
