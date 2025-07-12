import { ExtractedRecipe } from "../entities/models/ExtractedRecipe";

export interface AITextAnalizer {
    extractRecipe(prompt: string): Promise<ExtractedRecipe>;
}