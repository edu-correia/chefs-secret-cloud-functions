import { RecipeCost } from "../enums/RecipeCost";
import { RecipeDifficulty } from "../enums/RecipeDifficuty";

export interface ExtractedRecipe {
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